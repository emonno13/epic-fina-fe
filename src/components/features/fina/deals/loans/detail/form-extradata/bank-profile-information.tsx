import { HForm } from '@schema-form/h-form';
import { Form } from 'antd';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { endpoints } from '../../../../../../../lib/networks/endpoints';
import { HModal } from '../../../../../../shared/common/h-modal';
import { BankProfileInformationSchemaForm } from './bank-profile-information.schema-form';

export const BankProfileInformation = ({
  dealDetail,
  showFormBankProfile,
  setShowFormBankProfile,
  onGotSuccess,
  status,
}) => {
  const { t } = useHTranslation('admin-common');
  const [form] = Form.useForm();
  const onCancelForm = () => {
    setShowFormBankProfile(false);
  };

  return (
    <HModal
      visible={showFormBankProfile}
      footer={<></>}
      onCancel={onCancelForm}
    >
      <HForm
        {...{
          endpoint: endpoints.endpointWithApiDomain(
            `/deal-details/update-status/${dealDetail?.id}`,
          ),
          featureId: 'deal-details',
          method: 'put',
          summitButtonStyleFull: true,
          submitButtonLabel: t('Submit'),
          hideSubmitAndContinueButton: true,
          layout: 'vertical',
          initialValues: {
            info: dealDetail?.info,
          },
          hiddenValues: {
            status,
            dealId: dealDetail.dealId,
          },
          form,
          onGotSuccess,
          showSuccessMessage: false,
          schema: BankProfileInformationSchemaForm,
        }}
      />
    </HModal>
  );
};
