import React from 'react';
import { Button, Form, message } from 'antd';
import SignaturePad from 'react-signature-canvas';
import { HModal } from '../../../shared/common/h-modal';
import { FormUtils } from '../../../../schema-form/utils/form-utils';
import { useAuth, useCurrentUser } from '../../../../lib/providers/auth';
import { HForm } from '../../../../schema-form/h-form';
import { endpoints } from '../../../../lib/networks/endpoints';
import { STEP } from '../account-identifier/constanst';
import { RouteUtils } from '../../../shared/layout/router-contaner/utils';

export const SignatureReSign = (props) => {
  const { isVisible = false, setIsVisible, userInformation, setLoading, setReload, reload } = props;
  const [form] = Form.useForm();
  const idNumber = userInformation?.idNumber;
  let sigPad = {};
  const currentUser = useCurrentUser();
  const { setCurrentUser } = useAuth();

  return (
    <HModal{...{
      title: 'Tạo chữ ký lại',
      visible: isVisible,
      width: '80%',
      onCancel: () => {
        setIsVisible(false);
        // @ts-ignore
        sigPad.clear();
      },
      footer: (
        <div>
          <Button onClick={() => {setIsVisible(false);}} className="m-r-10">
						Cancel
          </Button>
          <Button onClick={() => {
            // @ts-ignore
            sigPad.clear();
          }} className="m-r-10">
						Clear
          </Button>
          <Button onClick={async () => {
            const file = await FormUtils.submitForm({
              name: `signature-${idNumber}-${new Date().getTime()}`,
              // @ts-ignore
              image: sigPad?.getTrimmedCanvas().toDataURL('image/png'),
            }, {
              nodeName: 'file/upload-base64',
              method: 'post',
              showSuccessMessage: false,
              onGotSuccess: (response)=> {
                const data = userInformation;
                data.identification.signature = response;

                FormUtils.submitForm({}, {
                  endpoint: endpoints.endpointWithApiDomain(`/users/sign-collaborator-contract/${currentUser.id}`),
                  method: 'put',
                  hiddenValues: {
                    hasVerifyOtp: false,
                    steps: STEP.CONTRACT,
                    ...data,
                  },
                  onGotSuccess: async () => {
                    const content = 'Chúc mừng Quý khách đã ký hợp đồng CTV thành công. ' +
											'FINA sẽ gửi Bảo hiểm sức khỏe trị giá 50 triệu và Tài khoản ngân hàng số đẹp đến bạn qua email trong thời gian sớm nhất';
                    const hide = message.success({
                      content:
												<p>{content}</p>,
                      className: 'custom-class',
                      style: {
                        marginTop: '20vh',
                      },
                    });
                    setTimeout(hide, 10000);
                    setReload(!reload);
                    RouteUtils.redirect('/admin/profiles/contract');
                    setLoading(true);
                  },
                });
                // @ts-ignore
                sigPad.clear();
              },
            });
            if (file) {
              setCurrentUser({
                ...currentUser,
                signature: file?.url,
              });
              const identification: any = { ...form?.getFieldsValue(['identification']), signature: file };
              form?.setFieldsValue({ identification });
              setIsVisible(false);
            }
          }} type="primary" className="m-r-10">
						Create
          </Button>
        </div>
      ),
    }}>
      <HForm {...{
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
        onGotSuccess: () => {
          setIsVisible(false);
        },
      }}>
        <div>
          <SignaturePad canvasProps={{ className: 'signature-pad' }} ref={(ref) => {
            sigPad = ref;
          }}/>
        </div>
      </HForm>
    </HModal>
  );
};




