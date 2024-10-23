import { useHTranslation } from '@lib/i18n';
import locale from 'antd/lib/date-picker/locale/en_GB';
import moment from 'moment';

import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import {
  HInput,
  HTextArea,
} from '@components/shared/common-form-elements/h-input';
import { HRadioGroup } from '@components/shared/common/h-radio-group';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';

import { useDetailForm } from '@schema-form/features/hooks';
import { EVENT_STATUS, EVENT_STATUS_OPTIONS } from '../constant';

import 'moment/locale/en-gb';

export const EventDetailSchemaForm = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  const detailForm = useDetailForm();

  moment.locale('en-gb', {
    week: {
      dow: 1,
    },
  });

  const disabledDate = (current) => {
    const startTime = new Date(detailForm?.getFieldValue('startTime'));
    return current < startTime;
  };

  return [
    createSchemaItem({
      Component: HInput,
      colProps: { span: 12 },
      label: t('Name'),
      rules: [
        {
          required: true,
          message: t('Name is required', { vn: 'Tên là bắt buộc' }),
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            const name = getFieldValue('name');
            if (!name.length || name.trim().length) {
              return Promise.resolve();
            }
            return Promise.reject(
              t('Name is not a space', { vn: 'Tên không thể là khoảng trắng' }),
            );
          },
        }),
      ],
      componentProps: {
        placeholder: t('Name'),
      },
      name: 'name',
    }),
    createSchemaItem({
      Component: HRadioGroup,
      colProps: { span: 10, offset: 2 },
      label: t('Status'),
      initialValue: EVENT_STATUS.ACTIVE,
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: EVENT_STATUS_OPTIONS,
      },
      name: 'status',
    }),
    createSchemaItem({
      Component: HDatePicker,
      label: t('Start Time', { en: 'Start Time', vn: 'Ngày bắt đầu' }),
      name: 'startTime',
      colProps: { span: 6 },
      rules: [
        {
          required: true,
          message: t('Start time is required', {
            vn: 'Ngày bắt đầu là bắt buộc',
          }),
        },
      ],
      componentProps: {
        locale: locale,
        placeholder: 'Select start date',
        showTime: true,
        format: 'DD/MM/YYYY HH:mm',
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      label: t('End Time', { en: 'End Time', vn: 'Ngày kết thúc' }),
      name: 'endTime',
      rules: [
        {
          required: true,
          message: t('End time is required', {
            vn: 'Ngày kết thúc là bắt buộc',
          }),
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            const startTime = new Date(getFieldValue('startTime'));
            const endTime = new Date(getFieldValue('endTime'));
            if (startTime.getTime() < endTime.getTime()) {
              return Promise.resolve();
            }
            return Promise.reject(
              t('Start time must be less than end date time', {
                vn: 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc',
              }),
            );
          },
        }),
      ],
      colProps: { span: 6, offset: 1 },
      componentProps: {
        placeholder: 'Select end date',
        showTime: true,
        format: 'DD/MM/YYYY HH:mm',
        disabledDate,
        locale: locale,
      },
    }),
    createSchemaItem({
      Component: HTextArea,
      colProps: { span: 24 },
      label: t('Description', { en: 'Description', vn: 'Mô tả' }),
      name: 'description',
      componentProps: {
        rows: 6,
        placeholder: 'Enter description',
      },
    }),
  ];
};
