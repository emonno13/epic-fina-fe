import Typography, { TypographyProps } from 'antd/lib/typography';
import * as React from 'react';
import { PresetValues } from './preset';

const ParagraphAntd = Typography.Paragraph;

interface ParagraphProps extends TypographyProps {
  preset?: string
  className?: string
}

export const Paragraph = ({ preset, className, ...rest }: ParagraphProps) => {
  const classNameViaPreset = preset ? PresetValues[preset] : '';
  return <ParagraphAntd {...{
    className: `text text-default  ${classNameViaPreset} ${className}`,
    ...rest,
  }}/>;
};
