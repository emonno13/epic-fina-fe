import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import QRCodeComponent from '@components/features/client/qr-code';
import { endpoints } from '@lib/networks/endpoints';
import { doRequest } from '@lib/networks/http';

const QRCodePage = ({ query, data }) => {
  return <QRCodeComponent query={query} data={data} />;
};

const code = 'QR-CODE';

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
      ...(await serverSideTranslations(locale, ['common', 'second-page'])),
      query,
      data,
    },
  };
};

export default QRCodePage;
