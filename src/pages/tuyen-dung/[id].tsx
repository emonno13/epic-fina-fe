import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RecruitLayout from '../../layouts/recruit';
import { doRequest } from '../../lib/networks/http';
import { endpoints } from '../../lib/networks/endpoints';
import JobDetail from '../../components/features/client/recruit/jobs/job-detail';

const RecruitDetailPage: any = ({ jobDetail, allJob }: any) => {
  return (
    <JobDetail {...{ jobDetail, allJob }} />
  );
};

RecruitDetailPage.Layout = RecruitLayout;

export const getServerSideProps = async ({ locale, params }) => {
  const jobParams = {
    where: {
      id: {
        nin: [params?.id],
      },
    },
  };
  const filterSearchParams = encodeURIComponent(JSON.stringify(jobParams));

  const jobDetail = await doRequest({
    url: `${endpoints.endpointWithApiDomain(`/jobs/public/${params?.id}`)}`,
  }, 'get');

  const allJob = await doRequest({
    url: `${endpoints.endpointWithApiDomain('/jobs/public')}?filter=${filterSearchParams}`,
  }, 'get');


  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'recruit'])),
      jobDetail,
      allJob,
    },
  };
};

export default RecruitDetailPage;
