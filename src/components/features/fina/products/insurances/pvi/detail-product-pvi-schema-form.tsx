import { AlignLeftOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Checkbox, Col, Input, Radio, Row } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ConverterUtils } from '../../../../../../lib/converter';
import { useCurrentUser } from '../../../../../../lib/providers/auth';
import { HDatePicker } from '../../../../../shared/common-form-elements/date-picker';
import { HSelect } from '../../../../../shared/common-form-elements/select';
import { FiledViewer } from '../../../../../shared/common/configuration/field-viewer';
import { LabelItem } from '../../../../../shared/common/h-label/h-label-title';
import {
  getInsurancePackageOptions,
  QUESTION_PVI,
  QUESTION_PVI_KEY,
  VIEW_CONFIRM_COL_LAYOUT,
} from '../constant';

export const SurveyQuestionSchemaForm = (
  props: HFormProps,
  setWarning,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { form } = props;
  const onChangeCheckBoxQuestion = () => {
    const metaData = form?.getFieldValue('metaData');
    if (Object.values(metaData).includes(true)) {
      return setWarning(true);
    }
    return setWarning(false);
  };
  return [
    createSchemaItem({
      Component: Radio.Group,
      name: ['metaData', QUESTION_PVI_KEY.PVI_ATCD_ONE],
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 24, md: 16 } },
      label: QUESTION_PVI[QUESTION_PVI_KEY.PVI_ATCD_ONE],
      rules: [
        {
          required: true,
        },
      ],
      initialValue: false,
      componentProps: {
        onChange: onChangeCheckBoxQuestion,
        options: [
          { label: t('No'), value: false },
          { label: t('Yes'), value: true },
        ],
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: ['metaData', QUESTION_PVI_KEY.PVI_ATCD_TWO],
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 24, md: 16 } },
      label: QUESTION_PVI[QUESTION_PVI_KEY.PVI_ATCD_TWO],
      initialValue: false,
      rules: [
        {
          required: true,
        },
      ],
      componentProps: {
        onChange: onChangeCheckBoxQuestion,
        options: [
          { label: t('No'), value: false },
          { label: t('Yes'), value: true },
        ],
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: ['metaData', QUESTION_PVI_KEY.PVI_ATCD_THREE],
      colProps: { span: 24 },
      initialValue: false,
      rowProps: { gutter: { xs: 24, md: 16 } },
      label: QUESTION_PVI[QUESTION_PVI_KEY.PVI_ATCD_THREE],
      rules: [
        {
          required: true,
          message: 'Question is required',
        },
      ],
      componentProps: {
        onChange: onChangeCheckBoxQuestion,
        options: [
          { label: t('No'), value: false },
          { label: t('Yes'), value: true },
        ],
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: ['metaData', QUESTION_PVI_KEY.PVI_ATCD_FOUR],
      colProps: { span: 24 },
      initialValue: false,
      rowProps: { gutter: { xs: 24, md: 16 } },
      label: QUESTION_PVI[QUESTION_PVI_KEY.PVI_ATCD_FOUR],
      rules: [
        {
          required: true,
          message: 'Question is required',
        },
      ],
      componentProps: {
        onChange: onChangeCheckBoxQuestion,
        options: [
          { label: t('No'), value: false },
          { label: t('Yes'), value: true },
        ],
      },
    }),
  ];
};

export const ProductPviSchemaFormShort1 = (
  props: HFormProps,
): HFormItemProps[] => {
  return [
    ...UserInformationSchemaForm(props),
    ...MetaDataSchemaForm(props),
    ...StaffInformationSchemaForm(props),
  ];
};

export const UserInformationSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const disabledDate = (current) => {
    // Can not select days before today and today
    return (
      current < moment().subtract('60', 'year').endOf('day') ||
      current > moment().subtract('1', 'year').endOf('day')
    );
  };
  return [
    ...CustomerInformationSchemaForm(props),
    createSchemaItem({
      Component: HDatePicker,
      name: ['customerInfo', 'yearOfBirth'],
      label: t('Birthday', {
        vn: 'Ngày sinh (Độ tuổi phải nằm trong khoảng từ 1 -> 60 tuổi)',
      }),
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 12 },
      rules: [
        {
          required: true,
          message: 'Yêu cầu xác nhân thông tin',
        },
        {
          validator(rule, value) {
            if (
              value &&
              (value < moment().subtract('60', 'year').endOf('day') ||
                value > moment().subtract('1', 'year').endOf('day'))
            ) {
              return Promise.reject(
                t('Birthday', {
                  vn: 'Ngày sinh (Độ tuổi phải nằm trong khoảng từ 1 -> 60 tuổi)',
                }),
              );
            }
            return Promise.resolve();
          },
        },
      ],
      componentProps: {
        style: { width: '100%' },
        showToday: false,
        format: 'DD/MM/YYYY',
        placeholder: t('Birthday', {
          vn: 'Ngày sinh (Độ tuổi phải nằm trong khoảng từ 1 -> 60 tuổi)',
        }),
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: ['customerInfo', 'gender'],
      colProps: { span: 8 },
      rules: [
        {
          required: true,
          message: t('Gender is required'),
        },
      ],
      label: t('Gender'),
      componentProps: {
        options: [
          { label: t('Male'), value: 'male' },
          { label: t('Female'), value: 'female' },
          { label: t('Other'), value: 'other' },
        ],
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'idNumber'],
      colProps: { xs: 24, sm: 24, md: 24 },
      rules: [
        {
          required: true,
          message: t('CMNN/CCCD is required', { vn: 'CMNN/CCCD là bắt buộc' }),
        },
      ],
      label: t(
        'Số CMNN/CCCD/Passport (Trẻ em có hộ chiếu kèm theo Bố/mẹ thì điền thông số hộ chiếu Bố/mẹ)',
      ),
      componentProps: {
        placeholder: t(
          'Số CMNN/CCCC/Passport (Trẻ em có hộ chiếu kèm theo Bố/mẹ thì điền thông số hộ chiếu Bố/mẹ)',
        ),
      },
    }),
  ];
};

