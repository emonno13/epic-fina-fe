import { endpoints } from '@lib/networks/endpoints';
import { useFeatureData } from '@schema-form/features/hooks/feature-hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Form, notification, Tooltip } from 'antd';
import { useState } from 'react';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';
import { RelationUtils } from '../../../../../schema-form/utils/form-utils';
import { PRODUCT_TYPE } from '../utils';
import FundDetail from './detail';
import { FundTableDetailSchema } from './table/fund.table-detail-schema';

const FundManagement = ({ featureId = 'fund-management' }) => {
  const featureData = useFeatureData(featureId);
  const documentDetail = featureData['documentDetail'];
  const [searchForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingNav, setIsLoadingNav] = useState<boolean>(false);

  const handleSyncProductInformationWithVNCapital = () => {
    if (!documentDetail?.id) return;
    setIsLoading(true);
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain(
          `/products/${documentDetail?.id}/sync-product-with-mio`,
        ),
        onGotSuccess: () => {
          searchForm?.submit();
          setIsLoading(false);
          notification.success({
            message: 'Thành công',
            description: 'Đã đồng bộ thành công',
          });
        },
        onGotError: () => setIsLoading(false),
      },
    );
  };

  const handleSyncProductNavWithVNCapital = () => {
    if (!documentDetail?.id) return;
    setIsLoadingNav(true);
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain(
          `/products/${documentDetail?.id}/sync-nav-with-mio`,
        ),
        onGotSuccess: () => {
          searchForm?.submit();
          setIsLoadingNav(false);
          notification.success({
            message: 'Thành công',
            description: 'Đã đồng bộ NAV thành công',
          });
        },
        onGotError: () => setIsLoadingNav(false),
      },
    );
  };

  return (
    <HFeature
      {...{
        nodeName: 'products',
        featureId,
        searchForm,
        documentRelations: ['productDetails'],
      }}
    >
      <HSearchFormWithCreateButton
        {...{
          withRelations: [
            RelationUtils.entity('org', ['id', 'name']),
            RelationUtils.entity('category', ['id', 'name']),
            {
              relation: 'productDetails',
              scope: {
                include: [{ relation: 'fees' }],
              },
            },
          ],
          resetIfSuccess: false,
          hiddenValues: {
            filter: {
              where: {
                type: PRODUCT_TYPE.FUND,
              },
            },
          },
        }}
      />
      <HDocumentDrawerPanel
        {...{
          customButton: documentDetail?.id && (
            <div>
              <Tooltip
                className="m-r-10"
                overlay={'Đồng bộ thông tin sản phẩm với VNCapital'}
              >
                <Button
                  {...{
                    onClick: handleSyncProductInformationWithVNCapital,
                    loading: isLoading,
                  }}
                >
                  Đồng bộ
                </Button>
              </Tooltip>
              <Tooltip
                className="m-r-10"
                overlay={'Đồng bộ thông tin nav với VNCapital'}
              >
                <Button
                  {...{
                    onClick: handleSyncProductNavWithVNCapital,
                    loading: isLoadingNav,
                  }}
                >
                  Đồng bộ Nav
                </Button>
              </Tooltip>
            </div>
          ),
        }}
      >
        <FundDetail />
      </HDocumentDrawerPanel>
      <HTable schema={FundTableDetailSchema} />
    </HFeature>
  );
};

export default FundManagement;
