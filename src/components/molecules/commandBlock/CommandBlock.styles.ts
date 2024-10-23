'use client';

import { BaseButton } from '@components/base/baseButton/BaseButton';
import { media } from '@styles/constants';
import styled from 'styled-components';

export const SendButton = styled(BaseButton)`
  background: linear-gradient(41.22deg, #003fb8 -0.84%, #00ffb3 100.62%);
  border-radius: 50%;
  padding: 10px;
  position: relative;
  border: 1px solid #96f0fc;
  &:hover {
    background: linear-gradient(41.22deg, #003fb8 -0.84%, #00ffb3 100.62%) !important;
  }
`;
export const CommandInput = styled.div`
  width: calc(100% - 88px);
  @media ${media.lg} {
    width: 100%;
  }
  border-radius: 20px;
  // background-color: white;
  display: flex;
  flex-direction: column;
  padding: 4px;
`;
export const StyledCommandBlock = styled.div`
  padding: 0px 0px 12px 0px;
  display: flex;
  ${CommandInput} {
    flex: 1;
  }
`;

export const CommandBtn = styled(BaseButton)`
  &.ant-btn {
    border: none;
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-right: 12px;
    width: 52px;
    min-width: 52px;
    overflow: hidden;
    box-shadow: 0px 16px 32px -16px #b2b7db66;
    span + span {
      opacity: 0;
    }
    &:hover {
      @media ${media.lg} {
        width: 216px;
        span + span {
          opacity: 1;
        }
      }
    }
  }
`;
