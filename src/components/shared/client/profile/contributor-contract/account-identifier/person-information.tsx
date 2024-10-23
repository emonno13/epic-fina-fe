import { STEP } from '@components/features/profiles/account-identifier/constanst';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm, HSubForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Col, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import {
  InfoAccountSchema,
  InfoAddressSchema,
  InfoBillingSchema,
} from './schema/person-information';

export const PersonInformation = ({
  setCurrentStep,
  initialValues,
  setInitialValues,
  setIsSignContract,
}) => {
  const { t } = useHTranslation('common');
  const [form] = useForm();
  const currentUser = useCurrentUser();
  // const [showModalOtp, setShowModalOtp] = useState(false);

  if (!initialValues) return <></>;

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
            setCurrentStep(1);
            setInitialValues({
              ...initialValues,
              emails: form?.getFieldsValue(['emails'])?.emails,
              tels: form?.getFieldsValue(['tels'])?.tels,
              address: form?.getFieldsValue(['address'])?.address,
              bankAccount: form?.getFieldsValue(['banks'])?.banks?.[0]
                ?.bankAccount,
              branchName: form?.getFieldsValue(['banks'])?.banks?.[0]
                ?.branchName,
            });
          },
          schema: PersonInformationSchema,
        }}
      />

      <div className="profile-contributor-contract-actions">
        <HButton
          type="default"
          size="large"
          onClick={() => setIsSignContract(false)}
        >
          {t('Cancel', { vn: 'Hủy bỏ' })}
        </HButton>
        <HButton
          type="primary"
          size="large"
          onClick={async () => {
            await form.validateFields();
            form?.submit();
          }}
        >
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

export const PersonInformationSchema = () => {
  const isMobile = useIsMobile();
  const { t } = useHTranslation('common');

  return [
    createSchemaItem({
      Component: () => {
        return (
          <Row gutter={isMobile ? [0, 0] : [20, 20]}>
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <div className="profile-title">
                {t('Personal information', { vn: 'Thông tin cá nhân' })}
              </div>
              <HSubForm schema={InfoAccountSchema} />
            </Col>
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <div className="profile-title">
                {t('Address', { vn: 'Địa chỉ' })}
              </div>
              <HSubForm schema={InfoAddressSchema} />
            </Col>

            <Col {...{ xs: 24, sm: 24, md: 24, lg: 24 }}>
              <div className="profile-title">
                {t('Bank Info', { vn: 'Thông tin ngân hàng' })}
              </div>
              <HSubForm schema={InfoBillingSchema} />
            </Col>
          </Row>
        );
      },
    }),
  ];
};
