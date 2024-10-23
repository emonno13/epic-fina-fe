import { PreviewQuestionsFormSchema } from '@components/shared/questions/preview-questions/preview-questions.form.schema';
import { SurveyQuestionUtils } from '@components/shared/questions/utils';
import { TASK_STATUSES, TASK_STATUSES_ASSIGNED } from '@constants/crm/task';
import { useCheckRoleFinaStaff } from '@dynamic-configuration/hooks';
import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Select } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PRODUCT_TYPES_MIGRATION_MAPPING } from '../utils';
import { ProductInfo } from './product-info';
import { useShareWithBank } from './share-info-with-bank/utils';
import {
  fetchLoanPlanCalculationQuestionGroup,
  fetchQuestionGroup,
  fetchSurveyResult,
  onFormSurveyQuestionGotSuccess,
} from './utils';

import './survey-form.module.scss';

const TaskDetailSurveyForm = ({
  setIsShowShareInfoButton,
  visibleShareInfoWithBank,
  setVisibleShareInfoWithBank,
  surveyQuestionForm,
  formShare,
  setSelectedProductId,
  selectedProductId,
}) => {
  const taskData = useDocumentDetail();
  const [questionGroup, setQuestionGroup] = useState<any>({});
  const [group, setGroup] = useState<any>([]);
  const [surveyResult, setSurveyResult] = useState<any>({});
  const { t } = useHTranslation('common');
  const [questionsKey, setQuestionsGroupKey] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const isFinaStaff = useCheckRoleFinaStaff();
  const {
    status,
    statusAssign,
    surveyResultId = '',
    questionGroupId = '',
  } = taskData;
  const shareWithBank = useShareWithBank();

  const isCantModify = [
    TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL,
    TASK_STATUSES_ASSIGNED.BANK_APPROVAL,
    TASK_STATUSES_ASSIGNED.BANK_REJECT,
  ].includes(taskData?.statusAssign);
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
  const groupKey = PRODUCT_TYPES_MIGRATION_MAPPING[taskData?.productType];
  const questions = questionGroup?.children || [];

  useEffect(() => {
    fetchQuestionGroup({ groupKey, setGroup });
  }, []);

  useEffect(() => {
    (async () => {
      await fetchSurveyResult({
        documentId: surveyResultId,
        setSurveyResult,
        form: surveyQuestionForm,
      });
      await fetchLoanPlanCalculationQuestionGroup({
        id: questionGroupId,
        setQuestionGroup,
      });
    })();
  }, [surveyResultId, questionGroupId, surveyQuestionForm]);

  useEffect(() => {
    setIsShowShareInfoButton(
      status === TASK_STATUSES.CONSULTED &&
        [
          TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE,
          TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL,
          TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS,
          TASK_STATUSES_ASSIGNED.NOT_PROCESSING,
        ].includes(statusAssign) &&
        questionsKey &&
        selectedProductId &&
        isFinaStaff,
    );
  }, [questionsKey, selectedProductId, status, statusAssign, isFinaStaff]);

  useEffect(() => {
    setQuestionsGroupKey(taskData?.questionGroupId);
  }, [taskData?.questionGroupId]);

  useEffect(() => {
    setSelectedCategoryId(taskData?.categoryId);
  }, [taskData?.categoryId]);

  const handleGotSuccess = async (response) => {
    await onFormSurveyQuestionGotSuccess({
      response,
      questionsId: questionsKey,
      setSurveyResult,
      form: surveyQuestionForm,
      taskId: taskData?.id || '',
    });
    if (visibleShareInfoWithBank) {
      await shareWithBank({
        formShare,
        surveyQuestionForm,
        setVisibleShareInfoWithBank,
        responseUpdateSurveyResult: response,
      });
    }
  };

  const formSchema = useCallback(
    (formProps) => {
      return [
        ...ProductInfo(formProps),
        createSchemaItem({
          Component: Select,
          label: 'Bộ câu hỏi',
          colProps: { span: 8 },
          componentProps: {
            value: questionsKey,
            options: group,
            onChange: (id) => {
              setQuestionsGroupKey(id);
              fetchLoanPlanCalculationQuestionGroup({ id, setQuestionGroup });
            },
            disabled: isCantModify,
            size: 'large',
            placeholder: 'Chọn bộ câu hỏi',
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
            colProps: { span: 8 },
            questions,
            questionGroupId: questionGroup?.id,
            questionGroupIdOfSurvey: surveyResult?.questionGroupId,
            questionGroupType: questionGroup?.questionGroupType,
            surveyQuestionForm: surveyQuestionForm,
            value: surveyResult?.surveyDetails,
          },
        }),
      ];
    },
    [taskData, questionGroup, taskHasSurveyResult, t],
  );

  const handleBeforeSubmit = async (data) => {
    const productId = data?.getFieldValue('productId');
    const categoryId = data?.getFieldValue('categoryId');
    if (
      productId === taskData?.productId &&
      categoryId === taskData?.categoryId
    ) {
      return;
    }

    await FormUtils.submitForm(
      {
        productId: surveyQuestionForm?.getFieldValue('productId') || '',
        categoryId: surveyQuestionForm?.getFieldValue('categoryId') || '',
      },
      {
        nodeName: 'tasks',
        method: 'put',
        documentId: taskData?.id,
        showSuccessMessage: false,
        useDefaultMessage: true,
      },
    );
  };

  // Clear old result when switch other question group
  useEffect(() => {
    if (questionGroup?.id !== surveyResult?.questionGroupId) {
      surveyQuestionForm?.resetFields();
    }
  }, [questionGroup?.id]);

  return (
    <>
      <HForm
        {...{
          form: surveyQuestionForm,
          schema: formSchema,
          method: formMethod,
          hiddenValues: {
            questionGroupId: questionGroup?.id,
            taskId: taskData?.id,
          },
          nodeName: formNodeName,
          resetIfSuccess: false,
          onGotSuccess: handleGotSuccess,
          hideControlButton: true,
          beforeSubmit: handleBeforeSubmit,
          useDefaultMessage: true,
          initialValues: taskData,
          transport: {
            selectedCategoryId,
            setSelectedCategoryId,
            setSelectedProductId,
          },
        }}
      />
    </>
  );
};

export default TaskDetailSurveyForm;
