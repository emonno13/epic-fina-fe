import { useState } from 'react';

import { HInput } from '@components/shared/common-form-elements/h-input';
import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';
import { HSelect } from '../../../shared/common-form-elements/select';
import { IVR_KEYPRESS_ACTION, IVR_KEYPRESS_ACTION_OPTIONS } from './constant';

export const ScenarioIvrKeypressDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const scenarioIvrKeypress = useDocumentDetail();
  const [currentAction, setCurrentAction] = useState(
    scenarioIvrKeypress?.action?.key || '',
  );

  const controls: any = [];

  if (currentAction === IVR_KEYPRESS_ACTION.GO_TO_QUEUE) {
    controls.push(
      createSchemaItem({
        Component: HSelect,
        name: ['action', 'value'],
        rowProps: { gutter: { xs: 24, md: 24 } },
        colProps: { span: 24 },
        label: t('Queue', { vn: 'Hàng đợi' }),
        componentProps: {
          showSearch: true,
          searchWhenHiddenValueChange: true,
          endpoint: 'queues/suggestion',
          nameSubForm: 'actionValue',
        },
      }),
    );
  } else if (currentAction === IVR_KEYPRESS_ACTION.GO_TO_IVR_NODE) {
    controls.push(
      createSchemaItem({
        Component: HSelect,
        name: ['action', 'value'],
        rowProps: { gutter: { xs: 24, md: 24 } },
        colProps: { span: 24 },
        label: t('IVR node', { vn: 'Nút IVR' }),
        componentProps: {
          showSearch: true,
          searchWhenHiddenValueChange: true,
          endpoint: 'scenario-ivr-nodes/suggestion',
          nameSubForm: 'actionValue',
        },
      }),
    );
  } else if (currentAction === IVR_KEYPRESS_ACTION.GO_TO_PHONE_NUMBER) {
    controls.push(
      createSchemaItem({
        Component: HInput,
        name: ['action', 'value'],
        label: t('Number phone will forward', { vn: 'Số điện chuyển tiếp' }),
        rules: [
          {
            required: true,
            message: t('Phone is required', { vn: 'Số điện thoại bắt buộc' }),
          },
          {
            pattern: /^(\d{1,2})?\d{9}$/gm,
            message: t('Your phone is not valid', {
              vn: 'Không đúng định dạng số điện thoại',
            }),
          },
        ],
        componentProps: {
          modernLabel: true,
          placeholder: t('Enter the phone', { vn: 'Số điện thoại' }),
        },
      }),
    );
  }

  return [
    createSchemaItem({
      Component: HSelect,
      name: 'name',
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 24 },
      label: t('Keypress', { vn: 'Phím bấm' }),
      rules: [
        {
          required: true,
          message: t('Keypress is required.', { vn: 'Phím bấm là bắt buộc' }),
        },
      ],
      componentProps: {
        showSearch: true,
        searchWhenHiddenValueChange: true,
        optionValues: () => {
          const optionValues: any = [];

          for (let i = 0; i <= 9; i++) {
            optionValues.push({
              label: i.toString(),
              value: i.toString(),
            });
          }

          return [
            ...optionValues,
            {
              label: '*',
              value: '*',
            },
            {
              label: '#',
              value: '#',
            },
          ];
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: ['action', 'key'],
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 24 },
      label: t('Act', { vn: 'Hành động' }),
      rules: [
        {
          required: true,
          message: t('Action is required.', { vn: 'Hành động là bắt buộc' }),
        },
      ],
      componentProps: {
        showSearch: true,
        searchWhenHiddenValueChange: true,
        optionValues: IVR_KEYPRESS_ACTION_OPTIONS,
        onChangeSelected: (option) => {
          setCurrentAction(option.value);
        },
      },
    }),
    ...controls,
  ];
};
