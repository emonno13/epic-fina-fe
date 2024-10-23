import { BaseButton } from '@components/base/baseButton/BaseButton';
import styled from 'styled-components';

export const UploadWrapper = styled.div`
  display: flex;
`;
export const UploadBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  justify-content: center;
`;
export const PreviewImageWrapper = styled.div`
  width: 104px;
  height: 104px;
  background-color: #00000005;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
  }
`;

export const UploadButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
export const UploadSelectBtn = styled(BaseButton)`
  &.ant-btn {
    border: 1.5px solid #00000014;
    height: 40px;
    border-radius: 12px;
    line-height: 20px;
  }
`;
export const UploadRemoveBtn = styled(BaseButton)`
  &.ant-btn {
    border: 1.5px solid #00000014;
    height: 40px;
    border-radius: 12px;
    line-height: 20px;
  }
`;
