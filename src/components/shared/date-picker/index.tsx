import React, { useMemo } from 'react';
import moment from 'moment';
import { DatePicker as DatePickerFromAnt } from 'antd';

const { RangePicker } = DatePickerFromAnt;

export const HRangePicker = ({ value, ...props }) => {
  const valueChange = useMemo(() => {
    return value?.map(date => {
      return moment(date);
    });
  }, [value]); 
  return <RangePicker value ={valueChange} {...props}/>;
};
