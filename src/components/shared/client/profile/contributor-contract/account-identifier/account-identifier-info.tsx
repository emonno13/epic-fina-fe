import { STEP } from '@components/features/profiles/account-identifier/constanst';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm, HSubForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Col, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { AccountIdentifierSchema } from './schema/account-identifier';

export const AccountIdentifierInfo = ({
  setCurrentStep,
  initialValues,
  setInitialValues,
  setIsSignContract,
}) => {
  const { t } = useHTranslation('common');
  const [form] = useForm();
  const currentUser = useCurrentUser();
  // const [showModalOtp, setShowModalOtp] = useState(false);

  const handleSubmit = async () => {
    await form.validateFields();
    form?.submit();
  };

  if (!initialValues) return null;

  return (
    <div className={'form-person-information'}>
      <HForm
        {...{
          endpoint: endpoints.endpointWithApiDomain(`/users/${currentUser.id}`),
          method: 'put',
          hiddenValues: { hasVerifyOtp: false, steps: STEP.PERSON_INFORMATION },
          form,
          initialValues,
          resetIfSuccess: false,
          summitButtonStyleFull: true,
          hideSubmitAndContinueButton: true,
          hideControlButton: true,
          showSuccessMessage: true,
          onGotSuccess: () => {
            setCurrentStep(2);
            setInitialValues({
              ...initialValues,
              identification: form?.getFieldsValue(['identification'])
                ?.identification,
              idNumber: form?.getFieldsValue(['idNumber'])?.idNumber,
              issuedOn: ConverterUtils.dateConverterToString(
                form?.getFieldsValue(['identification'])?.identification
                  ?.issuedOn,
              ),
              placeOfIssue: form?.getFieldsValue(['identification'])
                ?.identification?.placeOfIssue,
            });
          },
          schema: AccountIdentifierInfoSchema,
        }}
      />

      <div className="profile-contributor-contract-actions">
        <HButton type="default" size="large" onClick={() => setCurrentStep(0)}>
          {t('Cancel', { vn: 'Hủy bỏ' })}
        </HButton>
        <HButton type="primary" size="large" onClick={handleSubmit}>
          {t('Continue', { vn: 'Tiếp tục' })}
        </HButton>
      </div>

      {/* <OtpFormModal {...{
        className: 'form-person-information-otp',
        type: 'Emails',
        showModalOtp: showModalOtp,
        telOrEmail: form?.getFieldsValue(['emails'])?.emails?.[0]?.['email'],
        onGotSuccess: () => {
          form?.submit();
          setShowModalOtp(false);
        },
        handleCancel: () => {
          setShowModalOtp(false);
        },
      }}/> */}
    </div>
  );
};

export const AccountIdentifierInfoSchema = () => {
  const isMobile = useIsMobile();
  const { t } = useHTranslation('common');

  return [
    createSchemaItem({
      Component: () => {
        return (
          <Row gutter={isMobile ? [0, 0] : [20, 20]}>
            <Col {...{ xs: 24, sm: 24, md: 24, lg: 24 }}>
              <div className="profile-title">
                {t('Profile information', { vn: 'Thông tin giấy tờ' })}
              </div>
              <HSubForm schema={AccountIdentifierSchema} />
            </Col>
          </Row>
        );
      },
    }),
  ];
};
