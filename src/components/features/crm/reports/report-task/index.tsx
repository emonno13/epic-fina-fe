import { usePublicEnvironment } from '../../../../../system/hooks';

export default () => {
  const linkReportTask = usePublicEnvironment('REPORT_TASK_URL');

  return (
    <div>
      <iframe width="100%" height="920"
        src={linkReportTask}></iframe>
    </div>
  );
};
