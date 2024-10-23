import { endpoints } from '@lib/networks/endpoints';
import { doRequest } from '@lib/networks/http';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LoansIntroducePage from '../components/features/client/loans-introduce-landing';
import LoansIntroduceLayout from '../layouts/loans-introduce';

const LoansIntroduceLandingPage = ({ data }) => {
  return <LoansIntroducePage data={data} />;
};

LoansIntroduceLandingPage.Layout = LoansIntroduceLayout;

const code = 'LANDING';

export const getServerSideProps = async ({ locale, query }) => {
  const fetchProject = async () => {
    return await doRequest(
      {
        url: `${endpoints.endpointWithApiDomain(`/configurations/public/${code}`)}`,
      },
      'get',
    );
  };

  const data = await fetchProject();

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'second-page',
        'calculator-toolkit',
      ])),
      query,
      data,
    },
  };
};

export default LoansIntroduceLandingPage;
