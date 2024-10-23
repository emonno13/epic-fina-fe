import { usePublicEnvironment } from '../../../../../system/hooks';

export default () => {
  const linkReportCallLog = usePublicEnvironment('REPORT_CALL_LOG_URL');

  return (
    <div>
      <iframe width="100%" height="920"
        src={linkReportCallLog}></iframe>
    </div>
  );
};
