import {
  TASK_PRODUCT_TYPES,
  TASK_TYPE,
} from '@components/features/crm/tasks/utils';
import { ConverterUtils } from '@lib/converter';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Form, Modal, notification } from 'antd';
import { FC } from 'react';
import { CloseIconLargeSvg } from '../../../../../icons';
import { useHTranslation } from '../../../../../lib/i18n';
import { ClientFundFormSchema } from './clien-fund-form-schema';

import './client-fund-certificate-request-counselling.scss';

interface ClientFundCertificateRequestCounsellingProps {
  visible: boolean;
  closeModal: () => void;
  fundData: any;
}

export const ClientFundCertificateRequestCounselling: FC<
  ClientFundCertificateRequestCounsellingProps
> = ({ visible, closeModal = () => {}, fundData }) => {
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();
  const { currentUser } = useAuth();

  const closeFormModal = () => {
    closeModal();
    form.resetFields();
  };

  const createRequestCounselling = async () => {
    try {
      const value = await form.validateFields();

      const dataSubmit = {
        email: value?.email,
        customerName: value?.fullName,
        phone: value?.phone,
        productId: fundData?.id,
        productType: TASK_PRODUCT_TYPES.investment,
        page: location.href,
        type: TASK_TYPE.FUND,
        note: value?.note,
      };

      FormUtils.submitForm(
        { ...dataSubmit },
        {
          endpoint: endpoints.generateNodeEndpoint('tasks/public'),
          method: 'post',
          onGotSuccess: () => {
            notification.success({
              message: 'Thành công',
              description: 'Đã tạo yêu cầu tư vấn',
            });
            closeFormModal();
          },
        },
      );
    } catch (e) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  return (
    <Modal
      {...{
        title: t('Thông tin đầu tư chứng chỉ quỹ', {
          en: 'Information on investment fund',
          vn: 'Thông tin đầu tư chứng chỉ quỹ',
        }),
        onCancel: closeModal,
        visible,
        footer: null,
        width: 400,
        closeIcon: <CloseIconLargeSvg />,
        className: 'modal-client-fund-form-view',
      }}
    >
      <div className="client-fund-form-view__info">
        <div className="client-fund-form-view__title">
          {t('BOND-INFORMATION', {
            en: 'Fund Information',
            vn: 'Thông tin chứng chỉ quỹ',
          })}
        </div>
        <div className="client-fund-form-view">
          <div className="client-fund-form-view__warp">
            <div className="client-fund-form-view__warp_item">
              <div className="client-fund-form-view__warp__label">
                {t('FUND NAME', { EN: 'Bond name', vn: 'Tên chứng chỉ quỹ' })}:{' '}
              </div>
              <div className="client-fund-form-view__warp__value">
                {fundData?.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      <HForm
        {...{
          form,
          schema: ClientFundFormSchema,
          removeControlActions: true,
          initialValues: {
            fullName: ConverterUtils.getFullNameUser(currentUser),
            email: currentUser?.emails?.[0]?.email || '',
            phone: currentUser?.tels?.[0]?.tel || '',
          },
        }}
      />

      <div className="client-bond-form-view__submit-actions">
        <Button
          {...{
            type: 'ghost',
            onClick: createRequestCounselling,
            className: 'client-bond-form-view__submit-actions-btn',
          }}
        >
          {t('Request counselling', { vn: 'Yêu cầu tư vấn' })}
        </Button>
      </div>
    </Modal>
  );
};
