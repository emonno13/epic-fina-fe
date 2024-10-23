import { Radio, RadioGroupProps } from 'antd';
import React from 'react';

interface HRadioGroupProps extends RadioGroupProps {
  classLabel?: string,
}

export const HRadioGroup = (props: HRadioGroupProps) => {
  const { options, classLabel, ...subProps } = props;
  return (
    <Radio.Group {...{ ...subProps }}>
      {options?.map((item: any, index) => (
        <Radio.Button style={item.styleLabel} key={index} value={item?.value}>
          {item?.label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};


