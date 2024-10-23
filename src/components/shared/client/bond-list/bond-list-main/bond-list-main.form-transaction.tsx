import {
  TASK_PRODUCT_TYPES,
  TASK_TYPE,
} from '@components/features/crm/tasks/utils';
import { CloseIconLargeSvg } from '@icons';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Form, Modal, notification } from 'antd';
import { TYPE_ACTIONS } from '../constants';
import { ClientBondTransactionFormSchema } from './bond-list-main.bond-transaction-schema';

import '../bond-item-form.module.scss';

const ClientBondTransactionForm = ({ visible, closeModal, bondData }) => {
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();
  const { currentUser } = useAuth();

  const closeFormModal = () => {
    closeModal();
    form.resetFields();
  };

  const handleSubmit = async () => {
    form.submit();
  };

  const createRequestCounselling = async () => {
    try {
      await form.validateFields();
      const value = form.getFieldsValue();

      const dataSubmit = {
        email: value?.email,
        customerName: value?.fullName,
        phone: value?.phone,
        productId: bondData?.bond?.id,
        productType: TASK_PRODUCT_TYPES.investment,
        page: location.href,
        type: TASK_TYPE.BOND,
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
    <div>
      <Modal
        {...{
          title:
            bondData?.type === TYPE_ACTIONS?.BUY
              ? t('bond_modal_title', {
                  en: 'Information on bond purchase orders',
                  vn: 'Thông tin đơn mua trái phiếu',
                })
              : t('bond_modal_title', {
                  en: 'Information on requesting bond advice',
                  vn: 'Thông tin yêu cầu tư vấn trái phiếu',
                }),
          onCancel: closeFormModal,
          visible,
          footer: null,
          width: 400,
          closeIcon: <CloseIconLargeSvg />,
          className: `modal-client-bond-form-view ${bondData?.type === TYPE_ACTIONS?.REQUEST ? 'modal-client-bond-form-request' : ''}`,
        }}
      >
        {bondData?.type === TYPE_ACTIONS?.REQUEST && (
          <div className="client-bond-form-view__info">
            <div className="client-bond-form-view__title">
              {t('BOND-INFORMATION', {
                en: 'Bond Information',
                vn: 'Thông tin trái phiếu',
              })}
            </div>
            <div className="client-bond-form-view">
              <div className="client-bond-form-view__warp">
                <div className="client-bond-form-view__warp_item">
                  <div className="client-bond-form-view__warp__label">
                    {t('BOND NAME', { EN: 'Bond name', vn: 'Tên trái phiếu' })}:{' '}
                  </div>
                  <div className="client-bond-form-view__warp__value">
                    {bondData?.bond?.name}
                  </div>
                </div>
              </div>
              <div className="client-bond-form-view__warp">
                <div className="client-bond-form-view__warp_item">
                  <div className="client-bond-form-view__warp__label">
                    {t('DENOMINATIONS', {
                      EN: 'Denominations',
                      vn: 'Mệnh giá',
                    })}
                    :{' '}
                  </div>
                  <div className="client-bond-form-view__warp__value">
                    {FormatterUtils.formatAmount(
                      bondData?.bond?.info?.parValueShares,
                    )}{' '}
                    {t('VNĐ/TP', { vn: 'VNĐ/TP' })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="client-bond-form-view__title">
          {t('BOND-INFORMATION', {
            en: 'Customer information',
            vn: 'Thông tin khách hàng',
          })}
        </div>
        <HForm
          {...{
            form,
            schema: ClientBondTransactionFormSchema,
            removeControlActions: true,
            nodeName: currentUser?.fullName
              ? 'transactions'
              : 'public/transactions',
            method: 'post',
            onDataReadyToSubmit: (values) => {
              const newData = {
                ...values,
                staffId: values?.referralCode,
                quantity: Number(values?.quantity),
              };
              delete values.referralCode;
              delete newData.referralCode;

              return newData;
            },
            initialValues: {
              professionalInvestor: 'no',
              fullName: currentUser?.fullName,
              email: currentUser?.emails?.[0]?.email || '',
              phone: currentUser?.tels?.[0]?.tel || '',
              quantity: 0,
            },
            hiddenValues: {
              productId: bondData?.bond?.id,
            },
            showSuccessMessage: false,
            onGotSuccess: () => {
              Modal.success({
                title: t('Register successfully!', {
                  vn: 'Gửi yêu cầu mua thành công!',
                }),
                content: t(
                  'FINA will quickly. Thank you for accompanying FINA.',
                  {
                    vn: 'FINA sẽ nhanh chóng kiểm tra. Cảm ơn quý khách đã đồng hành cùng FINA.',
                  },
                ),
                centered: true,
              });
              closeFormModal();
            },
            transport: {
              bond: bondData?.bond,
              type: bondData?.type,
            },
          }}
        />

        <div className="client-bond-form-view__submit-actions">
          {bondData?.type !== TYPE_ACTIONS?.BUY ? (
            <Button
              {...{
                type: 'ghost',
                onClick: createRequestCounselling,
                className: 'client-bond-form-view__submit-actions-btn',
              }}
            >
              {t('Request counselling', { vn: 'Yêu cầu tư vấn' })}
            </Button>
          ) : (
            <Button
              {...{
                type: 'primary',
                onClick: handleSubmit,
                className: 'client-bond-form-view__submit-actions-btn',
              }}
            >
              {t('Buy', { vn: 'Mua' })}
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ClientBondTransactionForm;
