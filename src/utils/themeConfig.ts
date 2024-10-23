import type { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimaryText: 'rgba(0, 0, 0, 0.85)',
    colorTextBase: 'rgba(0, 0, 0, 1)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorPrimary: '#009EC1',
    controlHeight: 52,
    controlHeightSM: 36,
    controlHeightLG: 56,
    borderRadius: 8,
    fontSize: 16,
    fontFamily:
      "'HonorSans', Lato, Roboto, 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  },
  components: {
    Layout: {
      headerHeight: 80,
    },
    Form: {
      itemMarginBottom: 20,
    },
    Input: {
      fontSize: 16,
      fontWeightStrong: 500,
      colorText: '#2D3C58',
      colorTextPlaceholder: '#A2ACC0',
      activeBorderColor: '#009EC1',
    },
    Button: {
      fontWeight: 500,
      controlHeight: 48,
      borderRadius: 10,
    },
    Select: {
      controlHeight: 48,
    },
    Pagination: {
      borderRadius: 3,
      itemSize: 27,
    },
    Radio: {
      radioSize: 24,
    },
    Collapse: {
      headerPadding: '23.11px 24px',
      contentPadding: '0 24px 24px',
    },
  },
};
