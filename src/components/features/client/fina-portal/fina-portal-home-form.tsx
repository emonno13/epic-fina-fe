import {
  MAPPING_PRODUCT_TYPES_TO_TYPE_TASK,
  PRODUCT_TYPES,
} from '@components/features/crm/tasks/constans';
import { TASK_PRODUCT_TYPES } from '@components/features/crm/tasks/utils';
import { useFetchReferralUser } from '@components/features/organizations/users/hooks';
import {
  HInput,
  HTextArea,
} from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import { ReferralSchema } from '@components/shared/user/signup/phone-form/phone-form-schema';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { Button, Form, Input } from 'antd';
import { ROOT_TASK } from 'constants/crm/task';
import { TYPE_FINA_PORTAL } from './fina-portal-context';

import './styles.module.scss';

const FinaPortalHomeForm = ({ setShowForm, showForm, formPhone = false }) => {
  const [form] = Form.useForm();
  const handleSubmitForm = () => form.submit();

  return (
    <>
      <div className="fina-portal-form-content">
        <HForm
          {...{
            form,
            schema: FinaPortalFormSchema,
            removeControlActions: true,
            nodeName: 'tasks/public',
            method: 'post',
            onDataReadyToSubmit: (values) => {
              const dataSubmit = {
                customerName: values?.customerName,
                email: values?.email,
                phone: values?.phone,
                sourceId: values?.sourceId,
                note: values?.note,
                rootTask: ROOT_TASK?.POS,
                productType: values?.productType || TASK_PRODUCT_TYPES?.loan,
                type:
                  MAPPING_PRODUCT_TYPES_TO_TYPE_TASK[values?.productType] ||
                  'counselling',
                page: location.href,
              };

              return dataSubmit;
            },
            transport: {
              type: formPhone ? TYPE_FINA_PORTAL.ON_PHONE : showForm,
              form,
            },
            showSuccessMessage: false,
            onGotSuccess: () => {
              setShowForm(TYPE_FINA_PORTAL.SUCCESS);
            },
          }}
        />
      </div>

      <Button
        onClick={handleSubmitForm}
        className="fina-portal-form-submit"
        block
      >
        Gửi thông tin
      </Button>
    </>
  );
};

export default FinaPortalHomeForm;

export const FinaPortalFormSchema = (props: HFormProps) => {
  const { t } = useHTranslation('common');
  const { transport, form } = props;

  return [
    createSchemaItem({
      Component: HInput,
      name: 'customerName',
      label: t('Full name', { vn: 'Tên của bạn' }),
      rules: [
        {
          required: true,
          message: t('Full name is required', {
            vn: 'Tên của bạn là bắt buộc',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter the full name', { vn: 'Nhập tên của bạn' }),
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'phone',
      label: t('Phone', { vn: 'Số điện thoại' }),
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
        modernLabel: true,
        placeholder: t('Enter the phone', { vn: 'Số điện thoại' }),
      },
    }),
    createSchemaItem({
      Component: HInput,
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
        modernLabel: true,
        placeholder: t('Enter the email', 'Email*'),
      },
    }),
    ...(transport.type !== TYPE_FINA_PORTAL.ON_PHONE
      ? [
          createSchemaItem({
            Component: HSelect,
            label: t('Classify', { vn: 'Phân loại' }),
            rules: [
              {
                required: true,
                message: 'Phân loại là bắt buộc',
              },
            ],
            colProps: { xs: 24, sm: 24, md: 24 },
            name: 'productType',
            componentProps: {
              modernLabel: true,
              placeholder: t('Please enter classify', { vn: 'Phân loại' }),
              options: PRODUCT_TYPES(t),
            },
          }),
        ]
      : []),
    ...(transport.type !== TYPE_FINA_PORTAL.ON_PHONE
      ? [
          ...ReferralSchema(),
          createSchemaItem({
            Component: ({ value: referralCode }) => {
              const user = useFetchReferralUser(referralCode?.trim());
              form?.setFieldsValue({ sourceId: user?.id });
              return <></>;
            },
            name: 'referralCode',
            hidden: true,
          }),
          createSchemaItem({
            Component: Input,
            name: 'sourceId',
            hidden: true,
          }),
        ]
      : []),
    createSchemaItem({
      Component: HTextArea,
      name: 'note',
      componentProps: {
        placeholder: t('Note', { vn: 'Ghi chú' }),
      },
    }),
  ];
};
