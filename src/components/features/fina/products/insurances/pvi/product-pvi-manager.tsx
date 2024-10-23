import { MobileUtils } from '@lib/utils/mobile';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useHTranslation } from '../../../../../../lib/i18n';
import { useCurrentUser } from '../../../../../../lib/providers/auth';
import { HSubForm } from '../../../../../../schema-form/h-form';
import PayMe from '../../../../../shared/payment-gateway/pay-me';
import { QUESTION_PVI_KEY } from '../constant';
import {
  ProductPviSchemaFormShort1,
  ProductPviSchemaFormShort2,
  SurveyQuestionSchemaForm,
  ViewConfirm,
} from './detail-product-pvi-schema-form';

import '../../product.module.scss';

const NEXT_ACTION_STEPS_LABEL_MAPPING = {
  [0]: 'Continue',
  [1]: 'Continue',
  [2]: 'Continue',
  [3]: 'Payment',
};

export const ViewProductPviManager = ({
  HFormProps,
  warning,
  setWarning,
  steps,
  setSteps,
  paymentLink,
}) => {
  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();
  const checkIsWebView = MobileUtils.checkIsWebView();
  useEffect(() => {
    const fieldValue = HFormProps?.form?.getFieldValue('staffInfo');
    if (currentUser && !fieldValue) {
      const staffInfo = {
        fullName: currentUser?.fullName,
        email: currentUser?.emails?.[0]?.email,
        tel: currentUser?.tels?.[0]?.tel,
        address: currentUser?.address,
      };
      HFormProps?.form?.setFieldsValue({ staffInfo });
    }
  }, [steps === 2]);

  useEffect(() => {
    const metaData = {
      [QUESTION_PVI_KEY.PVI_ATCD_ONE]: false,
      [QUESTION_PVI_KEY.PVI_ATCD_TWO]: false,
      [QUESTION_PVI_KEY.PVI_ATCD_THREE]: false,
      [QUESTION_PVI_KEY.PVI_ATCD_FOUR]: false,
    };
    HFormProps?.form?.setFieldsValue({ metaData });
  }, [warning === false]);

  const onSubmit = async () => {
    await HFormProps?.form.validateFields();
    if (steps !== 3) {
      setSteps(steps + 1);
      if (checkIsWebView) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    HFormProps?.form?.submit();

    if (!checkIsWebView) {
      setSteps(steps + 1);
    }
  };
  const onRollBack = () => {
    setSteps(steps - 1);
  };
  return (
    <>
      <h3 className={steps === 0 ? 'hidden' : ''}>
        {paymentLink
          ? 'Vui lòng nhập thông tin thanh toán'
          : 'Vui lòng nhập thông tin bảo hiểm'}
      </h3>
      {steps == 0 && (
        <div className={'introduce-pvi'}>
          <img src={'/assets/images/pvi.png'} alt="fina-pvi" />
        </div>
      )}
      {steps >= 1 && (
        <div className={steps !== 1 ? 'hidden' : ''}>
          <HSubForm
            {...{
              schema: () => SurveyQuestionSchemaForm(HFormProps, setWarning),
            }}
          />
        </div>
      )}
      {steps >= 2 && !warning && (
        <div className={steps !== 2 ? 'hidden' : ''}>
          <HSubForm
            {...{
              schema: () => ProductPviSchemaFormShort1(HFormProps),
            }}
          />
        </div>
      )}
      {steps >= 3 && !warning && (
        <div className={steps !== 3 ? 'hidden' : ''}>
          <ViewConfirm {...HFormProps} />
          <HSubForm schema={ProductPviSchemaFormShort2} />
        </div>
      )}

      {steps == 4 && !warning && !checkIsWebView && <PayMe url={paymentLink} />}

      {steps < 4 && (
        <div className={'product-pvi-btn'} style={{ display: 'flex' }}>
          {steps !== 0 && (
            <Button
              className={'product-pvi-btn__roll-back'}
              type="primary"
              onClick={onRollBack}
            >
              {t('Roll back')}
            </Button>
          )}
          {!warning && (
            <Button
              className={'product-pvi-btn__continue'}
              type="primary"
              onClick={onSubmit}
            >
              {t(NEXT_ACTION_STEPS_LABEL_MAPPING[steps])}
            </Button>
          )}
        </div>
      )}
    </>
  );
};
