import { InputNumber, Switch } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';

import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import { HInput } from '../../../../shared/common-form-elements/h-input';
import { HSelect } from '../../../../shared/common-form-elements/select';

export const ScenarioIvrNodeDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const ivrNode = useDocumentDetail();
  const [playMode, setPlayMode] = useState(ivrNode?.action?.playMode || 'play');

  const controls: any = [];

  if (playMode === 'play') {
    controls.push(
      createSchemaItem({
        Component: HSelect,
        name: ['action', 'playContent'],
        rowProps: { gutter: { xs: 24, md: 24 } },
        colProps: { span: 24 },
        label: t('Play content', { vn: 'Nội dung phát' }),
        rules: [
          {
            required: true,
            message: t('Play content is required', {
              vn: 'Nội dung phát là bắt buộc',
            }),
          },
        ],
        componentProps: {
          showSearch: true,
          searchWhenHiddenValueChange: true,
          endpoint: 'greeting-files/suggestion',
          withRelations: ['file'],
          nameSubForm: 'playContent',
          optionsConverter: (option) => {
            return {
              ...option,
              label: option?.description || '',
            };
          },
        },
      }),
    );
  } else {
    controls.push(
      createSchemaItem({
        Component: TextArea,
        name: ['action', 'playContent'],
        colProps: { span: 24 },
        label: t('Play content', { vn: 'Nội dung phát' }),
        rules: [
          {
            required: true,
            message: t('Play content is required', {
              vn: 'Nội dung phát là bắt buộc',
            }),
          },
        ],
      }),
    );
  }

  return [
    createSchemaItem({
      Component: HInput,
      name: 'name',
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 24 },
      label: t('Name'),
      rules: [
        {
          required: true,
          message: t('Name is required', { vn: 'Tên là bắt buộc' }),
        },
      ],
    }),
    createSchemaItem({
      Component: HSelect,
      name: ['action', 'playMode'],
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 24 },
      label: t('Play mode', { vn: 'Chế độ phát' }),
      rules: [
        {
          required: true,
          message: t('Play mode is required', {
            vn: 'Chế độ phát là bắt buộc',
          }),
        },
      ],
      initialValue: 'play',
      componentProps: {
        showSearch: true,
        searchWhenHiddenValueChange: true,
        defaultValue: 'play',
        optionValues: [
          {
            label: 'Talk',
            value: 'talk',
          },
          {
            label: 'Play',
            value: 'play',
          },
        ],
        onChangeSelected: (playMode) => {
          setPlayMode(playMode.value);
        },
      },
    }),
    ...controls,
    createSchemaItem({
      Component: InputNumber,
      name: 'loop',
      colProps: { span: 24 },
      label: t('Loop', { vn: 'Lặp' }),
      componentProps: {
        min: 0,
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: 'isRootNode',
      colProps: { span: 24 },
      label: t('Root node', { vn: 'Nút gốc' }),
      valuePropName: 'checked',
    }),
  ];
};
