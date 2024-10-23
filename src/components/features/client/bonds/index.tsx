import ClientBondList from '@components/shared/client/bond-list';
import ClientLeaveInfoForm from '@components/shared/client/leave-info-form';
import ClientPageCover from '@components/shared/client/page-cover';
import { useHTranslation } from '@lib/i18n';
import Head from 'next/head';

import './bonds.module.scss';

const Clienbonds = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-bonds">
      <Head>
        <title>Trái phiếu</title>
      </Head>
      <ClientPageCover
        {...{
          title: t('client_bonds_cover_title', {
            en: 'bonds',
            vn: 'Trái phiếu',
          }),
          description: t('client_bonds_cover_desc', {
            en: 'Home - land loan is a credit product to support capital to help customers pay expenses for the purpose of buying/receiving the transfer of houses and residential land.',
            vn: 'Sản phẩm bảo hiểm của FINA là những sản phẩm bảo hiểm liên quan tới lĩnh vực Bất Động Sản, Con người và Tài sản trong Bất Động sản.',
          }),
          homeRoute: '/dau-tu',
          breadCrumbRoutes: [
            {
              path: '/danh-sach-trai-phieu',
              breadcrumbName: t('bonds', { vn: 'Trái phiếu' }),
            },
          ],
          imageSrc: '/assets/images/client_loan_list_cover.png',
        }}
      />

      <ClientLeaveInfoForm isNew={true} />
      <div className="max-w-1100 client-bond__list m-auto">
        <ClientBondList />
      </div>
    </div>
  );
};

export default Clienbonds;
