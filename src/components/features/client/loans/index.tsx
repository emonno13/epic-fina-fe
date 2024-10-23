import FeaturedNews from '@components/shared/client/featured-news';
import ClientLeaveInfoForm from '@components/shared/client/leave-info-form';
import ClientLoanCalculatorIntroduction from '@components/shared/client/loan-calculator-introduction';
import ClientLoanList from '@components/shared/client/loan-list';
import ClientPageCover from '@components/shared/client/page-cover';
import ClientWhyChooseUs from '@components/shared/client/why-choose-us';
import { useHTranslation } from '@lib/i18n';
import Head from 'next/head';

import './loans.module.scss';

const ClienLoans = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-loans">
      <Head>
        <title>Danh sách sản phẩm vay</title>
      </Head>
      <ClientPageCover
        {...{
          title: t('client_loans_cover_title', {
            en: 'House loan',
            vn: 'Vay mua nhà',
          }),
          description: t('client_loans_cover_desc', {
            en: 'Home - land loan is a credit product to support capital to help customers pay expenses for the purpose of buying/receiving the transfer of houses and residential land.',
            vn: 'Vay mua nhà - đất là sản phẩm tín dụng nhằm hỗ trợ nguồn vốn giúp khách hàng thanh toán các chi phí cho mục đích mua/ nhận chuyển nhượng nhà ở, đất ở.',
          }),
          breadCrumbRoutes: [
            {
              path: '/danh-sach-san-pham-vay',
              breadcrumbName: t('House loan', { vn: 'Vay mua nhà' }),
            },
          ],
          imageSrc: '/assets/images/client_loan_list_cover.png',
        }}
      />
      <div className="max-w-1100 client-loans__list m-auto">
        <ClientLeaveInfoForm />
        <ClientLoanList />
      </div>
      <ClientWhyChooseUs />
      <ClientLoanCalculatorIntroduction />
      <FeaturedNews />
    </div>
  );
};

export default ClienLoans;
