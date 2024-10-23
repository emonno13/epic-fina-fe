import { ROOT_TASK, TASK_TYPES } from '@constants/crm/task';
import { Button, Form, notification } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { TASK_PRODUCT_TYPES } from '@components/features/crm/tasks/utils';
import { HTextArea } from '@components/shared/common-form-elements/h-input';
import {
  InputEmailSchemaItem,
  InputFullNameSchemaItem,
  InputPhoneNumberSchemaItem,
} from '@components/shared/input-with-rule';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';

import './styles.module.scss';

const RequestCounsellingPage = () => {
  return <RequestCounsellingForm />;
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'second-page'])),
    },
  };
};

export default RequestCounsellingPage;

const RequestCounsellingForm = () => {
  const [form] = Form.useForm();
  const { t } = useHTranslation('common');
  const finaPortalFormSchema = useFinaPortalFormSchema();

  const handleSubmitForm = () => form.submit();

  return (
    <div className="request-counselling-page-form">
      <h2 className="request-counselling-page-form-title">
        {t('Event registration', { vn: 'Đăng ký sự kiện' })}
      </h2>
      <HForm
        {...{
          form,
          schema: finaPortalFormSchema,
          removeControlActions: true,
          nodeName: 'tasks/public',
          method: 'post',
          onDataReadyToSubmit: (formValue) => {
            const dataSubmit = {
              customerName: formValue.fullName,
              email: formValue.email,
              phone: formValue.tels[0].tel,
              note: formValue.note,
              rootTask: ROOT_TASK.FIDT,
              type: TASK_TYPES.FINANCIAL_PLANNING,
              page: location.href,
              productType: TASK_PRODUCT_TYPES.financial_planning,
            };
            return dataSubmit;
          },
          showSuccessMessage: false,
          onGotSuccess: () => {
            notification.success({
              message: t('Successfully', { vn: 'Thành công' }),
              description: t('Consultation request created', {
                vn: 'Đã đăng ký sự kiện',
              }),
            });
          },
          onGotError: (error) => {
            notification.error({
              message: t('Failure', { vn: 'Thất bại' }),
              description:
                error.message ||
                t('Consultation request creation failed, please try again', {
                  vn: 'Đăng ký sự kiện không thành công, vui lòng thử lại',
                }),
            });
          },
        }}
      />
      <Button
        onClick={handleSubmitForm}
        className="request-counselling-page-form-submit"
      >
        {t('Send information', { vn: 'Gửi thông tin' })}
      </Button>
    </div>
  );
};

const useFinaPortalFormSchema = () => {
  const { t } = useHTranslation('common');
  return () => {
    return [
      InputFullNameSchemaItem(),
      InputPhoneNumberSchemaItem(),
      InputEmailSchemaItem(),
      createSchemaItem({
        Component: HTextArea,
        name: 'note',
        componentProps: {
          placeholder: t('Note', { vn: 'Ghi chú' }),
        },
      }),
    ];
  };
};
