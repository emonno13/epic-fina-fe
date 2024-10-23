import { CSSProperties, ReactNode } from 'react';
import { Typography } from 'antd';
import cn from 'classnames';

import './h-text.module.scss';

const { Text } = Typography;
const H_TEXT_COLORS = [
  'base',
  'light',
  'lighter',
  'lightest',
  'success',
  'danger',
  'info',
  'primary',
  'secondary',
  'white',
  'link',
] as const;

export interface HTextProps {
  children: ReactNode;
  color?: typeof H_TEXT_COLORS[number];
  fontSize?: number;
  strong?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'center' | 'left' | 'right';
  transform?: 'capitalize' | 'uppercase' | 'lowercase';
  ellipsis?: any;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  style?: CSSProperties;
}

const HText = ({
  children,
  color,
  fontSize,
  strong,
  italic,
  underline,
  align,
  transform,
  ellipsis,
  onClick,
  style = {},
}: HTextProps) => {
  const generateClassName = color ? `color-${color}` : '';
  return (
    <Text
      className={cn('h-text', generateClassName)}
      style={{
        ...style,
        fontSize,
        textAlign: align,
        textTransform: transform,
        cursor: onClick ? 'pointer' : 'inherit',
      }}
      {...{
        strong,
        italic,
        underline,
        ellipsis,
        onClick,
      }}
    >
      {children}
    </Text>
  );
};

export { HText, H_TEXT_COLORS };
