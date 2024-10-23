import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import moment from 'moment';

export const AccountIdentifierSchema = () => {
  const { t } = useHTranslation('common');

  const disabledDate = (current) => {
    return current > moment().subtract('1', 'day').endOf('day');
  };

  return [
    createSchemaItem({
      Component: HInput,
      name: 'idNumber',
      colProps: { xs: 24, sm: 24, md: 8, lg: 8 },
      rowProps: { gutter: [16, 6] },
      label: t('ID Number', { vn: 'Số CMND/CCCD' }),
      rules: [
        {
          required: true,
          message: t('Id Number is required', {
            vn: 'Số CMND/CCCD là bắt buộc',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter ID Number', { vn: 'Nhập CMND/CCCD' }),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: ['identification', 'issuedOn'],
      colProps: { xs: 24, sm: 24, md: 8, lg: 8 },
      label: t('Supply date', { vn: 'Ngày cấp' }),
      rules: [
        {
          required: true,
          message: t('Supply date is required', { vn: 'Ngày cấp là bắt buộc' }),
        },
      ],
      componentProps: {
        modernLabel: true,
        disabledDate: disabledDate,
        placeholder: t('Supply date', { vn: 'Nhập ngày cấp' }),
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['identification', 'placeOfIssue'],
      colProps: { xs: 24, sm: 24, md: 8, lg: 8 },
      label: t('placeOfIssue', { vn: 'Nơi cấp' }),
      rules: [
        {
          required: true,
          message: t('Place of issue is required', {
            vn: 'Nơi cấp là bắt buộc',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter place Of Issue', { vn: 'Nhập nơi cấp' }),
      },
    }),
    createSchemaLabelItem({
      colProps: { span: 24 },
      componentProps: {
        label: t('profile.captureFrontAndBack'),
        className: 'profile-title-primary',
        uppercaseLabel: false,
      },
    }),
    createSchemaItem({
      Component: CustomComponentHUploadImage,
      name: ['identification', 'frontPhoto'],
      colProps: { xs: 12, sm: 8, md: 8 },
      rules: [
        {
          required: true,
          message: t('Front photo is required', {
            vn: 'Ảnh mặt trước là bắt buộc',
          }),
        },
      ],
      componentProps: {
        useImageCrop: false,
        label: t('Front photo', { vn: 'Ảnh mặt trước' }),
        buttonUpload: (
          <div className="profile-info-edit-btn-upload">
            <img src={'/assets/images/cccd-front.svg'} alt={'fina'} />
          </div>
        ),
      },
    }),
    createSchemaItem({
      Component: CustomComponentHUploadImage,
      name: ['identification', 'backSidePhoto'],
      colProps: { xs: 12, sm: 8, md: 8 },
      rules: [
        {
          required: true,
          message: t('Backside photo is required', {
            vn: 'Ảnh mặt sau là bắt buộc',
          }),
        },
      ],
      componentProps: {
        useImageCrop: false,
        label: t('Backside photo', { vn: 'Ảnh mặt sau' }),
        buttonUpload: (
          <div className="profile-info-edit-btn-upload">
            <img src={'/assets/images/cccd-back.svg'} alt={'fina'} />
          </div>
        ),
      },
    }),
    createSchemaItem({
      Component: CustomComponentHUploadImage,
      name: ['identification', 'portrait'],
      colProps: { xs: 12, sm: 8, md: 8 },
      rules: [
        {
          required: true,
          message: t('Portrait is required', {
            vn: 'Ảnh chân dung là bắt buộc',
          }),
        },
      ],
      componentProps: {
        useImageCrop: false,
        label: t('Portrait', { vn: 'Ảnh chân dung' }),
        buttonUpload: (
          <div className="profile-info-edit-btn-upload">
            <img src={'/assets/images/portrait.svg'} alt={'fina'} />
          </div>
        ),
      },
    }),
  ];
};

const CustomComponentHUploadImage = (props) => {
  return (
    <div className="profile-info-edit-upload">
      <p>
        <span style={{ color: '#F5222D' }}>*</span> {props.label}
      </p>
      <HUploadImage {...props} />
    </div>
  );
};
