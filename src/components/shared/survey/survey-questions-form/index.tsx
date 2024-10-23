import {
  DEFAULT_BORROWED_TIME,
  DEFAULT_DTI_INDEX,
} from '@components/shared/loan-ability/constants';
import { PreviewQuestionsFormSchema } from '@components/shared/questions/preview-questions/preview-questions.form.schema';
import {
  CALCULATION_QUESTION_CODE,
  CALCULATION_QUESTION_GROUP_CODE,
  DISPLAY_NEXT_PREVIEW_QUESTION_BUTTON_TYPES,
} from '@components/shared/questions/question/types';
import { ConverterUtils } from '@lib/converter';
import { useCurrentUser, useIsAuthenticated } from '@lib/providers/auth';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { Form } from 'antd';
import { useEffect, useMemo } from 'react';
import {
  usePairingQuestionGroupByCode,
  useSurveyDetailContentByQuestionCode,
  useSurveyPreserveValues,
  useSurveyQuestionIndex,
  useSurveySetPreserveValues,
} from '../contexts/survey-hooks';
import SurveyNavigation from '../survey-navigation';
import SurveyResult from '../survey-result';
import { SurveyUtils } from '../utils';
import SurveyQuestionsFormFooter from './survey-questions-form.footer';

const SurveyQuestionsForm = ({
  onNextQuestion,
  onBackQuestion,
  showResult,
  onChangeResult,
  onSubmitSuccess,
  currentQuestion,
  deleteSubQuestions,
}) => {
  const currentIndex = useSurveyQuestionIndex();
  const preserveValues = useSurveyPreserveValues();
  const setPreserveValues = useSurveySetPreserveValues();
  const currentUser = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const questionGroup = useDocumentDetail();
  const surveyQuestions: any[] = useMemo(() => {
    const questions = questionGroup?.children || [];

    return questions.map((question) => [question]);
    // return questions;
  }, [questionGroup]);
  const borrowedTime = useSurveyDetailContentByQuestionCode(
    CALCULATION_QUESTION_CODE.QUESTION_LA_BORROWED_TIME,
  );
  const realInterestRate = useSurveyDetailContentByQuestionCode(
    CALCULATION_QUESTION_CODE.QUESTION_LA_REAL_INTEREST_RATE,
  );
  const totalCost = useSurveyDetailContentByQuestionCode(
    CALCULATION_QUESTION_CODE.QUESTION_LA_COST_PER_MONTH,
  );
  const totalIncome = useSurveyDetailContentByQuestionCode(
    CALCULATION_QUESTION_CODE.QUESTION_LA_INCOME,
  );
  const loanAbilityQuestionGroup = usePairingQuestionGroupByCode(
    CALCULATION_QUESTION_GROUP_CODE.QG_LOAN_ABILITY,
  );

  const dtiIndex = useMemo(
    () => loanAbilityQuestionGroup?.metadata?.dtiIndex || DEFAULT_DTI_INDEX,
    [loanAbilityQuestionGroup],
  );
  const [form] = Form.useForm();

  const displayNextButton = useMemo(() => {
    return DISPLAY_NEXT_PREVIEW_QUESTION_BUTTON_TYPES.includes(
      currentQuestion?.type,
    );
  }, [currentQuestion]);

  const onNext = async () => {
    const formValues = form.getFieldsValue();
    const surveyDetail = SurveyUtils.getSurveyDetail(
      formValues?.surveyDetails,
      currentQuestion.id,
    );
    // Validate survey
    await form.validateFields();
    onNextQuestion({ surveyDetail, form });
    setPreserveValues(form.getFieldsValue());
  };

  const onNavigate = (index) => {
    // setCurrentIndex(index);
    // setPreserveValues(form.getFieldsValue());
  };

  const onChange = (value) => {
    if (!displayNextButton) onNext();
  };

  useEffect(() => {
    deleteSubQuestions(form);
  }, [currentIndex]);

  return (
    <div className="survey-questions-form">
      <HForm
        {...{
          form,
          removeControlActions: true,
          style: { display: showResult ? 'none' : 'block' },
          schema: (props) =>
            PreviewQuestionsFormSchema({
              formProps: props,
              componentProps: {
                questions: surveyQuestions[currentIndex],
                isPreviewHome: true,
                onChange,
                isHighlightError: true,
                children: displayNextButton && (
                  <SurveyQuestionsFormFooter {...{ onNextQuestion: onNext }} />
                ),
              },
            }),
          method: 'post',
          initialValues: preserveValues,
          hiddenValues: {
            questionGroupId: questionGroup?.id,
            customerId: currentUser?.id,
            customerInfo: {
              fullName: ConverterUtils.getFullNameUser(currentUser),
              email: currentUser?.emails?.[0]?.email,
              tel: currentUser?.tels?.[0]?.tel,
            },
            metaData: {
              loanAbilityParam: {
                borrowedTime: borrowedTime || DEFAULT_BORROWED_TIME,
                realInterestRate,
                totalCost,
                totalIncome,
                dtiIndex,
              },
            },
          },
          nodeName: isAuthenticated
            ? 'survey-results'
            : 'survey-results/public',
          onGotSuccess: onSubmitSuccess,
        }}
      />
      {!showResult && (
        <SurveyNavigation
          {...{
            result: preserveValues.surveyDetails,
            currentIndex,
            onNavigate,
          }}
        />
      )}
      {showResult && (
        <SurveyResult
          {...{ form, onChangeResult, result: preserveValues.surveyDetails }}
        />
      )}
    </div>
  );
};

export default SurveyQuestionsForm;
