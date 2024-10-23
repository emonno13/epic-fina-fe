import {
  DEFAULT_BORROWED_TIME,
  DEFAULT_DTI_INDEX,
} from '@components/shared/loan-ability/constants';
import {
  CALCULATION_QUESTION_CODE,
  CALCULATION_QUESTION_GROUP_CODE,
} from '@components/shared/questions/question/types';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Form } from 'antd';
import { useMemo } from 'react';
import {
  usePairingQuestionGroupByCode,
  useSurveyDetailContentByQuestionCode,
} from '../../contexts/survey-hooks';
import { useRedirectToSurveyResultPage } from '../../hooks';
import { SurveySuccessFormSchema } from './survey-success-form.schema';

const SurveySuccessForm = ({
  submitedSurvey,
  onGotSuccess,
  isRedirectWhenSuccess = true,
  onExtraSubmitHandle = () => {},
}) => {
  const [form] = Form.useForm();
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

  const redirectToSurveyResultPage = useRedirectToSurveyResultPage();

  const onSubmit = async () => {
    const { customerInfo } = form.getFieldsValue();
    await form.validateFields();
    form.submit();
    FormUtils.submitForm(
      {
        page: location.href,
        customerName: customerInfo?.fullName,
        phone: customerInfo?.tel,
        email: customerInfo?.email,
      },
      {
        nodeName: 'tasks/public',
        method: 'post',
        showSuccessMessage: false,
        onGotSuccess: () => {
          if (isRedirectWhenSuccess) {
            redirectToSurveyResultPage();
          }
          onExtraSubmitHandle();
        },
      },
    );
  };
  return (
    <div className="survey-success-form">
      <HForm
        {...{
          form,
          nodeName: `survey-results/${submitedSurvey?.id}/public`,
          method: 'put',
          schema: SurveySuccessFormSchema,
          layout: 'vertical',
          removeControlActions: true,
          onGotSuccess,
          hiddenValues: {
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
        }}
      />
      <Button
        onClick={onSubmit}
        type="primary"
        className="survey-success-form__submit-btn"
      >
        Hoàn tất
      </Button>
    </div>
  );
};

export default SurveySuccessForm;
