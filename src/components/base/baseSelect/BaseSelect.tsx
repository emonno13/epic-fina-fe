import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Dimension } from '@interfaces/interfaces';
import { Select as AntSelect } from 'antd';
import { RefSelectProps } from 'antd/lib/select';
import React, { ComponentProps } from 'react';
import * as S from './BaseSelect.styles';

export const { Option } = AntSelect;

export interface BaseSelectProps extends ComponentProps<typeof AntSelect> {
  width?: Dimension;
  className?: string;
}

export const BaseSelect = React.forwardRef<RefSelectProps, BaseSelectProps>(function BaseSelect(
  { className, width, children, ...props },
  ref,
) {
  return (
    <S.Select
      getPopupContainer={(triggerNode) => triggerNode}
      ref={ref as any}
      className={className}
      $width={width}
      suffixIcon={<ChevronDownIcon className='w-4 h-4' />}
      {...props}
    >
      {children}
    </S.Select>
  );
});