export const StaffInformationSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const currentUser = useCurrentUser();
  const isLogin = !!(currentUser && currentUser.id);
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: ['staffInfo', 'fullName'],
      colProps: { xs: 24, sm: 24, md: 6 },
      label: t('Họ và tên người mua bảo hiểm '),
      rules: [
        {
          required: true,
          message: t('Full name is required', { vn: 'Họ và tên bắt buộc' }),
        },
      ],
      componentProps: {
        disabled: isLogin,
        placeholder: t('Người mua bảo hiểm'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['staffInfo', 'email'],
      colProps: { xs: 24, sm: 24, md: 6 },
      label: t('Email'),
      rules: [
        {
          type: 'email',
          required: true,
          message: t('Email is required'),
        },
      ],
      componentProps: {
        disabled: isLogin && currentUser?.emails?.length,
        placeholder: t('Email'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['staffInfo', 'tel'],
      colProps: { xs: 24, sm: 24, md: 6 },
      label: t('Tel'),
      rules: [
        {
          required: true,
          message: t('Tel is required'),
        },
      ],
      componentProps: {
        disabled: isLogin && currentUser?.tels?.length,
        placeholder: t('Tel'),
      },
    }),
  ];
};

export const CustomerInformationSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { form } = props;
  const currentUser = useCurrentUser();
  const [mySelf, setMySelf] = useState(false);
  useEffect(() => {
    if (mySelf) {
      form?.setFieldsValue({ customerInfo: form?.getFieldValue('staffInfo') });
    }
  }, [mySelf]);
  return [
    createSchemaItem({
      Component: Checkbox,
      name: 'mySelf',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 16 } },
      className: 'm-b-0',
      label: ' ',
      valuePropName: 'checked',
      hidden: !currentUser || !currentUser.id,
      componentProps: {
        onChange: (document) => {
          if (document?.target?.checked) {
            return setMySelf(true);
          }
          setMySelf(false);
        },
        children: 'Mua cho bản thân',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'fullName'],
      colProps: { xs: 24, sm: 24, md: 6 },
      rowProps: { gutter: { xs: 24, md: 16 } },
      label: t('Họ và tên người được bảo hiểm '),
      rules: [
        {
          required: true,
          message: t('Full name is required', { vn: 'Họ và tên bắt buộc' }),
        },
      ],
      componentProps: {
        disabled: !!mySelf,
        placeholder: t('Người mua bảo hiểm'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'email'],
      colProps: { xs: 24, sm: 24, md: 6 },
      label: t('Email'),
      rules: [
        {
          type: 'email',
          required: true,
          message: t('Email is required'),
        },
      ],
      componentProps: {
        disabled: !!mySelf,
        placeholder: t('Email'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'tel'],
      colProps: { xs: 24, sm: 24, md: 6 },
      label: t('Tel'),
      rules: [
        {
          required: true,
          message: t('Tel is required'),
        },
      ],
      componentProps: {
        disabled: !!mySelf,
        placeholder: t('Tel'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'address'],
      colProps: { xs: 24, sm: 24, md: 6 },
      label: t('Address'),
      rules: [
        {
          required: true,
          message: t('Address is required'),
        },
      ],
      componentProps: {
        placeholder: t('Address'),
      },
    }),
  ];
};

export const MetaDataSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { form } = props;
  const disabledDate = (current) => {
    return current && current < moment().add(1, 'day').endOf('day');
  };
  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Chọn gói bảo hiểm'),
      colProps: { xs: 24, sm: 24, md: 8 },
      name: ['metaData', 'package'],
      rules: [
        {
          required: true,
          message: t('Bắt buộc chọn gói bảo hiểm'),
        },
      ],
      componentProps: {
        placeholder: t('Chọn gói bảo hiểm '),
        options: getInsurancePackageOptions(t),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: ['metaData', 'effectiveTime'],
      label: t('Effective Time'),
      colProps: { span: 8 },
      initialValue: moment().add(1, 'day'),
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        disabledDate,
        defaultValue: moment().add(1, 'day'),
        placeholder: t('Approval Date'),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      colProps: { xs: 24, sm: 24, md: 8 },
      name: ['metaData', 'expirationTime'],
      initialValue: moment(form?.getFieldsValue(['effectiveTime'])).add(1, 'y'),
      hidden: true,
    }),
  ];
};

