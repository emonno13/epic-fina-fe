import { EditOutlined } from '@ant-design/icons';
import { STEP } from '@components/features/profiles/account-identifier/constanst';
import { ViewCollaboratorContract } from '@components/features/profiles/collaborator-contract';
import { useFetchCurrentUser } from '@components/features/profiles/referrer/hooks';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth, useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { CloseIconLargeSvg } from 'icons';
import { IconConfirmSignContract } from 'icons/rsvgs/confirm-sign-contract';
import { IconConfirmSignContractSuccess } from 'icons/rsvgs/confirm-sign-contract-success';
import { useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import { ContractSchemaForm } from './schema/info-contract';

const InfoContract = ({
  userInformation,
  setCurrentStep,
  setIsSignContract,
}) => {
  const { t } = useHTranslation('common');
  const [form] = useForm();
  const currentUser = useFetchCurrentUser();
  const { setCurrentUser } = useAuth();
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const [isSignContractSuccess, setIsSignContractSuccess] = useState(false);

  const userInformationConvert = {
    ...userInformation,
    email: userInformation?.emails[0].email,
    tel: userInformation?.tels[0].tel,
    // issuedOn: ConverterUtils.dateConverterToString(userInformation?.identification?.issuedOn),
    // placeOfIssue: userInformation?.identification?.placeOfIssue,
    address: `${userInformation?.address} ,${userInformation?.subDistrictName}, ${userInformation?.districtName} , ${userInformation?.stateName}`,
  };

  const handleConfirmSubmit = async () => {
    try {
      await form.validateFields();
      setVisibleModalConfirm(true);
    } catch (e) {
      FormUtils.showFormValidateFailMessage(
        t('Hợp đồng công tác viên chưa được kí.'),
        ' ',
      );
    }
  };

  return (
    <div className="profile-contributor-contract-info-contract">
      <div className={'form-person-information'}>
        <ViewCollaboratorContract
          {...{ userInformation: userInformationConvert }}
        />

        <HForm
          {...{
            endpoint: endpoints.endpointWithApiDomain(
              `/users/sign-collaborator-contract/${currentUser.id}`,
            ),
            method: 'put',
            // hiddenValues: { hasVerifyOtp: false, steps: STEP.CONTRACT },
            form,
            summitButtonStyleFull: true,
            hideSubmitAndContinueButton: true,
            hideControlButton: true,
            showSuccessMessage: false,
            onGotSuccess: () => {
              setIsSignContractSuccess(true);
              setTimeout(async () => {
                setIsSignContract(false);
                setCurrentUser({
                  ...currentUser,
                  hasCollaboratorContract: true,
                });
              }, 3000);
            },
            onDataReadyToSubmit: (document) => {
              const dataSubmit = {
                fullName: userInformationConvert?.fullName,
                hasVerifyOtp: false,
                idNumber: userInformationConvert?.idNumber,
                identification: {
                  ...userInformation?.identification,
                  signature: document?.identification?.signature,
                },
                steps: STEP.CONTRACT,
              };

              return dataSubmit;
            },
            schema: ContractSchemaForm,
          }}
        />
      </div>

      {userInformationConvert && (
        <Signature {...{ userInformation: userInformationConvert, form }} />
      )}

      <Modal
        {...{
          visible: visibleModalConfirm,
          closeIcon: <CloseIconLargeSvg />,
          closable: true,
          maskClosable: false,
          onCancel: () => setVisibleModalConfirm(false),
          width: 400,
          className: 'info-contract-modal-confirm profile-info-modal',
          footer: null,
        }}
      >
        {!isSignContractSuccess ? (
          <ConfirmSignContract
            form={form}
            setVisibleModalConfirm={setVisibleModalConfirm}
          />
        ) : (
          <ConfirmSignContractSuccess />
        )}
      </Modal>

      <div className="profile-contributor-contract-actions">
        <HButton type="default" size="large" onClick={() => setCurrentStep(1)}>
          {t('Cancel', { vn: 'Hủy bỏ' })}
        </HButton>
        <HButton type="primary" size="large" onClick={handleConfirmSubmit}>
          {t('Confirm', { vn: 'Xác nhận' })}
        </HButton>
      </div>
    </div>
  );
};

export default InfoContract;

export const Signature = ({ userInformation, form }) => {
  const { idNumber } = userInformation;
  const { t } = useHTranslation('common');
  const [visible, setVisible] = useState(false);
  const currentUser = useCurrentUser();
  const { setCurrentUser } = useAuth();
  let sigPad = {};

  const handleCreateSignature = async () => {
    const file = await FormUtils.submitForm(
      {
        name: `signature-${idNumber}-${new Date().getTime()}`,
        // @ts-ignore
        image: sigPad?.getTrimmedCanvas().toDataURL('image/png'),
      },
      {
        nodeName: 'file/upload-base64',
        method: 'post',
        showSuccessMessage: false,
      },
    );

    if (file) {
      setCurrentUser({ ...currentUser, signature: file?.url });
      const identification: any = {
        ...form?.getFieldsValue(['identification']),
        signature: file,
      };
      form?.setFieldsValue({ identification });
      setVisible(false);
    }
  };

  return (
    <>
      <Button
        className={'info-contract-signature'}
        style={{ width: '100%' }}
        type="primary"
        icon={<EditOutlined />}
        onClick={async () => setVisible(true)}
      >
        {t('Signature', { vn: 'Tạo chữ ký' })}
      </Button>

      <HModal
        {...{
          visible,
          onCancel: () => {
            setVisible(false);
            // @ts-ignore
            sigPad.clear();
          },
          onOk: () => {
            // @ts-ignore
            setUserInformation({
              trimmedDataURL: sigPad?.getTrimmedCanvas().toDataURL('image/png'),
            });
          },
          width: '80%',
        }}
        footer={
          <>
            <Button onClick={() => setVisible(false)} className="m-r-10">
              {t('Cancel', { vn: 'Hủy bỏ' })}
            </Button>
            <Button
              onClick={() => {
                // @ts-ignore
                sigPad.clear();
              }}
              className="m-r-10"
            >
              {t('Clear', { vn: 'Xóa' })}
            </Button>
            <Button
              onClick={handleCreateSignature}
              type="primary"
              className="m-r-10"
            >
              {t('Create', { vn: 'Tạo' })}
            </Button>
          </>
        }
      >
        <SignaturePad
          canvasProps={{ className: 'signature-pad' }}
          ref={(ref) => {
            sigPad = ref;
          }}
        />
      </HModal>
    </>
  );
};

export const ConfirmSignContract = ({ setVisibleModalConfirm, form }) => {
  const { t } = useHTranslation('common');

  return (
    <>
      <IconConfirmSignContract />
      <h2 className="info-contract-modal-confirm-title">
        {t('profile.contractConfirmation')}
      </h2>
      <p className="info-contract-modal-confirm-desc">
        {t('profile.contractConfirmationDesc')}
      </p>

      <div className="info-contract-modal-confirm-actions">
        <HButton
          type="default"
          size="large"
          onClick={() => setVisibleModalConfirm(false)}
        >
          {t('Cancel', { vn: 'Hủy bỏ' })}
        </HButton>
        <HButton type="primary" size="large" onClick={() => form.submit()}>
          {t('Confirm', { vn: 'Xác nhận' })}
        </HButton>
      </div>
    </>
  );
};

export const ConfirmSignContractSuccess = () => {
  const { t } = useHTranslation('common');

  return (
    <>
      <IconConfirmSignContractSuccess />
      <h2 className="info-contract-modal-confirm-title">
        {t('profile.successfullySigned')}
      </h2>
      <p className="info-contract-modal-confirm-desc">
        {t('profile.successfullySignedDesc')}
      </p>
    </>
  );
};
