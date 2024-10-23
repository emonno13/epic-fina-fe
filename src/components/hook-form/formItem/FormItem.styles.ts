import styled, { css } from 'styled-components';

export const StyledFormBody = styled.div<{ $noSpacing?: boolean }>`
  ${(props) =>
    !props.$noSpacing &&
    css`
      margin-bottom: 20px;
    `}
`;
export const StyledFormControl = styled.div<{ $isError?: boolean }>`
  ${(props) =>
    props.$isError &&
    css`
      ${StyledFormBody} {
        margin-bottom: 0;
      }
    `}
`;
export const StyledFormLabel = styled.div<{ $required?: boolean; $strong: boolean }>`
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 400;
  color: #2d3c58;
  ${(props) =>
    props.$required &&
    css`
      &::after {
        padding-left: 2px;
        color: #f8b2b8;
        content: '*';
      }
    `}
  ${(props) =>
    props.$strong &&
    css`
      font-weight: 700;
    `}
`;
export const StyledFormInner = styled.div``;
export const StyledSuffix = styled.div``;
export const StyledFormErrorMessage = styled.div`
  color: #e87070;
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  padding-top: 2px;
`;
