import * as React from 'react';
import Typography from 'antd/lib/typography';
import { LinkProps } from 'antd/lib/typography/Link';
import { PresetValues } from './preset';
const LinkAntd = Typography.Link;

interface HLinkProps extends LinkProps{
  preset?: string,
  className?: string,
  children?: string
}

export const Link = ({ preset, className = '', ...rest }: HLinkProps) => {
  const classNameViaPreset = preset ? PresetValues[preset] : '';
  return <LinkAntd {...{
    className: `text text-default  ${classNameViaPreset} ${className}`,
    ...rest,
  }}/>;
};