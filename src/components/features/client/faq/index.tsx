import ClientPageCover from '@components/shared/client/page-cover';
import { useHTranslation } from '@lib/i18n';
import Head from 'next/head';
import ClientFaqContent from './faq.content';

import './faq.module.scss';

const ClientFaq = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-faq">
      <Head>
        <title>Hỏi đáp</title>
      </Head>
      <ClientPageCover
        {...{
          title: t('client_faq_cover_title', {
            en: 'Frequently asked questions',
            vn: 'Câu hỏi thường gặp',
          }),
          description: t('client_faq_cover_desc', {
            en: 'Home - land loan is a credit product to support capital to help customers pay expenses for the purpose of buying/receiving the transfer of houses and residential land.',
            vn: 'Vay mua nhà - đất là sản phẩm tín dụng nhằm hỗ trợ nguồn vốn giúp khách hàng thanh toán các chi phí cho mục đích mua/ nhận chuyển nhượng nhà ở, đất ở.',
          }),
          breadCrumbRoutes: [
            {
              path: '/hoi-dap',
              breadcrumbName: t('FAQ', { vn: 'Hỏi đáp' }),
            },
          ],
        }}
      />
      <div className="max-w-1100 m-auto">
        <ClientFaqContent />
      </div>
    </div>
  );
};

export default ClientFaq;
