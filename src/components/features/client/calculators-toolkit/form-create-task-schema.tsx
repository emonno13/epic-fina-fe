import { CloseOutlined } from '@ant-design/icons';
import { TASK_TYPE } from '@components/features/crm/tasks/utils';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Form, Input } from 'antd';
import { ArrowRightCircleRightSvg } from 'icons';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface FormCreateTaskProps {
  setIsShowCreateForm: any;
  actionAfterSubmit: any;
  closeModal: any;
  setDataSendEmail?: any;
}

const FormCreateTaskSchema = ({
  setIsShowCreateForm,
  actionAfterSubmit,
  closeModal,
  setDataSendEmail,
}: FormCreateTaskProps) => {
  const router = useRouter();
  const currentUser = useCurrentUser() || {};
  const [form] = Form.useForm();

  useEffect(() => {
    const { id, emails, tels } = currentUser;
    if (id) {
      form?.setFieldsValue({
        customerName: ConverterUtils.getFullNameUser(currentUser),
        email: emails?.[0]?.email || '',
        phone: tels?.[0]?.tel || '',
      });
    }
  }, [currentUser]);

  return (
    <div className="form-create-tasks">
      <div className="form-create-tasks-left"></div>

      <div className="form-create-tasks-right">
        <h2 className="form-create-tasks-title">
          Để lại thông tin cùng với FINA
          <CloseOutlined onClick={closeModal} />
        </h2>
        <hr />
        <HForm
          {...{
            schema: () => FormCreateTaskSchemaDetail(),
            nodeName: 'tasks/public',
            method: 'post',
            form,
            onDataReadyToSubmit: (value) => {
              const newData = {
                customerInfo: {
                  ...value,
                },
                type: TASK_TYPE.counselling,
                page: router?.asPath,
              };
              setDataSendEmail &&
                setDataSendEmail({
                  fullName: value?.customerName,
                  email: value?.email,
                  phone: value?.phone,
                });
              // delete value.fullName;
              // delete value.email;
              // delete value.tel;
              return newData;
            },
            onGotSuccess: (res) => {
              if (res) {
                closeModal();
                setIsShowCreateForm(true);
                actionAfterSubmit();
              }
            },
            submitButtonLabel: 'Nhấn để tiếp tục',
            iconBtnSubmit: <ArrowRightCircleRightSvg />,
            submitButtonClassName: 'form-create-tasks-btn-submit',
          }}
        />
      </div>
    </div>
  );
};

export default FormCreateTaskSchema;

const FormCreateTaskSchemaDetail = () => {
  const { t } = useHTranslation('common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'customerName',
      label: t('Full name', { vn: 'Tên đầy đủ' }),
      rules: [
        {
          required: true,
          message: t('Full name is required', { vn: 'Tên đầy dủ là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('Enter the full name', { vn: 'Nhập tên đầy đủ' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'email',
      label: t('Email', { vn: 'Email' }),
      rules: [
        {
          required: true,
          message: t('Email is required', { vn: 'Email bắt buộc' }),
        },
        {
          type: 'email',
          message: t('Your email is not valid', {
            vn: 'Không đúng định dạng email',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter the email', 'Nhập email'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'phone',
      label: t('Phone', { vn: 'Điện thoại' }),
      rules: [
        {
          required: true,
          message: t('Phone is required', { vn: 'Số điện thoại bắt buộc' }),
        },
        {
          pattern: /^0[0-9]{9}$/gm,
          message: t('Your phone is not valid', {
            vn: 'Không đúng định dạng số điện thoại',
          }),
        },
      ],
      componentProps: {
        normalize: (value, prevVal, prevVals) => value.trim(),
        placeholder: t('Enter the phone', { vn: 'Nhập số điện thoại' }),
      },
    }),
  ];
};
