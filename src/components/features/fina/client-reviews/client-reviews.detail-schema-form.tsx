import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { Input, Rate } from 'antd';

export const ClientReviewDetailSchema = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      label: t('Title', { en: 'Title', vn: 'Tiêu đề' }),
      name: 'title',
    }),
    createSchemaItem({
      Component: Input,
      label: t('Content', { en: 'Content', vn: 'Nội dung' }),
      name: 'content',
    }),
    createSchemaItem({
      Component: Rate,
      label: t('Rate', { en: 'Rate', vn: 'Đánh giá' }),
      name: 'rate',
    }),
    createSchemaItem({
      Component: Input,
      label: t('Reviewer name', {
        en: 'Reviewer name',
        vn: 'Tên người đánh giá',
      }),
      name: 'reviewerName',
    }),
    createSchemaItem({
      Component: HUploadImage,
      name: 'avatarSrc',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Avatar'),
    }),
    createSchemaItem({
      Component: Input,
      label: t('Reviewer address', {
        en: 'Reviewer address',
        vn: 'Địa chỉ người đánh giá',
      }),
      name: 'reviewerAddress',
    }),
    createSchemaItem({
      Component: HDatePicker,
      label: t('Review date', { en: 'Review date', vn: 'Ngày đánh giá' }),
      name: 'reviewDate',
      componentProps: {
        format: 'DD/MM/YYYY',
      },
    }),
  ];
};
