import { TASK_PRODUCT_TYPES } from '@components/features/crm/tasks/utils';
import { ROOT_TASK, TASK_TYPES } from '@constants/crm/task';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { Button, Form, Modal } from 'antd';
import FastRegisterSchema from './fast-register-schema';

import './rate-information.module.scss';

const RateInformation = ({ props }) => {
  return (
    <div className="loans-introduce-container">
      <div className="rate-information ">
        <RenderRateInformationComponent props={props} />
        <FormRegisterFast />
      </div>
    </div>
  );
};

export default RateInformation;

const RenderRateInformationComponent = ({ props }) => {
  return (
    <div className="rate-infomation-detail">
      <div className="title-rate-infomation">Vay mua nhà khó, đã có FINA</div>
      <div className="rate">
        <div>
          <div className="decription-rete">Lãi suất vay</div>
          <div className="decription-rate-last"> mua nhà chỉ từ </div>
        </div>
        <div className="number-rate">{props?.value?.[0]?.tags[0] || 7.59}</div>
        <div className="rate-year">&nbsp; %/năm</div>
      </div>
    </div>
  );
};

const FormRegisterFast = () => {
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();

  const submitForm = () => {
    form.submit();
  };

  return (
    <div className="form-register-fast">
      <div className="title-form-register">
        <div className="first-title-register">
          {t('Hurry up!', { vn: 'Nhanh tay lên!' })}
        </div>
        <div className="last-title-register">
          {t('Contact a consultant today', {
            vn: 'Liên hệ tư vấn ngay hôm nay',
          })}{' '}
        </div>
      </div>
      <FormRegisterSchema {...{ form }} />
      <ButtonSubmitForm {...{ onClick: submitForm }}>
        {t('Fast register', { vn: 'Đăng ký ngay' })}
      </ButtonSubmitForm>
    </div>
  );
};

export const ButtonSubmitForm = (props) => {
  const { children, onClick } = props;
  return (
    <Button onClick={onClick} className="button-register-fast">
      {children}
    </Button>
  );
};

export const FormRegisterSchema = (props) => {
  const { form } = props;
  const { t } = useHTranslation('common');

  return (
    <HForm
      {...{
        form,
        schema: FastRegisterSchema,
        removeControlActions: true,
        nodeName: 'tasks/public',
        method: 'post',
        onDataReadyToSubmit: (values) => {
          const dataSubmit = {
            customerName: values?.customerName,
            email: values?.email,
            phone: values?.phone,
            rootTask: ROOT_TASK?.LANDING_PAGE,
            productType: TASK_PRODUCT_TYPES?.loan,
            type: TASK_TYPES?.COUNSELLING,
            note:
              values?.consultingNeeds === 'other'
                ? values?.other
                : values?.consultingNeeds,
            page: location.href,
            condition: undefined,
          };
          delete values?.consultingNeeds;
          delete values?.other;

          return dataSubmit;
        },
        showSuccessMessage: false,
        onGotSuccess: () => {
          Modal.success({
            title: t('Register successfully!', { vn: 'Đăng ký thành công!' }),
            content: t(
              'FINA will quickly check and send the results to your email. Thank you for accompanying FINA.',
              {
                vn: 'FINA sẽ nhanh chóng kiểm tra và gửi kết quả đến email của bạn. Cảm ơn quý khách đã đồng hành cùng FINA.',
              },
            ),
            centered: true,
          });
        },
      }}
    />
  );
};
