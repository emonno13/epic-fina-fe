import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import HTinyEditor from '@components/shared/common-form-elements/h-tiny-editor';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import { Input } from 'antd';

export const InsurancesContentDetailSchemaForm = () => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('HIGHLIGHTS', { vn: 'ĐIỂM NỔI BẬT' }),
        titleTooltip: t('HIGHLIGHTS', { vn: 'ĐIỂM NỔI BẬT' }),
      },
    }),
    createHDynamicSchemaFormItems({
      name: 'highlights',
      componentProps: {
        colMinus: 2,
        schemaItems: () => [
          createSchemaItem({
            Component: HTinyEditor,
            name: 'highlightItem',
            colProps: { xs: 24, sm: 24, md: 19 },
            componentProps: {
              placeholder: t('Content', { vn: 'Nội dung' }),
              height: 200,
            },
          }),
        ],
      },
    }),
    createSchemaLabelItem({
      componentProps: {
        label: t('INSURANCE PRODUCTS CONTENT', {
          vn: 'NỘI DUNG SẢN PHẨM BẢO HIỂM',
        }),
        titleTooltip: t('INSURANCE PRODUCTS CONTENT', {
          vn: 'NỘI DUNG SẢN PHẨM BẢO HIỂM',
        }),
      },
    }),
    createHDynamicSchemaFormItems({
      name: 'productContent',
      componentProps: {
        colMinus: 2,
        schemaItems: ProductContentItem(),
      },
    }),
  ];
};

const ProductContentItem = () => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: HUploadImage,
      name: 'icon',
      colProps: { xs: 24, sm: 24, md: 3 },
      rowProps: { gutter: { xs: 8, md: 8 } },
      label: t('Icon'),
    }),
    createSchemaItem({
      Component: Input,
      name: 'color',
      colProps: { xs: 24, sm: 24, md: 2 },
      componentProps: {
        type: 'color',
      },
      label: t('Color', { vn: 'Mã màu' }),
    }),
    createSchemaItem({
      Component: Input,
      name: 'title',
      label: t('Title', { en: 'Tiêu đề' }),
      colProps: { xs: 24, sm: 24, md: 8 },
      componentProps: {
        placeholder: t('Title', { vn: 'Tiêu đề' }),
      },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'content',
      label: t('Content', { vn: 'Nội dung' }),
      colProps: { xs: 24, sm: 24, md: 8 },
      componentProps: {
        placeholder: t('Content', { vn: 'Nội dung' }),
        height: 250,
      },
    }),
  ];
};
