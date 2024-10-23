import { notification } from 'antd';
import { ClientCounsellingRequestForm } from '@components/shared/client/counselling-request-modal-fom';
import { useHTranslation } from '@lib/i18n';
import ProductDetailLoanRegisterFormTitleHeader from './register-form.title-header';

const ProductDetailLoanRegisterFormMain = (props) => {
  const { t } = useHTranslation('common');
  const { setVisible, productType } = props;
  return (
    <div className="product-detail-loan-register-form-main">
      <ProductDetailLoanRegisterFormTitleHeader
        {...{
          order: 2,
          label: t('Customer info', { vn: 'Thông tin khách hàng' }),
        }}
      />
      <div className="product-detail-loan-register-form-main__content">
        <ClientCounsellingRequestForm
          {...{
            submitButtonLabel: t('Send infomation', { vn: 'Gửi thông tin' }),
            onGotSuccess: () => {
              notification.success({
                message: 'Thành công',
                description: 'Gửi yêu cầu tư vấn thành công',
              });
              setVisible(false);
            },
            onGotError: () => {
              notification.error({
                message: 'Thất bại',
                description: 'Gửi yêu cầu tư vấn không thành công',
              });
            },
            onDataReadyToSubmit: (value) => ({
              ...value,
              page: location.href,
              productType,
            }),
          }}
        />
      </div>
    </div>
  );
};

export default ProductDetailLoanRegisterFormMain;
