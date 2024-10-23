import { BaseButton } from '@components/base/baseButton/BaseButton';
import styled, { css } from 'styled-components';

interface StyledProps {
  $hasBg?: boolean;
}
export const StyledIconButton = styled(BaseButton)<StyledProps>`
  &.ant-btn {
    background-color: transparent;
    padding: 6px;
    &:hover,
    &:focus {
      background-color: transparent !important;
    }

    ${(props) =>
      props.$hasBg &&
      css`
        background-color: #fff;
        border-radius: 8px;
        &:hover {
          border: 1px solid #d4d7e4;
        }
        &:focus {
          background-color: #fff !important;
        }
      `}
  }
`;
