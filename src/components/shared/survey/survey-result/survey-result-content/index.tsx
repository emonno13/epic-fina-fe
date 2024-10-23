import { useDocumentDetail } from '@schema-form/features/hooks';
import { Col, Row } from 'antd';
import SurveyResultContentSingleResult from './survey-result-content.single-result';

const SurveyResultContent = ({ result }) => {
  const questionGroup = useDocumentDetail();
  const questions = questionGroup?.children || [];

  return (
    <div className="survey-result-content">
      <Row gutter={24}>
        {questions.map((questionData, index) => {
          const resultData = result.find(
            ({ questionId }) => questionId === questionData.id,
          );

          return (
            <Col
              key={`survey-result-single-${index}`}
              {...{ xs: 24, sm: 24, md: 12 }}
            >
              <SurveyResultContentSingleResult
                {...{ questionData, resultData }}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default SurveyResultContent;
