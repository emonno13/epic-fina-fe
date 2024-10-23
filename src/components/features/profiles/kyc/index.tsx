/* eslint-disable @next/next/no-img-element */
import { MioCode } from '@components/features/client/fund-certificate/constants';
import { kycWithMioStep } from '@components/features/client/fund-certificate/detail/constants';
import { useSetMioEkyc } from '@components/features/client/fund-certificate/hooks';
import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import { HSelect } from '@components/shared/common-form-elements/select';
import {
  CMNDSchemaItem,
  InputPhoneNumberSchemaItem,
} from '@components/shared/input-with-rule';
import { PopoverExplain } from '@components/shared/popover-explain';
import { IconUploadImage } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { ImageUtils } from '@lib/utils/image';
import { SEARCH_MODES } from '@schema-form/features/search-form/schema';
import { HForm, HSubForm } from '@schema-form/h-form';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { FormUtils, RelationUtils } from '@schema-form/utils/form-utils';
import { ORGANIZATION_TYPES } from '@types/organization';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Modal,
  notification,
  Row,
  Spin,
} from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { Fragment, memo, ReactNode, useEffect, useState } from 'react';

import './kyc.module.scss';

interface KycProps {
  callbackWhenKycSuccessfully?: (response?: any) => void;
  setCurrentStepKycWithMio?: (value: string) => void;
  handleKycGotError?: Function;
  header?: ReactNode;
  disableField?: boolean;
  mioInfo?: any;
}

export const KYC = memo(
  ({
    callbackWhenKycSuccessfully,
    setCurrentStepKycWithMio = (value: string) => {},
    handleKycGotError,
    header = (
      <div>
        <h2 className="kyc-header">Nhập thông tin eKYC</h2>
        <div className="kyc-desc">
          Để thực hiện tính năng này, quý khách cần xác thực thông tin sau đây
        </div>
      </div>
    ),
    disableField = false,
    mioInfo,
  }: KycProps) => {
    const { t } = useHTranslation('common');
    const [formConfirmUsa] = Form.useForm();
    const [userInformationForm] = Form.useForm();
    const [mioKycInformationForm] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const setMioEkyc = useSetMioEkyc();

    useEffect(() => {
      if (!isEmpty(mioInfo)) {
        userInformationForm?.setFieldsValue({ ...mioInfo });
        mioKycInformationForm?.setFieldsValue({ ...mioInfo });
        formConfirmUsa?.setFieldsValue({ ...mioInfo });
        return;
      }
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
    }, [mioInfo]);

    const handleKycError = ({ error }) => {
      setMioEkyc(error);
      setLoading(false);
      const { name, message, code } = error || {};
      const existsAccountErrorCodes = [
        MioCode.THE_PHONE_NUMBER_IS_EXIST,
        MioCode.THE_EMAIL_IS_EXIT,
        MioCode.THE_IDNO_IS_EXIT,
      ];
      if (existsAccountErrorCodes.includes(code)) {
        if (handleKycGotError) {
          handleKycGotError({ error });
          return;
        }

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
              onClick={() =>
                setCurrentStepKycWithMio(
                  kycWithMioStep.ENTER_INFORMATION_FOR_ASYNC,
                )
              }
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

    const handleSubmitKyc = async () => {
      try {
        const [userInformation, mioKycInformation, confirmUsaData] =
          await Promise.all([
            userInformationForm.validateFields(),
            mioKycInformationForm.validateFields(),
            formConfirmUsa.validateFields(),
          ]);
        setLoading(true);
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
              setMioEkyc(response);
              setLoading(false);
              if (callbackWhenKycSuccessfully) {
                callbackWhenKycSuccessfully(response);
              }
            },
            onGotError: handleKycError,
          },
        );
        setLoading(false);
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

    return (
      <Spin spinning={loading}>
        <div className="kyc-wrapper">
          {header}
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
                disableField,
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
                    disableField,
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
                    disableField,
                  },
                }}
              />
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
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
                    disableField,
                  },
                }}
              />
            </Col>

            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <h3 className="kyc-title">
                {t('Bank information', { vn: 'Thông tin ngân hàng' })}
              </h3>
              <HForm
                {...{
                  form: mioKycInformationForm,
                  hideControlButton: true,
                  schema: BankAccountSchemaDetail,
                  transport: {
                    disableField,
                  },
                }}
              />
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col {...{ xs: 24, sm: 24, md: 24, lg: 24 }}>
              <h3 className="kyc-title">
                {t('Xác nhận Quốc tịch Hoa Kỳ (U.S Citizen)')} &nbsp;
                <PopoverExplain
                  content={
                    'Nhằm mục đích kiểm soát tuân thủ quy định nộp thuế của Hoa Kỳ'
                  }
                />
              </h3>
              <HForm
                {...{
                  form: formConfirmUsa,
                  hideControlButton: true,
                  schema: KycUserConfirmUsa,
                  transport: {
                    disableField,
                    mioInfo,
                  },
                }}
              />
            </Col>
          </Row>

          {!disableField && (
            <Button
              {...{
                onClick: handleSubmitKyc,
                className: 'w-full m-b-20 kyc-accuracy-action',
                type: 'primary',
                size: 'large',
              }}
            >
              {t('Validate now', { vn: 'Xác thực' })}
            </Button>
          )}
        </div>
      </Spin>
    );
  },
);

