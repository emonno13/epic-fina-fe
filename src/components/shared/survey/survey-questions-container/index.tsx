import { Question } from '@components/shared/questions/question/types';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser, useIsAuthenticated } from '@lib/providers/auth';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  useSurveyQuestionIndex,
  useSurveySetQuestionIndex,
  useSurveySetSubmitedSurvey,
  useSurveySetSubmitSuccess,
  useSurveySubmitSuccess,
} from '../contexts/survey-hooks';
import { useRedirectToSurveyResultPage } from '../hooks';
import SurveyProgress from '../survey-progress';
import SurveyQuestionsForm from '../survey-questions-form';
import SurveyQuestionsTaskForm from '../survey-questions-form/survey-question-task';
import SurveySuccess from '../survey-success';
import { SurveyUtils } from '../utils';
import { setDocumentDetail } from './../../../../../webapp/schema-form/features/actions';

const SurveyQuestionsContainer = () => {
  const dispatch = useDispatch();
  const { t } = useHTranslation('admin-common');
  const questionIndex = useSurveyQuestionIndex();
  const setQuestionIndex = useSurveySetQuestionIndex();
  const setSubmitedSurvey = useSurveySetSubmitedSurvey();
  const setSubmitSuccess = useSurveySetSubmitSuccess();
  const submitSuccess = useSurveySubmitSuccess();
  const questionGroup = useDocumentDetail();
  const isAuthenticated = useIsAuthenticated();
  const currentUser = useCurrentUser();
  const { query } = useRouter();

  const questions: any[] = useMemo(
    () => questionGroup?.children || [],
    [questionGroup],
  );

  const currentQuestion: Question = questions[questionIndex];

  const showResult = useMemo(
    () => questionIndex >= questions.length,
    [questionIndex, questions],
  );

  const redirectToSurveyResultPage = useRedirectToSurveyResultPage();

  const increaseIndexByOne = () => {
    setQuestionIndex(questionIndex + 1);
  };
  const resetIndex = () => {
    setQuestionIndex(0);
  };
  const onSubmitSuccess = async (response) => {
    /**
     * LOAN SURVEY 
        LOGIN: user by existed phone
        NOT LOGIN: new user with phone
     */
    // This function save SurveyResult to QuestionGroup
    if (query?.taskId && query?.userId) {
      FormUtils.submitForm(
        {
          questionGroupId: query?.documentId,
          surveyResultId: response?.id,
        },
        {
          nodeName: `tasks/update-survey/first-time/${query?.taskId}`,
          method: 'put',
          showSuccessMessage: false,
        },
      );

      return;
    }

    /**
     * LINK SURVEY 
        LOGIN: by current user
        NOT LOGIN: by create new user after this function
     */
    // This function save SurveyResult to QuestionGroup
    if (isAuthenticated) {
      FormUtils.submitForm(
        {
          page: location.href,
          customerName: ConverterUtils.getFullNameUser(currentUser),
          phone: currentUser?.tels?.[0]?.tel,
          email: currentUser?.emails?.[0]?.email,
        },
        {
          nodeName: 'tasks/public',
          method: 'post',
          showSuccessMessage: false,
          onGotSuccess: () => {
            redirectToSurveyResultPage();
          },
        },
      );
    }
    setSubmitedSurvey(response);
    setSubmitSuccess(true);
  };

  const deleteSubQuestions = (form) => {
    const currentqIDX = questions?.[questionIndex]?.qIDX;
    const nextqIDX = questions?.[questionIndex + 1]?.qIDX;
    const isInterger = new RegExp('^\\d+$');

    if (
      isInterger.test(currentqIDX) &&
      currentqIDX?.split('-')?.length === 1 &&
      nextqIDX?.split('-')?.length === 2
    ) {
      const regex = new RegExp(`${currentqIDX}-\\d+`);
      const questionGroupClone = cloneDeep(questionGroup);

      const newChildren = questionGroupClone?.children?.filter(
        (item) => !regex.test(item?.qIDX),
      );
      const newQuestionGroup = {
        ...questionGroupClone,
        children: [...newChildren],
      };

      const formValues = cloneDeep(form.getFieldsValue());

      const newSurveyDetails = formValues?.surveyDetails?.filter(
        (item) => !regex.test(item?.questionData?.qIDX),
      );

      const newSurveyDetailsSecond = newSurveyDetails?.slice(0, -1) || [];

      const newFormValues = {
        ...formValues,
        surveyDetails: newSurveyDetailsSecond,
      };

      form.setFieldsValue(newFormValues);

      const newQuestionGroupAfterRemoveSubQuestions = newQuestionGroup;

      dispatch(
        setDocumentDetail({
          featureId: 'survey',
          documentDetail: newQuestionGroupAfterRemoveSubQuestions,
          namespace: 'documentDetail',
          documentDetailVisibility: true,
        }),
      );
      return newQuestionGroupAfterRemoveSubQuestions;
    }
    return undefined;
  };

  const onNextWithSubQuestions = async ({ surveyDetail, form }) => {
    if (
      (query?.documentId || (query?.taskId && query?.userId)) &&
      surveyDetail?.type === 'TEXT_SELECTION'
      // &&  surveyDetail?.selectedOptions[0]?.subQuestions?.length > 0
    ) {
      const subQuestionsClone =
        cloneDeep(surveyDetail?.selectedOptions[0]?.subQuestions) || [];

      const questionGroupClone = cloneDeep(questionGroup);

      const newQuestionGroupChildren = [
        ...questionGroupClone?.children.slice(0, questionIndex + 1),
        ...subQuestionsClone,
        ...questionGroupClone?.children.slice(questionIndex + 1),
      ];

      const newQuestionGroup = {
        ...questionGroupClone,
        children: [...newQuestionGroupChildren],
      };
      dispatch(
        setDocumentDetail({
          featureId: 'survey',
          documentDetail: newQuestionGroup,
          namespace: 'documentDetail',
          documentDetailVisibility: true,
        }),
      );
    }
  };

  const onNextQuestion = ({ surveyDetail, form }) => {
    onNextWithSubQuestions({ surveyDetail, form });
    if (
      currentQuestion?.required &&
      !SurveyUtils.requireCondition(surveyDetail)
    ) {
      // message.error(
      //   t('Required survey question error', {
      //     en: 'You must answer this answer',
      //     vn: 'Bạn phải trả lời câu hỏi này',
      //   }),
      //   1,
      // );
      return;
    }
    increaseIndexByOne();
  };

  const onBackQuestion = () => {
    setQuestionIndex(questionIndex - 1);
  };

  // SURVERY LINK LOAN PAGE
  if (query?.taskId && query?.userId) {
    return (
      <div>
        <SurveyProgress currentIndex={questionIndex} />
        <SurveyQuestionsTaskForm
          {...{
            onNextQuestion,
            onBackQuestion,
            showResult,
            onChangeResult: resetIndex,
            onSubmitSuccess,
            currentQuestion,
            deleteSubQuestions,
          }}
        />
      </div>
    );
  }

  // SURVERY LINK PAGE
  return (
    <div>
      {!showResult && <SurveyProgress currentIndex={questionIndex} />}
      {!submitSuccess && (
        <SurveyQuestionsForm
          {...{
            onNextQuestion,
            onBackQuestion,
            showResult,
            onChangeResult: resetIndex,
            onSubmitSuccess,
            currentQuestion,
            deleteSubQuestions,
          }}
        />
      )}
      {submitSuccess && <SurveySuccess />}
    </div>
  );
};

export default SurveyQuestionsContainer;
