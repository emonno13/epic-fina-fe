import FeaturedNews from '@components/shared/client/featured-news';
import ClientFinancialProductsIntroduction from '@components/shared/client/financial-products-introduction';
import ClientPageCover from '@components/shared/client/page-cover';
import ClientWhyChooseFinaInsurance from '@components/shared/client/why-choose-fina-insurance';
import { useHTranslation } from '@lib/i18n';
import Head from 'next/head';
import { ClientHomeFeaturedProductsInsuranceWithFetching } from '../home/client-home-featured-products/insurance-products';

import './insurances.module.scss';

const ClientInsurances = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-insurances">
      <Head>
        <title>Danh sách bảo hiểm</title>
      </Head>
      <ClientPageCover
        {...{
          title: t('client_insurances_cover_title', {
            en: 'List insurance',
            vn: 'Danh sách bảo hiểm',
          }),
          description: t('client_insurances_cover_desc', {
            en: "FINA's insurance products are insurance products related to Real Estate, People and Property in Real Estate.",
            vn: 'Sản phẩm bảo hiểm của FINA là những sản phẩm bảo hiểm liên quan tới lĩnh vực Bất Động Sản, Con người và Tài sản trong Bất Động sản.',
          }),
          homeRoute: '/bao-hiem',
          breadCrumbRoutes: [
            {
              path: '/danh-sach-bao-hiem',
              breadcrumbName: t('Insurance list', { vn: 'Danh sách bảo hiểm' }),
            },
          ],
        }}
      />
      <div className="max-w-1100 client-insurances__list m-auto">
        <ClientHomeFeaturedProductsInsuranceWithFetching />
      </div>
      <ClientWhyChooseFinaInsurance />
      <ClientFinancialProductsIntroduction />
      <FeaturedNews />
    </div>
  );
};

export default ClientInsurances;
