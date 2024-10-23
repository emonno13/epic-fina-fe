import { useTranslation } from 'next-i18next';
import { Input } from 'antd';
import { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { HSelect } from '../../shared/common-form-elements/select';
import { createSchemaItem, HFormProps } from '../../../schema-form/h-types';
import { HReactColor } from '../../shared/common-form-elements/h-color';


export const StatusTemplateDetailSchema = (props: HFormProps) => {
  const { transport, initialValues } = props;
  const [valueModelName, setValueModelName] = useState(initialValues?.model);
  const models = useSelector((state: RootStateOrAny) => state.common.models);
  const { t } = useTranslation('admin-common');
  return (
    [
      createSchemaItem({
        Component: HSelect,
        label: 'Model name',
        colProps: { span: 24 },
        rowProps: { gutter: { xs: 8, md: 16 } },
        name: 'model',
        rules: [{
          required: true,
          message: 'Model name is required',
        }],
        componentProps: {
          showSearch: true,
          placeholder: 'Model a template',
          optionValues: models,
          optionsConverter: (model: string) => ({ value: model, label: (model) }),
          onChange: (document) => {
            setValueModelName(document);
          },
        },
      }),
      createSchemaItem({
        Component: HSelect,
        name: 'parentId',
        colProps: { span: 24 },
        label: 'Status parent',
        componentProps: {
          showSearch: true,
          allowClear: true,
          endpoint: 'statuses/suggestion',
          hiddenValues: { model: { inq: valueModelName ? [valueModelName] : transport.models } },
          searchWhenHidenValueChange: true,
          placeholder: 'Select an status',
          optionFilterProp: 'children',
          optionsConverter: (document) => {
            document.label = `${document.model}.${document.name}`;
            return document;
          },
        },
      }),
      createSchemaItem({
        Component: Input,
        name: 'code',
        colProps: { span: 24 },
        rules: [{
          required: true,
          message: 'Code is required',
        }],
        label: 'Code status:',
        componentProps: {
          placeholder: 'Code status:',
        },
      }),
      createSchemaItem({
        Component: Input,
        name: 'name',
        colProps: { span: 24 },
        rules: [{
          required: true,
          message: 'Name is required',
        }],
        label: 'Name status:',
        componentProps: {
          placeholder: 'Name status:',
        },
      }),
      createSchemaItem({
        Component: HReactColor,
        label: 'Color',
        name: 'color',
        colProps: { span: 6 },
        rowProps: { gutter: { xs: 16, md: 24 } },
      }),
    ]
  );
};