export const CitizenIdPhoto = (props: HFormProps) => {
  const { t } = useHTranslation('common');

  const disableField = props?.transport?.disableField;

  return createSchemaItem({
    Component: Fragment,
    label: (
      <strong>
        {t('Taken front and back of ID card / citizen identification', {
          vn: 'Chụp mặt trước, mặt sau CMND/CCCD',
        })}
      </strong>
    ),
    className: 'citizen-id-photo group-schema-upload-image',
    colProps: { xs: 24, md: 12 },
    rowProps: { gutter: { xs: 16, md: 24 } },
    componentProps: {
      children: (
        <HSubForm
          {...{
            schema: () => [
              createSchemaItem({
                Component: HUploadImage,
                name: ['identification', 'frontPhoto'],
                colProps: { xs: 12, sm: 12, md: 12 },
                rowProps: { gutter: { xs: 8, md: 8 } },
                rules: [
                  {
                    required: true,
                    message: t('Please select avatar image', {
                      vn: 'Vui lòng chọn ảnh',
                    }),
                  },
                  ImageUtils.validateFileSize(15, t),
                ],
                className: 'schema-item-image',
                componentProps: {
                  placeholder: '--------',
                  style: { width: '100%' },
                  useImageCrop: false,
                  buttonUpload: (
                    <div className={'user-information_form-default-image'}>
                      <IconUploadImage />
                      <div>
                        {t('Take a photo of the front of your ID card', {
                          vn: 'Chụp ảnh mặt trước',
                        })}
                      </div>
                    </div>
                  ),
                  disabled: disableField,
                },
              }),
              createSchemaItem({
                Component: HUploadImage,
                name: ['identification', 'backSidePhoto'],
                colProps: { xs: 12, sm: 12, md: 12 },
                rules: [
                  {
                    required: true,
                    message: t('Please select avatar image', {
                      vn: 'Vui lòng chọn ảnh',
                    }),
                  },
                  ImageUtils.validateFileSize(15, t),
                ],
                className: 'schema-item-image',
                componentProps: {
                  style: { width: '100%' },
                  useImageCrop: false,
                  buttonUpload: (
                    <div className={'user-information_form-default-image'}>
                      <IconUploadImage />
                      <div>
                        {t('Take a photo of the back of your ID card', {
                          vn: 'Chụp ảnh mặt sau',
                        })}
                      </div>
                    </div>
                  ),
                  disabled: disableField,
                },
              }),
            ],
          }}
        />
      ),
    },
  });
};

export const PortraitAndSignature = (props) => {
  const { form, transport } = props;
  const disableField = transport?.disableField;
  const { t } = useHTranslation('common');
  return createSchemaItem({
    Component: HUploadImage,
    name: 'avatar',
    label: <strong>{t('Avatar', { vn: 'Chụp chân dung' })}</strong>,
    rules: [
      {
        required: true,
        message: t('Please select avatar image', { vn: 'Vui lòng chọn ảnh' }),
      },
      ImageUtils.validateFileSize(15, t),
    ],
    colProps: { xs: 24, sm: 24, md: 6 },
    className: 'schema-item-image citizen-id-photo group-schema-upload-image',
    componentProps: {
      onChange: (document) => {
        if (!document) {
          form?.setFieldsValue({ avatar: '' });
          return;
        }
        form?.setFieldsValue({ avatar: document });
      },
      useImageCrop: false,
      buttonUpload: (
        <div className={'user-information_form-default-image'}>
          <IconUploadImage />
          <div>{t('Take a portrait photo', { vn: 'Chụp ảnh chân dung' })}</div>
        </div>
      ),
      disabled: disableField,
    },
  });
};

