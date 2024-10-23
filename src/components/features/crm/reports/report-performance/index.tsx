import { usePublicEnvironment } from '../../../../../system/hooks';

const ReportPerformance = () => {
  const linkReportPerformance = usePublicEnvironment('REPORT_PERFORMANCE_URL');

  return (
    <div>
      <iframe width="100%" height="920"
        src={linkReportPerformance}></iframe>
    </div>
  );
};

export default ReportPerformance;
