import ExpertDetail from '@components/shared/client/expert-detail';
import Head from 'next/head';

import './expert-detail.module.scss';

const ClientExpertDetail = ({ contactDetail }) => {
  return (
    <div className="client-expert-detail">
      <Head>
        <title>Liên hệ</title>
      </Head>
      {/* <div className="client-expert-detail-container"> */}
      <ExpertDetail {...{ data: contactDetail }} />
      {/* </div> */}
    </div>
  );
};

export default ClientExpertDetail;
