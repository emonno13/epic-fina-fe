import { EditOutlined } from '@ant-design/icons/lib/icons';
import { ConverterUtils } from '@lib/converter';
import { Button, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SignaturePad from 'react-signature-canvas';
import { useHTranslation } from '../../../../../lib/i18n';
import { useAuth, useCurrentUser } from '../../../../../lib/providers/auth';
import { HSubForm } from '../../../../../schema-form/h-form';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { FormUtils } from '../../../../../schema-form/utils/form-utils';
import { requestInformationUser } from '../../../../../store/actions';
import { HDatePicker } from '../../../../shared/common-form-elements/date-picker';
import { HUploadImage } from '../../../../shared/common-form-elements/h-upload';
import { HModal } from '../../../../shared/common/h-modal';
import { ViewCollaboratorContract } from '../../collaborator-contract';
import {
  ContractSchemaForm,
  UploadCardSchemaForm,
} from './detail-card-schema-form';

export const ViewCardManager = ({ props, form, initialValues }) => {
  const { transport } = props;
  const { currentStep } = transport;
  const { t } = useHTranslation('admin-common');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const [userInformation, setUserInformation] = useState<any>({
    fullName: form?.getFieldsValue(['fullName'])?.fullName,
    idNumber: form?.getFieldsValue(['idNumber'])?.idNumber,
    issuedOn: ConverterUtils.dateConverterToString(
      form?.getFieldsValue(['identification'])?.identification?.issuedOn,
    ),
    placeOfIssue: form?.getFieldsValue(['identification'])?.identification
      ?.placeOfIssue,
    address: `${initialValues?.address}, ${initialValues?.subDistrictName}, ${initialValues?.districtName}, ${initialValues?.stateName}`,
    email: initialValues?.emails?.[0]?.email,
    tel: initialValues?.tels?.[0]?.tel,
    bankAccount: initialValues?.banks?.[0]?.bankAccount,
    bankName: initialValues?.banks?.[0]?.name,
  });
  useEffect(() => {
    dispatch(
      requestInformationUser({
        userId: currentUser.id,
        callback: (response) => {
          setUserInformation({
            ...userInformation,
            address: `${response?.address} ,${response?.subDistrictName}, ${response?.districtName} , ${response?.stateName}`,
            email: response?.emails?.[0]?.email,
            tel: response?.tels?.[0]?.tel,
            bankAccount: response?.banks?.[0]?.bankAccount,
            bankName: response?.banks?.[0]?.name,
          });
        },
      }),
    );
  }, []);
  return (
    <div>
      {currentStep >= 1 && (
        <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
          <p>{t('Hình 2 mặt CMND/CCCD')}</p>
          <div className={'form-person__upload'}>
            <HSubForm
              schema={() => [
                createSchemaItem({
                  Component: HUploadImage,
                  name: ['identification', 'frontPhoto'],
                  componentProps: {
                    placeholder: '--------',
                    useImageCrop: false,
                    buttonUpload: (
                      <div className={'form-person__default-image'}>
                        <img
                          src={'/assets/images/cccc_front.jpg'}
                          alt={'fina'}
                        />
                        Mặt trước
                      </div>
                    ),
                  },
                  rules: [
                    {
                      required: true,
                      message: t('Số CMND/CCCD cần được nhập'),
                    },
                  ],
                }),
              ]}
            />
            <HSubForm
              schema={() => [
                createSchemaItem({
                  Component: HUploadImage,
                  name: ['identification', 'backSidePhoto'],
                  componentProps: {
                    useImageCrop: false,
                    name: ['identification', 'backSidePhoto'],
                    buttonUpload: (
                      <div className={'form-person__default-image'}>
                        <img
                          src={'/assets/images/cccc_back.jpg'}
                          alt={'fina'}
                        />
                        Mặt sau
                      </div>
                    ),
                  },
                  rules: [
                    {
                      required: true,
                      message: t('Số CMND/CCCD cần được nhập'),
                    },
                  ],
                }),
              ]}
            />
          </div>
          <div className={'form-person__preview'}>
            <h4>Thông tin tương ứng từ hình ảnh</h4>
            {loading && (
              <div className="example" style={{ textAlign: 'center' }}>
                <Spin />
              </div>
            )}
            <div className={'form-person__information'}>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>Họ tên (*)</span>
                <span className={'information-item__value'}>
                  <HSubForm
                    schema={() => [
                      createSchemaItem({
                        Component: Input,
                        name: ['fullName'],
                        className: 'capitalize',
                        componentProps: {
                          placeholder: '-----',
                        },
                        rules: [
                          {
                            required: true,
                            message: t('Họ và tên cần phải được nhập'),
                          },
                        ],
                      }),
                    ]}
                  />
                </span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>
                  Số CMND/CCCD(*)
                </span>
                <span className={'information-item__value'}>
                  <HSubForm
                    schema={() => [
                      createSchemaItem({
                        Component: Input,
                        name: 'idNumber',
                        componentProps: {
                          placeholder: '--------',
                        },
                        rules: [
                          {
                            required: true,
                            message: t('Số CMND/CCCD cần được nhập'),
                          },
                        ],
                      }),
                    ]}
                  />
                </span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>Ngày cấp(*)</span>
                <span className={'information-item__value'}>
                  <HSubForm
                    schema={() => [
                      createSchemaItem({
                        Component: HDatePicker,
                        name: ['identification', 'issuedOn'],
                        componentProps: {
                          placeholder: '-----',
                          format: 'DD/MM/YYYY',
                        },
                        rules: [
                          {
                            required: true,
                            message: t('Ngày cấp cần được nhập'),
                          },
                        ],
                      }),
                    ]}
                  />
                </span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>Nơi cấp(*)</span>
                <span className={'information-item__value'}>
                  <HSubForm
                    schema={() => [
                      createSchemaItem({
                        Component: Input,
                        name: ['identification', 'placeOfIssue'],
                        componentProps: {
                          placeholder: '--------',
                        },
                        rules: [
                          {
                            required: true,
                            message: t('Nơi cấp cần được nhập'),
                          },
                        ],
                      }),
                    ]}
                  />
                </span>
              </div>
            </div>
          </div>
          <HSubForm
            {...{
              schema: () => UploadCardSchemaForm(props),
            }}
          />
          <div className={'note'}>
            <b>Lưu ý</b>: Thông tin không chính xác có thể ảnh hướng đến các
            quyền lợi về khấu trừ thuế và chi trả hoa hồng trên FINA
          </div>
        </div>
      )}
      {currentStep >= 2 && (
        <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
          <ViewCollaboratorContract {...{ userInformation: userInformation }} />
          <HSubForm
            {...{
              schema: () => ContractSchemaForm(props),
            }}
          />
          <Signature
            {...{ userInformation: userInformation, setUserInformation, form }}
          />
        </div>
      )}
    </div>
  );
};

export const Signature = ({ userInformation, setUserInformation, form }) => {
  const { idNumber } = userInformation;
  const { t } = useHTranslation('admin-common');
  const [visible, setVisible] = useState(false);
  const currentUser = useCurrentUser();
  const { setCurrentUser } = useAuth();
  let sigPad = {};
  return (
    <>
      <Button
        className={'m-b-10'}
        style={{ width: '100%' }}
        type="primary"
        icon={<EditOutlined />}
        onClick={async () => {
          setVisible(true);
        }}
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
          <div>
            <Button
              onClick={() => {
                setVisible(false);
              }}
              className="m-r-10"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // @ts-ignore
                sigPad.clear();
              }}
              className="m-r-10"
            >
              Clear
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
                  setVisible(false);
                }
              }}
              type="primary"
              className="m-r-10"
            >
              Create
            </Button>
          </div>
        }
      >
        <div>
          <SignaturePad
            canvasProps={{ className: 'signature-pad' }}
            ref={(ref) => {
              sigPad = ref;
            }}
          />
        </div>
      </HModal>
    </>
  );
};
