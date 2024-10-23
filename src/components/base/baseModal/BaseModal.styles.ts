import { Modal } from 'antd';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 24px;
  }

  .ant-modal-close {
    width: 28px;
    height: 28px;
    right: 17px;
    padding: 4px;
    background-color: #f0f5f7;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &-x {
      width: 15px;
      height: 15px;
      color: #a2acc0;
      border-radius: 50%;
    }
  }

  .ant-modal-header {
    border-bottom: transparent;

    .ant-modal-title {
      font-size: 15px;
      font-weight: 400;
      text-align: center;
    }
  }
`;
