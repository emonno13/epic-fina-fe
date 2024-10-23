import {
  fetchLoanPlanCalculationQuestionGroup,
  fetchLoanPlanCalculationQuestionGroupIdByCode,
  fetchSurveyResultByCustomerId,
} from '@components/features/crm/tasks/survey-form/utils';
import { PreviewQuestionsFormSchema } from '@components/shared/questions/preview-questions/preview-questions.form.schema';
import { SurveyQuestionUtils } from '@components/shared/questions/utils';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Divider } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

const TaskDetailSurveyForm = ({
  surveyQuestionForm,
  setSelectedProductId,
  userInfoId,
}) => {
  const [questionGroup, setQuestionGroup] = useState<any>({});
  const [questionGroupId, setQuestionGroupId] = useState<any>('');
  const [surveyResult, setSurveyResult] = useState<any>({});
  const { t } = useHTranslation('common');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const questions = questionGroup?.children || [];

  useEffect(() => {
    fetchLoanPlanCalculationQuestionGroupIdByCode({ setQuestionGroupId });
  }, []);

  useEffect(() => {
    (async () => {
      await fetchSurveyResultByCustomerId({
        userInfoId,
        setSurveyResult,
        form: surveyQuestionForm,
      });
      await fetchLoanPlanCalculationQuestionGroup({
        id: questionGroupId,
        setQuestionGroup,
      });
    })();
  }, [questionGroupId, surveyQuestionForm]);

  const taskHasSurveyResult = useMemo(() => !!surveyResult?.id, [surveyResult]);
  const formMethod = useMemo(
    () => (taskHasSurveyResult ? 'put' : 'post'),
    [taskHasSurveyResult],
  );
  const formNodeName = useMemo(
    () =>
      taskHasSurveyResult
        ? `survey-results/${surveyResult?.id}`
        : 'survey-results',
    [taskHasSurveyResult],
  );

  const formSchema = useCallback(
    (formProps) => {
      return [
        createSchemaItem({
          Component: (props) => <Divider {...props} />,
          colProps: { span: 24 },
          hidden: !questions.length,
          componentProps: {
            orientation: 'left',
            children: 'Phiếu điền thông tin bộ câu hỏi',
            style: { margin: '0' },
          },
        }),
        ...PreviewQuestionsFormSchema({
          formProps,
          formItemProps: {
            rules: SurveyQuestionUtils.ruleRequired(questions),
            className: 'survey-question-admin',
            hidden: !questions.length,
          },
          componentProps: {
            colProps: { span: 12 },
            questions,
            value: surveyResult?.surveyDetails,
          },
        }),
      ];
    },
    [surveyResult, questionGroup, taskHasSurveyResult, t],
  );

  // console.log('userInfoId', userInfoId);

  return (
    <>
      <div style={{ height: '500px', overflowX: 'auto' }}>
        <HForm
          {...{
            form: surveyQuestionForm,
            schema: formSchema,
            method: formMethod,
            hiddenValues: {
              questionGroupId: questionGroup?.id,
              customerId: userInfoId,
            },
            nodeName: formNodeName,
            resetIfSuccess: false,
            // onGotSuccess: handleGotSuccess,
            hideControlButton: true,
            // beforeSubmit: handleBeforeSubmit,
            useDefaultMessage: true,
            transport: {
              selectedCategoryId,
              setSelectedCategoryId,
              setSelectedProductId,
            },
          }}
        />
      </div>

      <div className="flex justify-end">
        <button
          style={{
            cursor: 'pointer',
            backgroundColor: '#0068ff',
            color: '#fff',
            fontSize: '14px',
            border: '1px solid #0068ff',
            borderRadius: '10px',
            padding: '5px 20px',
            margin: '5px 10px 0 5px',
          }}
          onClick={() => {
            surveyQuestionForm.submit();
          }}
        >
          {t('submit')}
        </button>
      </div>
    </>
  );
};

export default TaskDetailSurveyForm;
