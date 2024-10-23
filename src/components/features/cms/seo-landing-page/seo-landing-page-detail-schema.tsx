import { HInput } from '@components/shared/common-form-elements/h-input';
import { DEFAULT_FIELD_NAME_OF_SEO } from '@components/shared/common-form-elements/h-seo-element/constants';
import { useSeoDetailSchemaForm } from '@components/shared/common-form-elements/h-seo-element/h-seo-schema-detail';
import { onUpdateSeoFields } from '@components/shared/common-form-elements/h-seo-element/utils';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { HSubForm } from '@schema-form/h-form';
import {
  HFormItemProps,
  HFormProps,
  createSchemaItem,
} from '@schema-form/h-types';
import { Switch } from 'antd';
import { useHTranslation } from 'lib/i18n';

export const useSeoLandingPageDetailSchema = () => {
  const { t } = useHTranslation('admin-common');
  const seoSchemaDetail = useSeoDetailSchemaForm();

  return (props: HFormProps): HFormItemProps[] => {
    const { form } = props;
    const { onUpdateUrl } = onUpdateSeoFields({
      form,
      nameTag: DEFAULT_FIELD_NAME_OF_SEO,
    });

    return [
      createSchemaItem({
        Component: Switch,
        name: 'isActive',
        label: t('Status'),
        rowProps: { gutter: [16, 16] },
        colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
        rules: [
          {
            required: true,
            message: t('Please select status', { vn: 'Vui lòng chọn status' }),
          },
        ],
        initialValue: true,
        valuePropName: 'checked',
        componentProps: {
          checkedChildren: t('Active', { vn: 'Hoạt động' }),
          unCheckedChildren: t('Inactive', { vn: 'Không hoạt động' }),
        },
      }),
      createSchemaItem({
        Component: HInput,
        name: 'url',
        label: t('Link landing page'),
        colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
        rules: [
          {
            required: true,
            message: t('Please enter the URL', {
              vn: 'Vui lòng nhập đường link landing page',
            }),
          },
        ],
        componentProps: {
          placeholder: t('Enter the link landing page', {
            vn: 'Nhập đường link landing page',
          }),
          onChange: (e) => onUpdateUrl(e.target.value),
        },
      }),
      createSchemaLabelItem({
        componentProps: {
          label: 'SEO',
        },
      }),
      createSchemaItem({
        Component: () => {
          return (
            <HSubForm
              transport={{ SEOFieldName: DEFAULT_FIELD_NAME_OF_SEO }}
              schema={seoSchemaDetail}
            />
          );
        },
      }),
    ];
  };
};
