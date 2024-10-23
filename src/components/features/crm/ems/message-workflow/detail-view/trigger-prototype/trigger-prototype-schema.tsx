import { useState } from 'react';

import { Radio } from 'antd';

import { HInputNumber } from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { useDetailForm } from '@schema-form/features/hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import {
  TRIGGER_BASED_ON,
  TRIGGER_BASED_ON_OPTIONS,
  TRIGGER_DEADLINE_TYPE_OPTIONS,
  TRIGGER_INTERVAL_UNIT,
  TRIGGER_INTERVAL_UNIT_OPTIONS,
  TRIGGER_SENDING_DAY_OPTIONS,
} from '../../constant';

const timeOptions = (interval: number) => {
  const options: any = [];

  for (let i = 0; i < interval; i++) {
    options.push({
      label: i < 10 ? `0${i}` : `${i}`,
      value: i.toString(),
    });
  }

  return options;
};

export const TriggerPrototypeSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { transport = {} } = props;
  const { triggerPrototype = {} } = transport;
  const triggerFormName = 'triggerPrototype';
  const interval = useDetailForm()?.getFieldValue('triggerPrototype')?.interval;
  const [currentInterval, setCurrentInterval] = useState(
    interval || triggerPrototype?.interval || TRIGGER_INTERVAL_UNIT.DAY,
  );

  const intervalControls: any[] = [];

  if (currentInterval === TRIGGER_INTERVAL_UNIT.WEEKS) {
    intervalControls.push(
      createSchemaItem({
        Component: Radio.Group,
        label: t('Sending'),
        name: [triggerFormName, 'sendingDay'],
        rowProps: { gutter: { xs: 24, md: 24 } },
        colProps: { span: 24 },
        componentProps: {
          optionType: 'radio',
          options: TRIGGER_SENDING_DAY_OPTIONS,
        },
      }),
    );
  }

  return [
    createSchemaItem({
      Component: HInputNumber,
      name: [triggerFormName, 'activated'],
      label: t('Activated', { en: 'Activated', vn: 'Activated' }),
      rowProps: { gutter: { xs: 24, md: 24 } },
      rules: [
        {
          required: true,
          message: t('Activated is required', { vn: 'Kích hoạt là bắt buộc' }),
        },
        {
          type: 'number',
          min: 0,
          message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
        },
      ],
      colProps: { span: 4 },
      componentProps: {
        placeholder: t('Number'),
        style: { width: '100%' },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: 'Interval unit',
      name: [triggerFormName, 'interval'],
      colProps: { span: 10 },
      rules: [
        {
          required: true,
          message: t('Interval unit is required', {
            vn: 'Interval unit is required',
          }),
        },
      ],
      initialValue: currentInterval,
      componentProps: {
        optionValues: TRIGGER_INTERVAL_UNIT_OPTIONS,
        onChangeSelected: (option: any) => {
          setCurrentInterval(option.value);
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Time', { vn: 'Giờ' }),
      name: [triggerFormName, 'hour'],
      rules: [
        {
          required: true,
          message: t('Time is required', { vn: 'Thời gian là bắt buộc' }),
        },
      ],
      colProps: { span: 3, offset: 4 },
      componentProps: {
        optionValues: timeOptions(24),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: [triggerFormName, 'minute'],
      label: t('minute', { vn: 'Phút' }),
      colProps: { span: 3 },
      rules: [
        {
          required: true,
          message: t('Time is required', { vn: 'Thời gian là bắt buộc' }),
        },
      ],
      componentProps: {
        optionValues: timeOptions(60),
      },
    }),
    ...intervalControls,
    createSchemaItem({
      Component: Radio.Group,
      name: [triggerFormName, 'basedOn'],
      rules: [
        {
          required: true,
          message: t('Based On is required', { vn: 'Based On là bắt buộc' }),
        },
      ],
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 4 },
      label: t('Based On'),
      initialValue: TRIGGER_BASED_ON.BEFORE,
      componentProps: {
        options: TRIGGER_BASED_ON_OPTIONS,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: [triggerFormName, 'deadlineType'],
      label: t('Deadline type', { vn: 'Deadline type' }),
      colProps: { span: 12 },
      rules: [
        {
          required: true,
          message: t('Trigger deadline type is required', {
            vn: 'Trigger deadline type is required',
          }),
        },
      ],
      componentProps: {
        optionValues: TRIGGER_DEADLINE_TYPE_OPTIONS,
      },
    }),
  ];
};
