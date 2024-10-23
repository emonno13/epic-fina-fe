import { CSSProperties, ReactNode } from 'react';
import { Typography } from 'antd';
import cls from 'classnames';
import { H_TEXT_COLORS } from '../h-text';

const { Paragraph } = Typography;

interface HParagraphProps {
  children: ReactNode;
  color?: typeof H_TEXT_COLORS[number];
  fontSize?: number | string;
  strong?: boolean;
  copyable?: boolean;
  italic?: boolean;
  underline?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  semiStrong?: boolean;
  upperCase?: boolean;
  style?: CSSProperties;
}

const HParagraph = ({
  children,
  color,
  fontSize,
  copyable,
  semiStrong,
  upperCase,
  style = {},
  ...restProps
}: HParagraphProps) => {
  return (
    <Paragraph
      className={cls({
        [`color-${color}`]: !!color,
        'semistrong': !!semiStrong,
        'uppercase': !!upperCase,
      })}
      copyable={copyable}
      style={{ ...style, fontSize }}
      {...restProps}
    >
      {children}
    </Paragraph>
  );
};

export { HParagraph };
