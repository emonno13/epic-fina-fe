import { useHTranslation } from '@lib/i18n';
import { useAuth } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { Button, Form, Modal } from 'antd';
import { useState } from 'react';
import { ClientBondTransactionFormSchema } from './bond-list-main.bond-transaction-schema';

export const ClientBondTransactionFormDetail = ({
  bondData,
  closeModal = () => {},
}) => {
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();
  const { currentUser, isAuthenticated } = useAuth();
  const [isValid, setIsValid] = useState<boolean>(false);
  return (
    <div>
      <div className="client-bond-form-view__title">
        {t('BOND-INFORMATION', {
          en: 'Customer information',
          vn: 'Thông tin Khách hàng',
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
          onDataReadyToSubmit: (values) => ({
            ...values,
          }),
          initialValues: {
            professionalInvestor: 'no',
            fullName: currentUser?.fullName,
            email: currentUser?.emails?.[0]?.email || '',
            phone: currentUser?.tels?.[0]?.tel || '',
            quantity: 0,
          },
          onValuesChange: (_, allValues) => {
            const mustValidatedArray = [
              'professionalInvestor',
              'email',
              'fullName',
              'phone',
              'quantity',
            ];
            setIsValid(
              mustValidatedArray.every((field) => {
                const value = allValues?.[field] || '';
                return !!value?.toString().trim();
              }),
            );
          },
          hiddenValues: {
            productId: bondData?.id,
          },
          showSuccessMessage: false,
          onGotSuccess: () => {
            Modal.success({
              title: t('Register successfully!', {
                vn: 'Gửi yêu cầu tư vấn thành công!',
              }),
              content: t(
                'FINA will quickly. Thank you for accompanying FINA.',
                {
                  vn: 'FINA sẽ nhanh chóng kiểm tra. Cảm ơn quý khách đã đồng hành cùng FINA.',
                },
              ),
              centered: true,
            });
            closeModal();
          },
          transport: {
            bond: bondData,
          },
        }}
      />

      <Button
        {...{
          type: 'primary',
          onClick: () => {
            form?.submit();
          },
          className: 'client-bond-form-view__submit-btn',
          style: {
            width: '100%',
            height: '40px',
            background: isValid ? '#FF6C0E' : '',
            borderRadius: '4px',
            border: 'none',
            color: isValid ? '#fff' : '',
          },
          disabled: !isValid,
        }}
      >
        {t('Request counselling', { vn: 'Yêu cầu tư vấn' })}
      </Button>
    </div>
  );
};
