import { useState } from 'react';
import { Input } from 'antd';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../schema-form/h-types';
import { SelectUtils } from '../../../shared/common-form-elements/select/Utils';
import { HSelect } from '../../../shared/common-form-elements/select';

export const PopupNotificationSchema = (props: HFormProps): HFormItemProps[] => {
  const [codeShow, setCodeShow] = useState(null);

  const optionsConverter = (option) => {
    option.value = option.code;
    return option;
  };

  const handleTypeInput = (option) => {
    setCodeShow(option);
  };

  return (
    [
      SelectUtils.createTemplateSuggestionElement({
        label: 'Code Template',
        colProps: { span: 16 },
        rowProps: { gutter: { xs: 8, md: 16 } },
        name: 'code',
        rules: [{
          required: true,
          message: 'Code Template',
        }],
        componentProps: {
          optionsConverter,
          onChangeSelected: handleTypeInput,
        },
      }, {
        type: 'notification',
      }),
      createSchemaItem({
        Component: HSelect,
        label: 'Type',
        rowProps: { gutter: { xs: 8, md: 16 } },
        colProps: { span: 16 },
        name: 'type',
        rules: [{
          message: 'Type is required',
        }],
        componentProps: {
          placeholder: 'Select a type',
          options: [
            { value: 'signature-user', label: 'User' },
            { value: 'organization', label: 'Organization' },
          ],
        },
      }),
      ...renderSchemaItemContent(codeShow),
    ]
  );
};

const renderSchemaItemContent = (option) => {
  if (option) {
    return [
      createSchemaItem({
        Component: Input,
        colProps: { span: 16 },
        label: 'Title template',
        componentProps: {
          value: option.title,
          disabled: true,
        },
      }),
      createSchemaItem({
        Component: Input.TextArea,
        colProps: { span: 24 },
        label: 'Content',
        componentProps: {
          value: option.content,
          rows: 6,
          disabled: true,
        },
      }),
    ];
  }
  return [];

};