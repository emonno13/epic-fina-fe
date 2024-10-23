import { RightOutlined } from '@ant-design/icons';
import { PROPERTIES_STATUS } from '@components/features/fina/properties/contansr';
import ClientDetailPageCover from '@components/shared/client/detail-page-cover';
import { HomeRealEstateInvestmentList } from '@components/shared/client/home-real-estate-investment';
import ClientLeaveInfoForm from '@components/shared/client/leave-info-form';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Row, Spin } from 'antd';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePublicEnvironment } from 'system/hooks';
import RealEstateInvestmentDetail from './detail';
import RealEstateInvestmentDetailRequest from './real-estate-investment-detail-request';

import './real-estate-investment-detail.scss';

const ClientRealEstateInvestmentDetail = () => {
  const { t } = useHTranslation('common');
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<any>({});
  const slug = useMemo(() => RouteUtils.getAdminFeatureNames(), []);
  const filter = { where: { status: PROPERTIES_STATUS.ACTIVE, publish: true } };
  const onGotSuccessDetail = (response) => setProduct(response);

  const fetchProductDetail = useCallback(async () => {
    setLoading(true);
    const options = {
      featureId: 'products',
      nodeName: `properties/public/by-slug/${slug[1]}`,
      withRelations: ['org', 'category'],
      method: 'get',
      onGotSuccess: (response) => {
        onGotSuccessDetail({ ...response });
      },
    };
    await FormUtils.submitForm({}, { ...options, isSearchForm: true });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  return (
    <Spin spinning={loading}>
      <div className="client-bonds">
        <Head>
          <title>Bất động sản</title>
        </Head>
        <ClientDetailPageCover
          homeRoute="/dau-tu"
          breadCrumbRoutes={[
            {
              path: '/danh-sach-san-pham-bat-dong-san',
              breadcrumbName: t('List of real estate', {
                vn: 'Danh sách bất động sản',
              }),
            },
            {
              path: '#',
              breadcrumbName: `${product ? product.name : ''}`,
            },
          ]}
        />
        <ClientLeaveInfoForm isNew={true} />

        <div className="max-w-1100 client-real-estate-investment-detail m-auto">
          <div style={{ height: 20 }}></div>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={16}>
              <RealEstateInvestmentDetail realEstate={product} />
            </Col>
            <Col xs={24} md={8} className={'fund-detail--item'}>
              {/* <ClientRequestCounselling type={TYPE_REQUEST_COUNSELLING.FUND} data={fund}/> */}
              <RealEstateInvestmentDetailRequest data={product} />
            </Col>
          </Row>

          <div className="client-real-estate-investment-detail-related-projects">
            <div className="client-real-estate-investment-detail-related-projects-title">
              <h2>Dự án liên quan</h2>
              <a
                className="home-real-estate-investment-wrapper__link"
                href={'/danh-sach-san-pham-bat-dong-san'}
              >
                {t('Fund Certificates Wrapper', {
                  en: 'View all',
                  vn: 'Xem tất cả',
                })}
                <RightOutlined
                  style={{ fontSize: '12px', marginLeft: '10px' }}
                />
              </a>
            </div>

            <HFeature
              {...{
                featureId: 'properties-public',
                nodeName: 'properties/public',
              }}
            >
              <HSearchFormHiddenAble
                withRelations={['org']}
                pagination={{
                  filter: {
                    limit: +usePublicEnvironment('MAX_INDEX_PRIORITIZED') || 10,
                  },
                }}
                hiddenValues={{ filter }}
              />

              <HomeRealEstateInvestmentList />
            </HFeature>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ClientRealEstateInvestmentDetail;
