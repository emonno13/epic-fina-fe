import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'antd';
import { cloneDeep, isNil } from 'lodash';
import PreviewQuestion from '../preview-question';

import './preview-questions.module.scss';

interface PreviewQuestionsProps {
  questions: Array<any>;
  onChange?: Function;
  value?: Array<any>;
  children?: any;
  rowProps?: any;
  colProps?: any;
  disabled?: boolean;
  isPreviewHome?: boolean;
  questionGroupId?: any;
  questionGroupIdOfSurvey?: any;
  questionGroupType?: any;
}

const isAnswerChoosen = ({ questionIDX, ansIDX, value }) => {
  const question = cloneDeep(value)?.find(
    question => question?.questionId === questionIDX,
  );
  const isChoosen = question?.selectedOptions?.[0]?.optionIndex === ansIDX;
  return isChoosen;
};

const flattenQuestions = ({ arr, value }) => {
  return arr.reduce((result, item) => {
    result.push(item);
    if (item.answers) {
      item.answers?.map((ans, idx) => {
        if (ans.subQuestions) {
          if (isAnswerChoosen({ questionIDX: item?.id, ansIDX: idx, value })) {
            result.push(
              ...flattenQuestions({
                arr: ans.subQuestions,
                value,
              }),
            );
          }
        }
      });
    }
    return result;
  }, []);
};

const PreviewQuestions = ({
  questions,
  value = [],
  onChange = f => f,
  children,
  rowProps = {},
  colProps = {},
  disabled = false,
  isPreviewHome = false,
  questionGroupId = null,
  questionGroupIdOfSurvey = null,
  questionGroupType = 'TECHNICAL',
}: PreviewQuestionsProps) => {
  const { query } = useRouter();

  // const valueGroupIds = useMemo(() => {
  //   return cloneDeep(value)?.map(item => item?.questionId) || [];
  // }, [value]);

  // const isQuestionGroupMatchSurveyResult =
  //   questionGroupId === questionGroupIdOfSurvey &&
  //   !isNil(questionGroupId) &&
  //   !isNil(questionGroupIdOfSurvey);

  const isEditTaskSurveyResult =
    query?.documentId &&
    query?.featureNames?.includes('tasks') &&
    query?.featureNames?.includes('task');

  // if Yêu cầu tư vấn - detail - câu hỏi khảo sát => flattern this arr
  const processedQuestions = useMemo(() => {
    const cloneQuestions = cloneDeep(questions);
    if (
      isEditTaskSurveyResult &&
      // isQuestionGroupMatchSurveyResult &&
      questionGroupType === 'GENERAL'
      // valueGroupIds?.length > 0
    ) {
      return flattenQuestions({
        arr: cloneQuestions,
        value,
      });
    }
    return cloneQuestions;
  }, [isEditTaskSurveyResult, questionGroupType, questions, value]);

  const checkValueIncludesAsnwer = question =>
    value && value.some(({ questionId }) => questionId === question.questionId);

  const onAnswerChange = answerValue => {
    if (checkValueIncludesAsnwer(answerValue)) {
      const cloneValue = [...value];
      const questionIndex = value.findIndex(
        ({ questionId }) => questionId === answerValue.questionId,
      );
      cloneValue[questionIndex] = answerValue;
      onChange(cloneValue);
      return;
    }
    onChange([...value, answerValue]);
  };

  if (!(Array.isArray(processedQuestions) && processedQuestions.length > 0)) {
    return null;
  }

  return (
    <div className="preview-questions">
      <Row {...{ className: 'preview-questions__container', ...rowProps }}>
        {processedQuestions.map((questionData, index) => {
          return (
            <Col
              key={`question-preview-${questionData.id}-${index}`}
              {...{
                span: 24,
                className: 'preview-questions__question-item',
                ...colProps,
              }}
            >
              <PreviewQuestion
                {...{
                  data: questionData,
                  onChange: onAnswerChange,
                  questionValue: value?.find(
                    valueData => valueData?.questionId === questionData?.id,
                  ),
                  disabled,
                  isPreviewHome,
                }}
              />
            </Col>
          );
        })}
      </Row>
      {children}
    </div>
  );
};

export default PreviewQuestions;
