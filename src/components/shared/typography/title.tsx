import Typography from 'antd/lib/typography';
import * as React from 'react';
import { TitleProps } from 'antd/lib/typography/Title';
import { PresetValues } from './preset';

const TitleAntd = Typography.Title;

interface HTitleProps extends TitleProps{
  preset?: string,
  className?: string,
  children?: string
}

export const Title = ({ preset, className = '', ...rest }: HTitleProps) => {
  const classNameViaPreset = preset ? PresetValues[preset] : '';
  return <TitleAntd {...{
    className: `text text-default title ${classNameViaPreset} ${className}`,
    ...rest,
  }}/>;
};