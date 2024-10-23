import { createGlobalStyle } from 'styled-components';

export const WhiteBackgroundPageStyle = createGlobalStyle`
  #main-content-id {
    background: #F7F7F7;
  }
`;

export const GradientBackgroundModalStyle = createGlobalStyle`
  .ant-modal-content {
    background: linear-gradient(180deg, #E3F6FF 11.95%, #FFFFFF 39.94%);
  }
`;

export const V2PrimaryButtonBackgroundStyle = createGlobalStyle`
  &.ant-btn {
    &.ant-btn-primary {
      background: linear-gradient(90deg, #00DBC6 0%, #293FF4 100%) !important;
      background-repeat: no-repeat;
      border: none;
      &:hover {
        background: linear-gradient(90deg, #00DBC6 0%, #293FF4 100%) !important;
        background-repeat: no-repeat;
        opacity: 0.8;
      }
    }
  }
`;

export const WhiteHeaderBackgroundPageStyle = createGlobalStyle`
  #app-header {
    background: white;
  }
`;

export const RemoveMarginBottomOfHTMLParagraph = createGlobalStyle`
  p {
    margin: 0;
  }
`;

export const FixHeaderAndFooterPageStyle = createGlobalStyle`
  body {
      overflow: hidden;
    }
`;
