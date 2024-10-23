import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import InformationSurveyLeftArrow from '@components/features/client/information-survey/icons/information-survey.left-arrow';
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
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { Form, Modal } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import {
  usePairingQuestionGroupByCode,
  useSurveyDetailContentByQuestionCode,
  useSurveyPreserveValues,
  useSurveyQuestionIndex,
  useSurveySetPreserveValues,
} from '../contexts/survey-hooks';
import { SurveyUtils } from '../utils';
import SurveyQuestionsFormFooter from './survey-questions-form.footer';
// import { FormUtils } from '@schema-form/utils/form-utils';

const SurveyQuestionsTaskForm = ({
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
  const { query } = useRouter();

  const questions = questionGroup?.children || [];

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
    if (currentIndex + 1 !== questions?.length) {
      await form.validateFields();
    }
    onNextQuestion({ surveyDetail, form });
    setPreserveValues(form.getFieldsValue());

    const isSubQuestionInCurrentSurveyDetail =
      form
        ?.getFieldsValue()
        ?.surveyDetails?.find(
          (item) => item?.questionId === currentQuestion?.id,
        )?.selectedOptions?.[0]?.subQuestions?.length > 0;

    if (
      questionGroup?.questionGroupType === 'GENERAL' &&
      isSubQuestionInCurrentSurveyDetail
    ) {
      return;
    }

    // After the last question, show the success message
    if (currentIndex + 1 === questions?.length) {
      form.submit();
    }
  };

  const onBack = async () => {
    if (currentIndex > 0) {
      onBackQuestion();
    }
  };

  const onChange = (value) => {
    if (!displayNextButton) onNext();
  };

  const onSubmitSuccessForm = () => {
    form.submit();
  };

  useEffect(() => {
    deleteSubQuestions(form);
  }, [currentIndex]);

  // After the last question, show the success message
  if (currentIndex === questions?.length) {
    return <MessageSuccess />;
  }

  return (
    <div className="survey-questions-form">
      <div className="survey-questions-form-navigation">
        <ArrowLeftOutlined
          style={{ fontSize: '18px' }}
          onClick={() => {
            onBack();
          }}
        />
        <span>
          {' '}
          <span style={{ fontWeight: 'bold' }}>{currentIndex + 1}</span> /{' '}
          <span>{questions?.length}</span>
        </span>
        <ArrowRightOutlined
          style={{ fontSize: '18px' }}
          onClick={() => {
            onNext();
          }}
        />
      </div>
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
            customerId: query?.userId,
            taskId: query?.taskId,
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
          nodeName: 'survey-results/public',
          onGotSuccess: onSubmitSuccess,
        }}
      />

      <ButtonBackToHomePage
        {...{ showConfirm: true, onSubmitSuccessForm: onSubmitSuccessForm }}
      />
    </div>
  );
};

export default SurveyQuestionsTaskForm;

const MessageSuccess = () => {
  const { t } = useHTranslation('admin-common');

  return (
    <div className="" style={{ textAlign: 'center', marginTop: '30px' }}>
      <img src="data:image/png;base64,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" />
      <h2>
        {t('Message sent successfully', { vn: 'Đã gửi thông tin thành công' })}
      </h2>
      <p>
        {t(
          'Thank you for submitting your information to the FINA System. We will respond to you as soon as possible. If you need urgent advice, please contact Hotline: 08 5749 8668',
          {
            vn: 'Cảm ơn bạn đã gửi thông tin đến Hệ thống của FINA. Chúng tôi sẽ phản hồi nhanh nhất đến Quý khách hàng. Nếu cần liên hệ tư vấn gấp vui lòng liên lạc số Hotline: 08 5749 8668',
          },
        )}
      </p>

      <ButtonBackToHomePage />
    </div>
  );
};

export const ButtonBackToHomePage = ({
  showConfirm = false,
  onSubmitSuccessForm = () => {},
}) => {
  const { t } = useHTranslation('common');
  const [showModal, setShowModal] = useState(false);
  const { push } = useRouter();

  const backToHome = () => {
    push('/');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (showConfirm) {
            setShowModal(true);
            return;
          }

          backToHome();
        }}
      >
        <InformationSurveyLeftArrow />
        <span className="m-l-10">
          {t('Back to home page', { vn: 'Trở lại trang chủ' })}
        </span>
      </div>

      <Modal
        visible={showModal}
        width={500}
        onCancel={closeModal}
        onOk={() => {
          onSubmitSuccessForm();
          backToHome();
        }}
        okText={t('Agree', { vn: 'Đồng ý' })}
        cancelText={t('cancel')}
      >
        {t('Are you sure you want to finish the reply')}
      </Modal>
    </>
  );
};
