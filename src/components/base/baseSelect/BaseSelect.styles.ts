import { Dimension } from '@interfaces/interfaces';
import { normalizeProp } from '@utils';
import { Select as AntSelect } from 'antd';
import styled from 'styled-components';

export interface InternalSelectProps {
  $width?: Dimension;
}

export const Select = styled(AntSelect)<InternalSelectProps>`
  width: ${(props) => props.$width && normalizeProp(props.$width)};
`;
