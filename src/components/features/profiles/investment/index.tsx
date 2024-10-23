import { endpoints } from '@lib/networks/endpoints';
import { HFeature } from '@schema-form/features';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Form } from 'antd';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import InfoInvestment from './components/infoInvestment';
import OverviewAssetProduct from './components/overview-asset-product';
import TableComponent from './components/table';

import './components/tabs.scss';

export const Investment = () => (
  <InvestmentContextProvider>
    <InvestmentComponent />
  </InvestmentContextProvider>
);

export default Investment;

const InvestmentComponent = () => {
  const { setAsset, asset, selectedProductId, setSelectedProductId } =
    useContext(InvestmentContext);

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(
          '/users/asset-management-product',
        ),
        method: 'GET',
        onGotSuccess: (res) => {
          setAsset(res || []);
          // setSelectedProductId(res?.[0]?.id);
        },
      },
    );
  }, []);

  return (
    <div className="invest-layout-dashboard">
      <div className="invest-layout-dashboard__chart">
        <InfoInvestment dataFund={asset as any} />
      </div>
      <div className="invest-layout-dashboard__overview-product">
        {asset.map((item: any) => (
          <OverviewAssetProduct
            selectedProgramId={selectedProductId}
            handleClick={() => {
              setSelectedProductId(item?.id);
            }}
            key={item.id}
            asset={item}
          />
        ))}
      </div>
      <TabsAssetManagement />
    </div>
  );
};

const TabsAssetManagement = () => {
  const { selectedProductId } = useContext(InvestmentContext);
  const [searchForm] = Form.useForm();

  useEffect(() => {
    if (!selectedProductId) return;
    searchForm?.submit();
  }, [selectedProductId]);

  if (!selectedProductId)
    return (
      <h2 className="m-t-10">Vui lòng chọn sản phẩm để xem các lệnh mua</h2>
    );

  return (
    <HFeature
      {...{
        featureId: 'transactions-with-mio',
        endpoint: endpoints.endpointWithApiDomain(
          '/users/load-transactions-for-asset-screen',
        ),
        searchForm,
      }}
    >
      <HSearchFormHiddenAble
        hiddenValues={{
          filter: {
            where: {
              productId: selectedProductId,
            },
          },
        }}
      />
      <TableComponent />
    </HFeature>
  );
};

interface IInvestmentContext {
  asset: any[];
  setAsset: (value: any) => void;
  selectedProductId: number;
  setSelectedProductId: (value: number) => void;
}
export const InvestmentContext = createContext<IInvestmentContext>({
  asset: [],
  setAsset: (value: any[]) => {},
  selectedProductId: 0,
  setSelectedProductId: (value: number) => {},
});
const InvestmentContextProvider = ({ children }: { children: ReactNode }) => {
  const [asset, setAsset] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  return (
    <InvestmentContext.Provider
      value={{
        asset,
        setAsset,
        selectedProductId,
        setSelectedProductId,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};