export const ProductPviSchemaFormShort2 = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Checkbox,
      label: '',
      name: 'agreement',
      rules: [
        {
          required: true,
          message: t('Bạn cần xác nhận đã đồng ý mọi điều khoản'),
          type: 'boolean',
        },
        ({ getFieldValue }) => ({
          validator(rule, value: boolean) {
            if (value) {
              return Promise.resolve();
            }
            return Promise.reject(
              t('Bạn cần xác nhận đã đồng ý mọi điều khoản'),
            );
          },
        }),
      ],
      colProps: { span: 24 },
      valuePropName: 'checked',
      componentProps: {
        children:
          'Tôi đã đọc kỹ và chấp nhận tất cả các điều khoản trong Quy tắc Bảo hiểm Con người kết hợp của Bảo hiểm PVI. ' +
          'Tôi cam đoan tất cả các thông tin khai báo ở trên là đúng sự thật và hiểu rằng bất kỳ thông tin nào khai báo không đúng sự thật có thể sẽ dẫn đến việc Giấy chứng nhận bảo hiểm/ Hợp đồng bảo hiểm mất hiệu lực và/ hoặc Bảo hiểm PVI có quyền từ chối một phần hoặc toàn bộ trách nhiệm bồi thường. ' +
          'Tôi đồng ý sẽ thông báo cho Bảo hiểm PVI về bất kỳ sự thay đổi thông tin nào (nếu có). ' +
          'Tôi đồng ý để cho bác sĩ, bệnh viện hoặc cơ sở y tế đã điều trị hoặc tư vấn sức khỏe cho tôi được cung cấp cho Bảo hiểm PVI mọi thông tin liên quan đến sức khỏe của tôi nếu có sự nghi vấn, nhằm đáp ứng các yêu cầu về giải quyết quyền lợi bảo hiểm. ' +
          'Tôi cam kết các thông tin trên là đúng sự thật Bảo hiểm PVI sẽ gửi Phiếu đánh giá của khách hàng kèm theo Giấy chứng nhận điện tử.',
      },
    }),
  ];
};

export const ViewConfirm = (HFormProps: any) => {
  const { t } = useHTranslation('admin-common');
  const { form } = HFormProps;
  const { staffInfo, metaData, customerInfo } = form?.getFieldsValue();
  return (
    <Row gutter={[16, 16]}>
      <Col {...VIEW_CONFIRM_COL_LAYOUT}>
        <LabelItem
          label={t('Information of the insured person')}
          firstIcon={<AlignLeftOutlined />}
          titleTooltip={t('Information of the insured person')}
        />
        <FiledViewer
          {...{
            className: 'm-t-20',
            label: t('Full name'),
            value: `${customerInfo?.fullName}`,
          }}
        />
        <FiledViewer
          {...{
            label: t('Address'),
            value: customerInfo?.address,
          }}
        />
        <FiledViewer
          {...{
            label: t('Tel'),
            value: customerInfo?.tel,
          }}
        />
        <FiledViewer
          {...{
            label: t('Email'),
            value: customerInfo?.email,
          }}
        />
        <FiledViewer
          {...{
            label: t('CMND/CCCC/PP'),
            value: customerInfo?.idNumber,
          }}
        />
        <FiledViewer
          {...{
            label: t('Insurance package'),
            value: metaData?.package,
          }}
        />
        <FiledViewer
          {...{
            label: t('Effective Time'),
            value: ConverterUtils.fullDatetimeConverter(
              `${metaData?.effectiveTime}`,
            ),
          }}
        />
        <FiledViewer
          {...{
            label: t('Expiration Time'),
            value: ConverterUtils.fullDatetimeConverter(
              `${moment(metaData?.effectiveTime).add(1, 'y')}`,
            ),
          }}
        />
      </Col>
      <Col {...VIEW_CONFIRM_COL_LAYOUT}>
        <LabelItem
          label={t('Buyer Information')}
          firstIcon={<AlignLeftOutlined />}
          titleTooltip={t('Buyer Information')}
        />
        <FiledViewer
          {...{
            className: 'm-t-20',
            label: t('Full name'),
            value: `${staffInfo?.fullName}`,
          }}
        />
        <FiledViewer
          {...{
            label: t('Tel'),
            value: staffInfo?.tel,
          }}
        />
        <FiledViewer
          {...{
            label: t('Email'),
            value: staffInfo?.email,
          }}
        />
        <FiledViewer
          {...{
            label: t('Address'),
            value: staffInfo?.address,
          }}
        />
      </Col>
    </Row>
  );
};
