import ClientLeaveInfoForm from '@components/shared/client/leave-info-form';
import ClientPageCover from '@components/shared/client/page-cover';
import { useHTranslation } from '@lib/i18n';
import Head from 'next/head';
import ClientRealEstateInvestmentContent from './client-real-estate-investment-content';

import './real-estate-investment.module.scss';

const ClientRealEstateInvestment = () => {
  const { t } = useHTranslation('common');

  return (
    <div className="client-real-estate-investment">
      <Head>
        <title>Danh sách bất động sản</title>
      </Head>
      <ClientPageCover
        {...{
          title: t('client_bonds_cover_title', {
            en: 'bonds',
            vn: 'Danh sách bất động sản',
          }),
          description: t('client_bonds_cover_desc', {
            en: 'Home - land loan is a credit product to support capital to help customers pay expenses for the purpose of buying/receiving the transfer of houses and residential land.',
            vn: 'Sản phẩm bảo hiểm của FINA là những sản phẩm bảo hiểm liên quan tới lĩnh vực Bất Động Sản, Con người và Tài sản trong Bất Động sản.',
          }),
          homeRoute: '/dau-tu',
          breadCrumbRoutes: [
            {
              path: '/danh-sach-san-pham-bat-dong-san',
              breadcrumbName: t('Real Estate List', {
                vn: 'Danh sách bất động sản',
              }),
            },
          ],
          imageSrc: '/assets/images/client_loan_list_cover.png',
        }}
      />

      <ClientLeaveInfoForm isNew={true} />

      <div className="max-w-1100 m-auto">
        <ClientRealEstateInvestmentContent />
      </div>
    </div>
  );
};

export default ClientRealEstateInvestment;
