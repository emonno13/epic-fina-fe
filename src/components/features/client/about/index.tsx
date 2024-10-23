import Head from 'next/head';
import ClientAboutWhatIsFina from './about.what-is-fina';
import ClientAboutWhyUseFina from './about.why-use-fina';
import ClientAboutLeader from './about.leader';

import './about.module.scss';

const ClientAbout = () => {
  return (
    <div className="client-about-wrapper">
      <Head>
        <title>Giới thiệu</title>
      </Head>
      <ClientAboutWhatIsFina />
      <ClientAboutWhyUseFina />
      <ClientAboutLeader />
    </div>
  );
};

export default ClientAbout;
