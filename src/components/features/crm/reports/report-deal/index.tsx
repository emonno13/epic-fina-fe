import { usePublicEnvironment } from '../../../../../system/hooks';

export default () => {
  const linkReportDeal = usePublicEnvironment('REPORT_DEAL_URL');

  return (
    <div>
      <iframe width="100%" height="920"
        src={linkReportDeal}></iframe>
    </div>
  );
};
