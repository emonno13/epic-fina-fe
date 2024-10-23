import { STEP } from '@components/features/profiles/account-identifier/constanst';
import { HModal } from '@components/shared/common/h-modal';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth, useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Form } from 'antd';
import SignaturePad from 'react-signature-canvas';

export const SignatureReSign = (props) => {
  const { t } = useHTranslation('common');
  const {
    isVisible = false,
    setIsVisible,
    userInformation,
    setLoading,
    setReload,
    reload,
    setVisibleModalConfirm,
  } = props;
  const [form] = Form.useForm();
  const idNumber = userInformation?.idNumber;
  let sigPad = {};
  const currentUser = useCurrentUser();
  const { setCurrentUser } = useAuth();

  return (
    <HModal
      {...{
        title: t('Re-signature', { vn: 'Tạo chữ ký lại' }),
        visible: isVisible,
        width: '80%',
        onCancel: () => {
          setIsVisible(false);
          // @ts-ignore
          sigPad.clear();
        },
        footer: (
          <div>
            <Button
              onClick={() => {
                setIsVisible(false);
              }}
              className="m-r-10"
            >
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
              onClick={async () => {
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
                    onGotSuccess: (response) => {
                      const data = userInformation;
                      data.identification.signature = response;

                      FormUtils.submitForm(
                        {},
                        {
                          endpoint: endpoints.endpointWithApiDomain(
                            `/users/sign-collaborator-contract/${currentUser.id}`,
                          ),
                          method: 'put',
                          hiddenValues: {
                            hasVerifyOtp: false,
                            steps: STEP.CONTRACT,
                            ...data,
                          },
                          onGotSuccess: async () => {
                            setVisibleModalConfirm(true);
                            setReload(!reload);
                            RouteUtils.redirect(
                              '/profile/account-management/collaborator-contract',
                            );
                            setLoading(true);
                          },
                        },
                      );
                      // @ts-ignore
                      sigPad.clear();
                    },
                  },
                );
                if (file) {
                  setCurrentUser({
                    ...currentUser,
                    signature: file?.url,
                  });
                  const identification: any = {
                    ...form?.getFieldsValue(['identification']),
                    signature: file,
                  };
                  form?.setFieldsValue({ identification });
                  setIsVisible(false);
                }
              }}
              type="primary"
              className="m-r-10"
            >
              {t('Create', { vn: 'Tạo' })}
            </Button>
          </div>
        ),
      }}
    >
      <HForm
        {...{
          form,
          nodeName: 'file/upload-base64',
          hideControlButton: true,
          method: 'post',
          onDataReadyToSubmit: (values) => {
            return {
              name: `signature-${idNumber}-${new Date().getTime()}`,
              // @ts-ignore
              image: sigPad?.getTrimmedCanvas().toDataURL('image/png'),
            };
          },
          onGotSuccess: () => setIsVisible(false),
        }}
      >
        <SignaturePad
          canvasProps={{ className: 'signature-pad' }}
          ref={(ref) => {
            sigPad = ref;
          }}
        />
      </HForm>
    </HModal>
  );
};
