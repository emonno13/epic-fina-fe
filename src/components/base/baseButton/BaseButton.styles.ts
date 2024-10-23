import { Button } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  &.ant-btn {
    box-shadow: none;
    &.ant-btn-primary {
      border: none;
    }
  }
`;
