import { Input, InputProps } from 'antd';

import './h-slug.module.scss';

export const HSlug = (props: InputProps) => {
  return (
    <Input
      {...{
        ...props,
        prefix: `${window.location.origin}/`,
        className: 'h-slug',
      }}
    />
  );
};
