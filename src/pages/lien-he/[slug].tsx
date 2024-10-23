import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LightlyClientLayout } from 'layouts/admin/lightly/client';
import ClientExpertDetail from '@components/features/client/expert-detail';
import { doRequest } from '@lib/networks/http';
import { endpoints } from '@lib/networks/endpoints';
import { USER_TYPES } from 'types/organization';
import { getUserIdFromSlug } from '@components/features/client/expert-detail/utils';

const ContactDetailPage = ({ contactDetail }: any) => {
  return <ClientExpertDetail {...{ contactDetail: contactDetail || {} }} />;
};

ContactDetailPage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale, params }) => {
  const contactDetailParams = {
    where: {
      type: USER_TYPES.teller,
    },
    include: ['org'],
  };
  const userId = getUserIdFromSlug(params?.slug);
  const filterSearchParams = encodeURIComponent(
    JSON.stringify(contactDetailParams),
  );
  const contactDetail = await doRequest(
    {
      url: `${endpoints.endpointWithApiDomain('/users/public-bankers')}/${userId}?filter=${filterSearchParams}`,
    },
    'get',
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'second-page',
        'admin-common',
      ])),
      contactDetail,
    },
  };
};

export default ContactDetailPage;
