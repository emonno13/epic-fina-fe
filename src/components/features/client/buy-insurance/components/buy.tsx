import { endpoints } from '@lib/networks/endpoints';
import { useAuth } from '@lib/providers/auth';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Form, Steps } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { USER_TYPES } from 'types/organization';
import { TYPE } from './form-staff';
import StepOne from './step-one';
import StepThree from './step-three';
import StepTow from './step-tow';
const { Step } = Steps;

const STEPS_WEB = [
  {
    title: 'Mua bảo hiểm',
  },
  {
    title: 'Xác nhận',
  },
  {
    title: 'Thanh toán',
  },
];

const STEPS_MOBILE = [
  {
    title: 'Mua',
  },
  {
    title: 'Xác nhận',
  },
  {
    title: 'Thanh toán',
  },
];

const Buy = (props) => {
  const { t } = useTranslation('common');
  const { currentUser } = useAuth();
  const { data } = props;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [paymentLink, setPaymentLink] = useState('');
  const isCollaborator =
    currentUser.type === USER_TYPES.collaborator ||
    currentUser.type === USER_TYPES.staff;

  const onChange = (value: number) => {
    if (value === 2) {
      return;
    }
    form.validateFields().then(() => {
      setCurrent(value);
    });
  };

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const createTransaction = (dataSubmit) => {
    if (dataSubmit?.amount === 0) {
      return false;
    }

    FormUtils.submitForm(
      {
        ...dataSubmit,
        subType: data?.name,
        type: 'insurances',
        productId: data.id,
      },
      {
        endpoint: endpoints.endpointWithApiDomain(
          '/transactions/public/insurance-multiple',
        ),
        method: 'post',
        onGotSuccess: (response) => {
          const newPaymentLink = response.paymentInfo.url || '';
          setPaymentLink(newPaymentLink);
          setCurrent(current + 1);
        },
      },
    );
  };

  const packages = data?.packages?.map((el, index) => ({
    ...el,
    value: index,
    label: `${el?.name}-${isCollaborator ? el?.price : el.priceRoot} VNĐ`,
  }));
  const listPackageStaff = packages?.filter((el) =>
    el?.objects?.find((e) => e === TYPE?.staff),
  );
  const listPackageRelative = packages?.filter((el) =>
    el?.objects?.find((e) => e === TYPE?.relative),
  );

  return (
    <div className="buy-insurance-page__step">
      <div className="buy-insurance-page__menu-step  menu-step-web">
        <Steps current={current} onChange={onChange} responsive={true}>
          {STEPS_WEB.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>

      <div className="buy-insurance-page__menu-step menu-step-mobile">
        <Steps
          current={current}
          onChange={onChange}
          size={'small'}
          type="navigation"
        >
          {STEPS_MOBILE.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>

      {current === 0 && (
        <div className="buy-insurance-page__step-one">
          <h1 className="buy-insurance-page__step-one__content-title">
            {t('Chọn gói bảo hiểm', { vn: 'Chọn gói bảo hiểm' })}
          </h1>
          {current === 0 && (
            <StepOne
              data={data}
              form={form}
              package={{ listPackageStaff, listPackageRelative }}
            />
          )}
          <Button
            className="buy-insurance-page__time-line__next"
            onClick={next}
          >
            Tiếp theo
          </Button>
        </div>
      )}

      {current === 1 && (
        <StepTow
          data={data}
          form={form}
          packages={packages}
          createTransaction={createTransaction}
        />
      )}

      {current === 2 && <StepThree link={paymentLink} />}
    </div>
  );
};

export default Buy;
