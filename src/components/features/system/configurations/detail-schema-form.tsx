import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { HInlineEditor } from '../../../shared/common-form-elements/h-inline-editor';

export const createConfigurationDetailSchema = (
  nameLabel = 'Name',
  valueLabel = 'Value',
): ((props: HFormProps) => HFormItemProps[]) => {
  return (props: HFormProps) => {
    return [
      createSchemaItem({
        Component: Input,
        colProps: { span: 12 },
        rowProps: { gutter: { xs: 8, md: 16 } },
        label: nameLabel,
        name: 'name',
        rules: [{ required: true, message: `${nameLabel} is required` }],
        componentProps: {
          placeholder: `Enter the ${nameLabel.toLowerCase()}`,
        },
      }),
      createSchemaItem({
        Component: Input,
        colProps: { span: 12 },
        label: valueLabel,
        name: 'value',
        rules: [{ required: true, message: `${valueLabel} is required` }],
        componentProps: {
          placeholder: `Enter the ${valueLabel.toLowerCase()}`,
        },
      }),
      createSchemaItem({
        Component: HInlineEditor,
        colProps: { span: 24 },
        label: 'Description',
        name: 'description',
      }),
    ];
  };
};

export const ConfigurationDetailSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  return [
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: 'Code',
      componentProps: {
        placeholder: 'Enter the code',
      },
    }),
    ...createConfigurationDetailSchema()(props),
  ];
};

export const ConfigurationQuestionDetailSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  return [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: 'Tiêu đề',
      componentProps: {
        placeholder: 'Enter the code',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: 'Mã Code',
      componentProps: {
        placeholder: 'Enter the code',
      },
    }),
    ...createConfigurationQuestionDetailSchema()(props),
  ];
};

export const createConfigurationQuestionDetailSchema = (
  nameLabel = 'Vị trí',
  valueLabel = 'Code bộ câu hỏi',
): ((props: HFormProps) => HFormItemProps[]) => {
  return (props: HFormProps) => {
    return [
      createHDynamicSchemaFormItems({
        name: 'configs',
        required: true,
        componentProps: {
          schemaItems: [
            createSchemaItem({
              Component: HInput,
              colProps: { span: 10 },
              rowProps: { gutter: { xs: 8, md: 16 } },
              label: nameLabel,
              name: 'name',
              rules: [{ required: true, message: `${nameLabel} is required` }],
              componentProps: {
                // disabled: !isNewDocument,
                // uppercase: true,
                deleteWhiteSpace: true,
                placeholder: `Enter the ${nameLabel.toLowerCase()}`,
              },
            }),
            createSchemaItem({
              Component: HSelect,
              label: valueLabel,
              name: 'value',
              rules: [{ required: true, message: `${valueLabel} is required` }],
              colProps: { span: 10 },
              componentProps: {
                showSearch: true,
                allowClear: true,
                endpoint: 'question-groups/suggestion',
                placeholder: `Enter the ${valueLabel.toLowerCase()}`,
                optionFilterProp: 'children',
                mode: 'single',
                optionsConverter: (document) => {
                  return {
                    value: document?.code,
                    label: `${document?.name} - ${document?.code} - ${
                      document?.questionGroupType || 'TECHNICAL'
                    }`,
                  };
                },
                hiddenValues: {},
              },
            }),
          ],
        },
      }),
    ];
  };
};
