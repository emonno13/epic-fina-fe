import ClientRequestCounselling, {
  TYPE_REQUEST_COUNSELLING,
} from '@components/shared/client/bond-detail/bond-detail-main/bond-detail-main.request';
import ClientDetailPageCover from '@components/shared/client/detail-page-cover';
import ClientLeaveInfoForm from '@components/shared/client/leave-info-form';
import { useHTranslation } from '@lib/i18n';
import { Col, Row } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { scrollToTop } from 'system/hooks';
import { ClientFundCertificateList } from '../client-fund-certificate-list';
import ClientRelatedProduct from '../client-related-product';
import { useFetchRelatedProducts } from '../client-related-product/hook';
import { FundCertificateDetail } from './client-fund-certificate-detail';
import { useFetchFundDetail } from './hooks';

import './client-fund-certificate-detail.module.scss';

const ClientFundCertificate = () => {
  const { t } = useHTranslation('admin-common');
  const router = useRouter();
  const { query } = router;
  const { featureNames } = query;
  const slug = featureNames?.[1] || '';
  const fund = useFetchFundDetail(slug);
  const { data: relatedProducts } = useFetchRelatedProducts(fund);

  useEffect(() => {
    scrollToTop();
  }, [slug]);

  return (
    <div className={'client-fund-certificate-detail'}>
      <Head>
        <title>Chứng chỉ quỹ</title>
      </Head>

      <ClientDetailPageCover
        breadCrumbRoutes={[
          {
            path: '/danh-sach-chung-chi-quy',
            breadcrumbName: t('funds', { vn: 'Danh sách chứng chỉ quỹ' }),
          },
          {
            path: '#',
            breadcrumbName: `${fund?.name || 'fund 1'}`,
          },
        ]}
      />

      <ClientLeaveInfoForm isNew={true} />

      <div className="max-w-1100 m-auto">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <FundCertificateDetail fund={fund} />
            <div className="client-fund-certificate-detail__related-products">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={24}>
                  <ClientRelatedProduct
                    productTitle="chứng chỉ quỹ"
                    seeAllHref="/danh-sach-chung-chi-quy"
                  >
                    <ClientFundCertificateList data={relatedProducts} />
                  </ClientRelatedProduct>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={24} md={8} className={'fund-detail--item'}>
            <div style={{ height: 15 }}></div>
            <ClientRequestCounselling
              type={TYPE_REQUEST_COUNSELLING.FUND}
              data={fund}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ClientFundCertificate;
