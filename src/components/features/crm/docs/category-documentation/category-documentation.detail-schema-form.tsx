import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { ValidationMessages } from '../../../../../lib/validation-message';
import { useIsNewDocument } from '../../../../../schema-form/features/hooks/document-detail-hooks';
import { HSlug } from '../../../../shared/common-form-elements/h-slug';
import HTinyEditor from '../../../../shared/common-form-elements/h-tiny-editor';
import { setFormSlugValue } from '../../../../shared/common-form-elements/utils';
import { HRadioGroup } from '../../../../shared/common/h-radio-group';
import {
  CATEGORY_DOCUMENTATION_STATUS,
  CATEGORY_DOCUMENTATION_STATUS_OPTIONS,
} from './constant';

export const CategoryDocumentationDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const isDocumentation = useIsNewDocument();
  const { t } = useHTranslation('admin-common');
  const { form } = props;
  const onTitleChange = (e) => {
    const value = e?.target?.value;
    if (isDocumentation) {
      setFormSlugValue(value, form);
    }
  };

  return [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
      label: t('Name', { vn: 'Tên danh mục' }),
      rules: [{ required: true, message: 'Name is required' }],
      componentProps: {
        placeholder: 'Enter the Name',
        onChange: onTitleChange,
      },
    }),
    createSchemaItem({
      Component: HRadioGroup,
      colProps: { span: 12 },
      label: t('Status'),
      initialValue: CATEGORY_DOCUMENTATION_STATUS.ACTIVE,
      componentProps: {
        placeholder: t('Status'),
        optionType: 'button',
        buttonStyle: 'solid',
        options: CATEGORY_DOCUMENTATION_STATUS_OPTIONS,
      },
      name: 'status',
    }),
    createSchemaItem({
      Component: HSlug,
      name: 'slug',
      colProps: { span: 24 },
      label: t('Slug'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Slug') },
      ],
      componentProps: {
        placeholder: t('Enter slug'),
      },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'description',
      label: 'Description',
      colProps: { span: 24 },
      componentProps: {
        rows: 10,
      },
    }),
  ];
};
