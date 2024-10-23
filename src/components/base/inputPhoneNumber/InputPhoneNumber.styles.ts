import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import styled, { css } from 'styled-components';

export const StyledPhoneInput = styled(PhoneInput)<{ $isError?: boolean }>`
  &.react-international-phone-input-container {
    position: relative;
    .react-international-phone-input {
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      padding: 2px 8px;
      height: 52px;
      width: 100%;
      font-size: 17px;
      font-weight: 400;
    }
    ::placeholder {
      color: #c9c9c9;
      font-size: 15px;
    }
  }
  .country-selector {
    button {
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
      padding-left: 6px;
      width: 92px;
      display: flex;
      justify-content: flex-start;
      border-right: none;
      height: 52px;
      &:hover {
        background-color: #fff;
      }
      .react-international-phone-country-selector-button__dropdown-arrow {
        position: absolute;
        left: 82px;
      }
    }
  }
  .code-preview-selector {
    position: absolute;
    left: 40px;
    top: 50%;
    font-size: 17px;
    transform: translateY(-50%);
    padding: 0;
    border: none;
    font-weight: 400;
    pointer-events: none;
    z-index: 0;
    &:hover {
      background-color: #fff;
    }
  }
  ${(props) =>
    props.$isError &&
    css`
      .code-preview-selector {
        border-color: #d9d9d9;
      }
      .react-international-phone-country-selector-button {
        border-color: #d9d9d9;
      }
      .react-international-phone-input {
        border-color: #d9d9d9;
      }
    `}
`;
