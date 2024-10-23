import React, { HTMLAttributes, PropsWithChildren } from 'react';

import { Wrapper } from './ButtonContainer.styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  align?: 'right';
}

export const ButtonContainer: React.FC<Props & PropsWithChildren> = ({ align, ...props }) => {
  return (
    <Wrapper $align={align} {...props}>
      {props.children}
    </Wrapper>
  );
};
