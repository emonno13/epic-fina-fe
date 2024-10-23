import Typography from 'antd/lib/typography';
import { TextProps } from 'antd/lib/typography/Text';
import * as React from 'react';
import { PresetValues } from './preset';
const TextAntd = Typography.Text;

interface HTextProps extends TextProps{
  preset?: string,
  className?: string,
  children?: any
}

export const HText = ({ preset, className = '', ...rest }: HTextProps) => {
  const classNameViaPreset = preset ? PresetValues[preset] : 'text-default ';
  return <TextAntd {...{
    className: `text  ${classNameViaPreset} ${className}`,
    ...rest,
  }}/>;
};
