import { MioCode } from '@components/features/client/fund-certificate/constants';
import {
  CitizenIdPhoto,
  PortraitAndSignature,
} from '@components/features/profiles/kyc';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HForm } from '@schema-form/h-form';
import { FormUtils, RelationUtils } from '@schema-form/utils/form-utils';
import { Button, Col, Form, Modal, notification, Row } from 'antd';
import { useEffect, useState } from 'react';
import { modals } from '../..';
import {
  BankAccountSchemaDetail,
  KycUserConfirmUsa,
  KycUserInformationAddressSchemaDetail,
  KycUserInformationCCCDSchemaDetail,
  KycUserInformationSchemaDetail,
} from './create.schema';

const title = 'Tạo mới tài khoản liên kết';

const steps = {
  info: 'info',
  confirm: 'confirm',
};

const ModalAffiliateCreate = (props) => {
  const { t } = useHTranslation('admin-common');
  const [formConfirmUsa] = Form.useForm();
  const [userInformationForm] = Form.useForm();
  const [mioKycInformationForm] = Form.useForm();
  const { action } = props;

  const [step, setStep] = useState(steps.info);

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain('/me'),
        onGotSuccess: (values) => {
          userInformationForm?.setFieldsValue({ ...values });
          mioKycInformationForm?.setFieldsValue({ ...values });
        },
        hiddenValues: {
          filter: {
            include: [
              RelationUtils.entity('country', ['id, description']),
              RelationUtils.entity('state', ['id, description']),
              RelationUtils.entity('district', ['id, description']),
              RelationUtils.entity('subDistrict', ['id, description']),
            ],
          },
        },
      },
    );
  }, []);

  const nextStep = () => {
    if (step === steps.confirm) {
      handleSubmitKyc();
      return;
    }
    setStep(steps.confirm);
  };

  const handleSubmitKyc = async () => {
    try {
      const [userInformation, mioKycInformation, confirmUsaData] =
        await Promise.all([
          userInformationForm.validateFields(),
          mioKycInformationForm.validateFields(),
          formConfirmUsa.validateFields(),
        ]);

      await FormUtils.submitForm(
        {
          ...userInformation,
          ...mioKycInformation,
          fatca: {
            fatca1: confirmUsaData?.fatca?.fatca1?.[0],
            fatca2: confirmUsaData?.fatca?.fatca2?.[0],
            fatca3: confirmUsaData?.fatca?.fatca3?.[0],
          },
        },
        {
          method: 'post',
          endpoint: endpoints.endpointWithApiDomain('/users/mio-kyc'),
          onGotSuccess: (response) => {
            // setMioEkyc(response);
            // if (callbackWhenKycSuccessfully) {
            //   callbackWhenKycSuccessfully(response);
            // }
            action(modals?.otpCreate?.name);
          },
          onGotError: handleKycError,
        },
      );
      // setLoading(false);
    } catch (e) {
      FormUtils.showFormValidateFailMessage(
        t('Form value is not correct', {
          vn: 'Giá trị biểu mẫu không chính xác',
        }),
        t('Please double check your form value and submit again.', {
          vn: 'Vui lòng kiểm tra kỹ giá trị biểu mẫu của bạn và gửi lại.',
        }),
      );
    }
  };

  const handleKycError = ({ error }) => {
    const { name, message, code } = error || {};
    const existsAccountErrorCodes = [
      MioCode.THE_PHONE_NUMBER_IS_EXIST,
      MioCode.THE_EMAIL_IS_EXIT,
      MioCode.THE_IDNO_IS_EXIT,
    ];
    if (existsAccountErrorCodes.includes(code)) {
      Modal.confirm({
        title: t('Information exists', { vn: 'Thông tin đã tồn tại' }),
        content: (
          <div>
            {message}
            <hr />
            {t(
              "If you already have an account on VinaCapital system, you can synchronize with FINA's account.",
              {
                vn: 'Nếu Quý khách đã có tài khoản trên hệ thống VinaCapital, Quý khách có thể đồng bộ với tài khoản của FINA.',
              },
            )}
          </div>
        ),
        okText: (
          <a
            onClick={() => {
              action(modals?.add?.name);
            }}
          >
            {t('Sync account', { vn: 'Đồng bộ tài khoản' })}
          </a>
        ),
        cancelText: t('Cancel', { vn: 'Huỷ bỏ' }),
      });
      return;
    }
    notification.error({ message: name, description: message });
  };

  const KycUserInformationUploadSchemaDetail = (props) => {
    return [CitizenIdPhoto(props), PortraitAndSignature(props)];
  };

  return (
    <div className="modal-affiliate-create">
      <h2 className="info-contract-modal-confirm-title">
        {t(title, { vn: title })}
      </h2>
      <div
        className="modal-affiliate-create-info"
        style={step !== steps.info ? { display: 'none' } : {}}
      >
        <HForm
          {...{
            form: userInformationForm,
            schema: (props) =>
              KycUserInformationUploadSchemaDetail({
                form: userInformationForm,
                ...props,
              }),
            hideControlButton: true,
            transport: {
              disableField: false,
            },
          }}
        />

        <Row gutter={[24, 24]}>
          <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
            <h3 className="kyc-title">
              {t('Personal information', { vn: 'Thông tin cá nhân' })}
            </h3>
            <HForm
              {...{
                form: userInformationForm,
                schema: KycUserInformationSchemaDetail,
                hideControlButton: true,
                transport: {
                  disableField: false,
                },
              }}
            />
          </Col>
          <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
            <h3 className="kyc-title">{t('Address', { vn: 'Địa chỉ' })}</h3>
            <HForm
              {...{
                form: userInformationForm,
                schema: (props) =>
                  KycUserInformationAddressSchemaDetail({
                    form: userInformationForm,
                    ...props,
                  }),
                hideControlButton: true,
                transport: {
                  disableField: false,
                },
              }}
            />
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col {...{ xs: 24, sm: 24, md: 24, lg: 24 }}>
            <h3 className="kyc-title">
              {t('Paper information', { vn: 'Thông tin giấy tờ' })}
            </h3>
            <HForm
              {...{
                form: userInformationForm,
                schema: KycUserInformationCCCDSchemaDetail,
                method: 'put',
                hideControlButton: true,
                transport: {
                  disableField: false,
                },
              }}
            />
          </Col>

          <Col {...{ xs: 24, sm: 24, md: 24, lg: 24 }}>
            <h3 className="kyc-title">
              {t('Bank information', { vn: 'Thông tin ngân hàng' })}
            </h3>
            <HForm
              {...{
                form: mioKycInformationForm,
                hideControlButton: true,
                schema: BankAccountSchemaDetail,
                transport: {
                  disableField: false,
                },
              }}
            />
          </Col>
        </Row>

        <div className="profile-info-affiliate-modal-button">
          <Button
            className="profile-affiliate-action-button profile-affiliate-action-next"
            onClick={() => {
              nextStep();
            }}
            style={{ width: '100%' }}
          >
            Tiếp
          </Button>
        </div>
      </div>

      {step === steps.confirm && (
        <div className="modal-affiliate-create-confirm">
          <Row gutter={[24, 24]}>
            <Col {...{ xs: 24, sm: 24, md: 24, lg: 24 }}>
              <HForm
                {...{
                  form: formConfirmUsa,
                  hideControlButton: true,
                  schema: KycUserConfirmUsa,
                  transport: {
                    disableField: false,
                    mioInfo: {},
                  },
                }}
              />
            </Col>
          </Row>

          <div className="profile-info-affiliate-modal-button">
            <Button
              className="profile-affiliate-action-button profile-affiliate-action-next"
              onClick={() => {
                nextStep();
              }}
              style={{ width: '100%' }}
            >
              Tiếp
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalAffiliateCreate;