const KycUserInformationUploadSchemaDetail = (props) => {
  return [CitizenIdPhoto(props), PortraitAndSignature(props)];
};

const KycUserInformationSchemaDetail = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  const { transport } = props;
  const disableField = transport?.disableField;
  return [
    createSchemaItem({
      Component: HInput,
      name: 'fullName',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Full name ', { vn: 'Họ và tên' }),
      rules: [
        {
          required: true,
          message: t('Please enter full name', {
            vn: 'Vui lòng nhập họ và tên',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter full name', { vn: 'Nhập họ và tên' }),
        disabled: disableField,
      },
    }),
    InputPhoneNumberSchemaItem({
      componentProps: {
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['emails', 0, 'email'],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Email'),
      rules: [
        {
          required: true,
          message: t('Please enter email', { vn: 'Vui lòng nhập email' }),
        },
        {
          type: 'email',
          message: t('The input is not valid E-mail!', {
            vn: 'Email không đúng định dạng',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter the email', { vn: 'Nhập email' }),
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'birthday',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Year of birth', { vn: 'Ngày sinh' }),
      rules: [
        {
          validator(rule, value) {
            if (value && value > moment().subtract('1', 'day').endOf('day')) {
              return Promise.reject(
                t('Birthday', { vn: 'Ngày sinh không hợp lệ' }),
              );
            }
            return Promise.resolve();
          },
        },
        { required: true, message: 'Vui lòng chọn ngày sinh' },
      ],
      componentProps: {
        modernLabel: true,
        style: { width: '100%' },
        placeholder: t('Select year of birth', {
          vn: 'Chọn ngày tháng năm sinh',
        }),
        showToday: false,
        format: 'DD/MM/YYYY',
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'gender',
      colProps: { xs: 24, md: 12 },
      label: t('Gender', { vn: 'Giới tính' }),
      rules: [
        {
          required: true,
          message: t('Please select gender', { vn: 'Vui lòng chọn giới tính' }),
        },
      ],
      className: 'user-information_form-content-gender',
      componentProps: {
        modernLabel: true,
        options: [
          { label: t('Male', { vn: 'Nam' }), value: 'male' },
          { label: t('Female', { vn: 'Nữ' }), value: 'female' },
        ],
        placeholder: t('Select gender', { vn: 'Chọn giới tính' }),
        disabled: disableField,
      },
    }),
  ];
};

const KycUserInformationCCCDSchemaDetail = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  const { transport } = props;
  const disableField = transport?.disableField;
  return [
    CMNDSchemaItem({
      componentProps: {
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: ['identification', 'issuedOn'],
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 24 },
      label: t('Ngày cấp'),
      rules: [
        {
          validator(rule, value) {
            if (value && value > moment().subtract('1', 'day').endOf('day')) {
              return Promise.reject(
                t('Supply date', { vn: 'Ngày cấp không hợp lệ' }),
              );
            }
            return Promise.resolve();
          },
        },
        {
          required: true,
          message: t('Please enter issued on', {
            vn: 'Vui lòng nhập ngày cấp',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        style: { width: '100%' },
        placeholder: t('Supply date', { vn: 'Vui lòng nhập ngày cấp' }),
        showToday: false,
        format: 'DD/MM/YYYY',
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['identification', 'placeOfIssue'],
      colProps: { span: 24 },
      label: t('Place of issue', { vn: 'Nơi cấp' }),
      rules: [
        {
          required: true,
          message: t('Please enter place of issue', {
            vn: 'Vui lòng nhập nơi cấp',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter place Of Issue', { vn: 'Nhập nơi cấp' }),
        disabled: disableField,
      },
    }),
  ];
};

const KycUserInformationAddressSchemaDetail = (props) => {
  const { form, transport } = props;
  const disableField = transport?.disableField;
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      name: 'stateId',
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t(
        'Select Provinces/Cities directly under the Central Government',
        { vn: 'Chọn Tỉnh / TP trực thuộc TW' },
      ),
      rules: [
        {
          required: true,
          message: t('Please select province/city', {
            vn: 'Vui lòng chọn tỉnh/thành phố',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t(
          'Select Provinces/Cities directly under the Central Government',
          { vn: 'Chọn Tỉnh / TP trực thuộc TW' },
        ),
        hiddenValues: {
          type: 'state',
          'info.countryCode': 'VN',
        },
        showSearch: true,
        allowClear: true,
        endpoint: 'locations/public/suggestion',
        searchWhenHidenValueChange: true,
        searchWhenValueChange: true,
        optionsConverter: (document) => {
          document.label = `${document?.description}`;
          return document;
        },
        onChange: () => {
          form?.setFieldsValue({
            districtId: undefined,
            subDistrictId: undefined,
          });
        },
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: ({ value: stateId }) => (
        <HSubForm
          schema={() => [
            createSchemaItem({
              Component: HSelect,
              name: 'districtId',
              label: t('Select district/district', { vn: 'Chọn quận / huyện' }),
              rules: [
                {
                  required: true,
                  message: t('Please select a county/district', {
                    vn: 'Vui lòng chọn quận/huyện',
                  }),
                },
              ],
              colProps: { xs: 24, sm: 24, md: 24 },
              componentProps: {
                modernLabel: true,
                placeholder: t('Select district/district', {
                  vn: 'Chọn quận / huyện',
                }),
                hiddenValues: {
                  type: 'town_district',
                  parentId: stateId,
                },
                showSearch: true,
                allowClear: true,
                endpoint: 'locations/public/suggestion',
                searchWhenHidenValueChange: true,
                searchWhenValueChange: true,
                optionsConverter: (document) => {
                  document.label = `${document?.description}`;
                  return document;
                },
                onChange: () =>
                  form?.setFieldsValue({ subDistrictId: undefined }),
                disabled: disableField,
              },
            }),
            createSchemaItem({
              className: 'm-b-0',
              Component: ({ value: districtId }) => (
                <HSubForm
                  schema={() => [
                    createSchemaItem({
                      Component: HSelect,
                      name: 'subDistrictId',
                      rules: [
                        {
                          required: true,
                          message: t('Please select ward/commune', {
                            vn: 'Vui lòng chọn phường/xã',
                          }),
                        },
                      ],
                      label: t('Select ward / commune', {
                        vn: 'Chọn phường / xã',
                      }),
                      className: 'm-b-0',
                      componentProps: {
                        modernLabel: true,
                        placeholder: t('Select ward / commune', {
                          vn: 'Chọn phường / xã',
                        }),
                        hiddenValues: {
                          type: 'sub_district',
                          parentId: districtId,
                        },
                        optionsConverter: (document) => {
                          document.label = `${document?.description}`;
                          return document;
                        },
                        showSearch: true,
                        allowClear: true,
                        endpoint: 'locations/public/suggestion',
                        searchWhenHidenValueChange: true,
                        disabled: disableField,
                        searchWhenValueChange: true,
                      },
                    }),
                  ]}
                />
              ),
              name: 'districtId',
              colProps: { xs: 24, sm: 24, md: 24 },
              rules: [
                {
                  required: true,
                  message: t('Please select ward / commune', {
                    vn: 'Vui lòng chọn phường/xã',
                  }),
                },
              ],
            }),
          ]}
        />
      ),
      name: 'stateId',
      colProps: { xs: 24, sm: 24, md: 24 },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'address',
      colProps: { xs: 24, md: 24 },
      rules: [
        {
          required: true,
          message: t('Please enter specific address', {
            vn: 'Vui lòng nhập địa chỉ cụ thể',
          }),
        },
      ],
      label: t('Specific address', { vn: 'Địa chỉ cụ thể' }),
      componentProps: {
        modernLabel: true,
        placeholder: t('Please enter specific address', {
          vn: 'Vui lòng nhập địa chỉ cụ thể',
        }),
        disabled: disableField,
      },
    }),
  ];
};

const BankAccountSchemaDetail = (props: HFormProps) => {
  const { transport } = props;
  const disableField = transport?.disableField;
  const currentUser = useCurrentUser();
  const { t } = useHTranslation('common');
  return [
    createSchemaItem({
      Component: HSelect,
      name: ['banks', 0, 'bankId'],
      label: t('Bank', { vn: 'Ngân hàng' }),
      rules: [
        {
          required: true,
          message: t('Please select bank', { vn: 'Vui lòng chọn ngân hàng' }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Select bank', { vn: 'Chọn ngân hàng' }),
        mode: 'single',
        endpoint: 'organizations/public/suggestion',
        hiddenValues: {
          type: ORGANIZATION_TYPES.BANK,
          searchingRule: SEARCH_MODES.MULTIPLE,
          parentOrgId: currentUser?.rootOrgId,
        },
        optionsConverter: (document) => {
          document.label = `${document?.name || ''}`;
          return document;
        },
        showSearch: true,
        allowClear: true,
        optionFilterProp: 'children',
        disabled: disableField,
        searchWhenHidenValueChange: true,
        searchWhenValueChange: true,
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['banks', 0, 'bankAccountHolder'],
      label: t('Bank account holder name', { vn: 'Tên chủ tài khoản' }),
      rules: [
        {
          required: true,
          message: t('Please enter bank account holder name', {
            vn: 'Vui lòng nhập tên chủ tài khoản',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter bank account holder name', {
          vn: 'Nhập tên chủ tài khoản',
        }),
        valueConverter: (value) => value.toUpperCase(),
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['banks', 0, 'bankAccount'],
      label: 'STK',
      rules: [
        {
          required: true,
          message: t('Please enter bank account number', {
            vn: 'Vui lòng nhập STK',
          }),
        },
        {
          pattern: /^[0-9]*$/,
          message: t('Bank account number is not valid', {
            vn: 'Không đúng định dạng STK',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter bank account number', { vn: 'Nhập STK' }),
        disabled: disableField,
      },
    }),
  ];
};

const KycUserConfirmUsa = (props: HFormProps) => {
  const { transport } = props;
  const { disableField, mioInfo } = transport;
  const { t } = useHTranslation('common');
  const [fatca1, setFatca1] = useState<string>();
  const [fatca2, setFatca2] = useState<string>();
  const [fatca3, setFatca3] = useState<string>();

  useEffect(() => {
    if (isEmpty(mioInfo)) return;
    const fatca = mioInfo?.fatca;
    setFatca1(fatca?.fatca1);
    setFatca2(fatca?.fatca2);
    setFatca3(fatca?.fatca3);
  }),
    [mioInfo];

  const options = [
    { label: t('Yes', { vn: 'Có' }), value: 'true' },
    { label: t('No', { vn: 'Không' }), value: 'false' },
  ];

  const handleChange = (checkedValue, setState) => {
    setState && setState(checkedValue[0]);
  };

  return [
    createSchemaItem({
      Component: Checkbox.Group,
      name: ['fatca', 'fatca1'],
      valuePropName: 'checked',
      label:
        '1. Anh (chị) có phải là thường trú tại Hoa Kỳ không? ( Are you a U.S Resident?)',
      className: 'fatca-item m-b-0i',
      componentProps: {
        options,
        onChange: (checkedValue) => handleChange(checkedValue, setFatca1),
        value: fatca1,
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: Checkbox.Group,
      name: ['fatca', 'fatca2'],
      valuePropName: 'checked',
      label:
        '2. Anh (chị) có phải là công dân Hoa Kỳ không? ( Are you a U.S Citizen?)',
      className: 'fatca-item m-b-0i',
      componentProps: {
        options,
        onChange: (checkedValue) => handleChange(checkedValue, setFatca2),
        value: fatca2,
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: Checkbox.Group,
      name: ['fatca', 'fatca3'],
      valuePropName: 'checked',
      label: (
        <span>
          3. Anh (chị) có đang sở hữu Thẻ Thường Trú Hoa Kỳ (Thẻ xanh) không?
          <br />( Are you holidng a U.S Permanent Resident Card (Green card) ?)
        </span>
      ),
      className: 'fatca-item m-b-0i',
      componentProps: {
        options,
        onChange: (checkedValue) => handleChange(checkedValue, setFatca3),
        value: fatca3,
        disabled: disableField,
      },
    }),
  ];
};
