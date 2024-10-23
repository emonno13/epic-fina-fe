import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HFeature } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { Tabs } from 'antd';
import MobileDetailDrawer from '../mobile-detail-drawer';
import { PRODUCT_TAB_DATA } from './constants';

import './mobile-products.scss';

const ProductTab = ({
  featureId,
  type,
  drawerProps = {},
  detailComponent,
  listComponent,
}) => {
  const modelFilters = {
    filter: {
      where: {
        type,
        // highlight: PRODUCT_HIGHLIGHT.TRUE,
      },
    },
  };
  return (
    <HFeature
      {...{
        featureId: featureId || 'products',
        nodeName: 'products',
      }}
    >
      <HSearchForm
        style={{ display: 'none' }}
        endpoint={endpoints.endpointWithApiDomain('/products/public')}
        hiddenValues={modelFilters}
        withRelations={['org', 'category']}
      />
      <MobileDetailDrawer {...drawerProps}>
        {detailComponent}
      </MobileDetailDrawer>
      {listComponent}
    </HFeature>
  );
};

const MobileProducts = () => {
  const { t } = useHTranslation('admin-common');
  const productTabData = PRODUCT_TAB_DATA(t);
  return (
    <div className="mobile-products">
      <Tabs>
        {productTabData?.map((tabData) => {
          const { type, tabName } = tabData;
          return (
            <Tabs.TabPane key={type} tab={tabName}>
              <ProductTab {...tabData} />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default MobileProducts;
