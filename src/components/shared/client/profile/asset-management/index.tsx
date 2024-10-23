import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HFeature } from '@schema-form/features';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import { IconWarning } from './constants';
import OverviewAssetProduct from './overview-asset-product';
import ProfileAssetManagementStatistics from './statistics';
import TableComponent from './table';

import './styles.module.scss';

const ProfileAssetManagement = () => {
  const { t } = useHTranslation('common');
  const [asset, setAsset] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(
          '/users/asset-management-product',
        ),
        method: 'GET',
        onGotSuccess: (res) => setAsset(res || []),
      },
    );
  }, []);

  useEffect(() => {
    if (!selectedProductId) return;

    FormUtils.submitForm(
      { filter: { where: { productId: selectedProductId } } },
      {
        endpoint: endpoints.endpointWithApiDomain(
          '/products/load-asset-program',
        ),
        method: 'GET',
        onGotSuccess: (res) => setPrograms(res),
      },
    );
  }, [selectedProductId]);

  return (
    <div className="profile-asset-management">
      <div className="profile-el-wrapper">
        <h2 className="profile-information-title">
          {t('profile.assetManagement')}
        </h2>
        <ProfileAssetManagementStatistics dataFund={asset} />

        {asset.length > 0 ? (
          <div>
            <div className="profile-asset-management-overview-product">
              <Row gutter={[12, 12]}>
                {asset.map((item: any) => (
                  <Col {...{ xs: 12, sm: 12, md: 6 }} key={item.id}>
                    <OverviewAssetProduct
                      selectedProgramId={selectedProductId}
                      handleClick={() => setSelectedProductId(item?.id)}
                      key={item.id}
                      asset={item}
                    />
                  </Col>
                ))}
              </Row>
            </div>

            <TabsAssetManagement
              selectedProductId={selectedProductId}
              asset={asset}
              programs={programs}
            />
          </div>
        ) : (
          <div className="profile-asset-no-data">
            <span>{t('profile.noAsset')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAssetManagement;

const TabsAssetManagement = ({ selectedProductId, asset, programs }) => {
  const [searchForm] = Form.useForm();
  const { t } = useHTranslation('common');

  useEffect(() => {
    if (!selectedProductId) return;
    searchForm?.submit();
  }, [selectedProductId]);

  if (!selectedProductId)
    return (
      <div className="profile-asset-management-no-product">
        <IconWarning />
        {t('profile.pleaseSelectProduct')}
      </div>
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
      <TableComponent
        asset={asset}
        selectedProductId={selectedProductId}
        programs={programs}
      />
    </HFeature>
  );
};
