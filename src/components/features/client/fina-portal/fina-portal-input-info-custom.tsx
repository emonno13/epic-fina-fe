import { TASK_PRODUCT_TYPES } from '@components/features/crm/tasks/utils';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { HModal } from '@components/shared/common/h-modal';
import { ROOT_TASK, TASK_TYPES } from '@constants/crm/task';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Button, Form } from 'antd';
import { TYPE_FINA_PORTAL, useFinaPortalContext } from './fina-portal-context';

export const FinaPortalInputInfoCustom = () => {
  const { setStartCall, setShowForm, showForm } = useFinaPortalContext();
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();

  const handleSubmitForm = () => {
    form.submit();
  };

  const handleCloseModal = () => {
    setShowForm(TYPE_FINA_PORTAL.HOME);
    form.resetFields();
  };

  return (
    <HModal
      {...{
        visible: showForm === TYPE_FINA_PORTAL.INPUT_INFO_CUSTOMER,
        closable: false,
        onCancel: handleCloseModal,
        className: 'fina-portal-on-phone-modal',
        footer: null,
        forceRender: true,
      }}
    >
      <div className="fina-portal-on-phone-modal-wrapper">
        <h2 className="fina-portal-on-phone-modal-title">
          Nhập thông tin của bạn
        </h2>
        <div className="fina-portal-form-content">
          <HForm
            {...{
              form,
              schema: () => [
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
                    placeholder: t('Enter the full name', {
                      vn: 'Nhập tên của bạn',
                    }),
                  },
                }),
                createSchemaItem({
                  Component: HInput,
                  name: 'phone',
                  label: t('Phone', { vn: 'Số điện thoại' }),
                  rules: [
                    {
                      required: true,
                      message: t('Phone is required', {
                        vn: 'Số điện thoại bắt buộc',
                      }),
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
              ],
              removeControlActions: true,
              endpoint: endpoints.endpointWithApiDomain('/tasks/public'),
              method: 'post',
              onDataReadyToSubmit: (values) => {
                const dataSubmit = {
                  customerName: values?.customerName,
                  phone: values?.phone,
                  rootTask: ROOT_TASK?.POS,
                  productType: TASK_PRODUCT_TYPES?.loan,
                  type: TASK_TYPES?.COUNSELLING,
                  page: location.href,
                };

                return dataSubmit;
              },
              showSuccessMessage: false,
              resetIfSuccess: true,
              onGotSuccess: () => {
                setShowForm(TYPE_FINA_PORTAL.ON_PHONE);
                setStartCall();
              },
            }}
          />
        </div>

        <div className="fina-portal-on-phone-modal-actions">
          <Button
            onClick={handleCloseModal}
            className="fina-portal-on-phone-modal-cancel"
          >
            Huỷ
          </Button>
          <Button
            onClick={handleSubmitForm}
            className="fina-portal-on-phone-modal-submit"
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </HModal>
  );
};
