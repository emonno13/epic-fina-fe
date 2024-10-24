import EmptyLayout from '@layouts/empty';
import { useEffect } from 'react';

import './index.module.scss';

const ClaimFinaIntransitPage = ({ query }) => {
  useEffect(() => {
    const iframe = document.getElementById(
      'if-claim-fina-intransit',
    ) as HTMLIFrameElement;
    iframe?.contentWindow?.postMessage({ windowParent: 'FINA' }, '*');
  }, []);

  return (
    <div className="claim-fina-intransit-container">
      <iframe
        id="if-claim-fina-intransit"
        src={`${process.env.NEXT_PUBLIC_CLAIM_GLOBAL_CARE}/admin/login?embeded=fina.claim.admin`}
        title="Claim Fina Intransit"
      ></iframe>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  return {
    props: { query },
  };
}

ClaimFinaIntransitPage.Layout = EmptyLayout;

export default ClaimFinaIntransitPage;
