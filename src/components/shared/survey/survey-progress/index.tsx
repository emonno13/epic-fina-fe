import { useDocumentDetail } from '@schema-form/features/hooks';
import { Progress } from 'antd';

interface SurveyProgressProps {
  currentIndex: number;
}

const SurveyProgress = ({ currentIndex }: SurveyProgressProps) => {
  const questionGroup = useDocumentDetail();
  const questions: any[] = questionGroup?.children || [];
  const percent =
    questions.length > 0 ? ((currentIndex + 1) * 100) / questions.length : 0;

  return (
    <Progress
      {...{
        className: 'survey-progress',
        percent,
        showInfo: false,
        strokeColor: '#064DD6',
        trailColor: '#c9dcfd',
      }}
    />
  );
};

export default SurveyProgress;
