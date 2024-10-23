import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BuyInsurance from '@components/features/client/buy-insurance';
import { LightlyClientLayout } from 'layouts/admin/lightly/client';
import { endpoints } from '@lib/networks/endpoints';
import { doRequest } from '@lib/networks/http';

const BuyInsurancePage = ({ data }) => {
  return <BuyInsurance data={data} />;
};

BuyInsurancePage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale, query }) => {
  const { slug } = query;

  const fetchProject = async (slug) => {
    return await doRequest(
      {
        url: `${endpoints.endpointWithApiDomain(`/products/public/by-slug/${slug}?filter%5Binclude%5D%5B0%5D%5Brelation%5D=category`)}`,
      },
      'get',
    );
  };

  const data = await fetchProject(slug);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'second-page'])),
      data: data,
    },
  };
};

export default BuyInsurancePage;
