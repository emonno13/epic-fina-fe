import React from 'react';
import { DatePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import { DatePicker as DatePickerFromAnt, TimePicker } from 'antd';
import { getPropertiesOfFloatLabel, ModernLabel } from '../h-input';

const datePickerConverter = (value) => {
  if (value && typeof value === 'string') {
    return moment(value);
  }
  return value;
};

export type HDatePickerProps = DatePickerProps & {
  modernLabel?: boolean,
  required?: boolean,
  label?: string,
};

export const HDatePicker = (props: HDatePickerProps) => {
  const { modernLabel, value, defaultValue, required, label } = props;
  const Component = () => (
    <DatePickerFromAnt
      format={'YYYY MMM DD'}
      {...props}
      value={datePickerConverter(value)}
      defaultValue={datePickerConverter(defaultValue)}
    />
  );

  if (!modernLabel) return Component();
  const { labelClass, requiredMark } = getPropertiesOfFloatLabel(required);

  return (
    <div className={'h-date-picker'}>
      {Component()}
      <ModernLabel label={label} labelClass={labelClass} requiredMark={requiredMark}/>
    </div>
  );
};

export const HTimePicker = (props: HDatePickerProps) => {
  const { modernLabel, required, label } = props;
  const Component = () => (
    <TimePicker
      format={'HH:mm:ss'}
      {...props}
      value={datePickerConverter(props.value)}
      defaultValue={datePickerConverter(props.defaultValue)}/>
  );

  if (!modernLabel) return Component();
  const { labelClass, requiredMark } = getPropertiesOfFloatLabel(required);

  return (
    <div className={'h-time-picker'}>
      {Component()}
      <ModernLabel label={label} labelClass={labelClass} requiredMark={requiredMark}/>
    </div>
  );
};
