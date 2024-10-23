import { ClientHomeUtils } from '@components/features/client/home/utils';
import LoanByProduct from '@components/features/client/loan-by-product';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Page = (data: any) => {
  return <LoanByProduct {...{ data }} />;
};

Page.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale, query }: any) => {
  const data = await ClientHomeUtils.getProductDetail(query?.ERP);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      data,
    },
  };
};

export default Page;
