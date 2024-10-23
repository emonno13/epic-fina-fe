import { HSlug } from '@components/shared/common-form-elements/h-slug';
import { HTinyEditor } from '@components/shared/common-form-elements/h-tiny-editor';
import { setFormSlugValue } from '@components/shared/common-form-elements/utils';
import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import { useIsNewDocument } from '@schema-form/features/hooks/document-detail-hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { HSelect } from '../../../../shared/common-form-elements/select';

export const DocumentationDetailSchemaForm = (
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
      Component: HSelect,
      name: 'categoryDocumentationId',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Danh mục tài liệu'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Danh mục tài liệu'),
        },
      ],
      componentProps: {
        showSearch: true,
        searchWhenHiddenValueChange: true,
        endpoint: 'category-documentations/suggestion',
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'title',
      colProps: { span: 12 },
      label: 'Title',
      rules: [{ required: true, message: 'Title is required' }],
      componentProps: {
        placeholder: 'Enter the title',
        onChange: onTitleChange,
      },
    }),
    createSchemaItem({
      Component: HSlug,
      name: 'slug',
      colProps: { span: 12 },
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
      label: 'Mô tả',
      colProps: { span: 24 },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'infoApi',
      label: 'Thông tin API',
      colProps: { span: 24 },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'params',
      label: 'Body',
      colProps: { span: 24 },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'responseData',
      label: 'Data trả về',
      colProps: { span: 24 },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'dataDemo',
      label: 'Data Demo',
      colProps: { span: 24 },
    }),
  ];
};
