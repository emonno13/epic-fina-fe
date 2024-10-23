import { theme } from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import { useMemo } from 'react';

const { useToken } = theme;

export interface FloattingLabelBoxProps {
  focused?: boolean;
  haveValue?: boolean;
  label?: React.ReactNode;
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  status?: InputStatus;
  required?: boolean;
  placeholder?: React.ReactNode;
}

export function FloattingLabelBox({
  focused,
  haveValue,
  label,
  placeholder,
  children,
  width,
  height,
  status,
  required,
}: FloattingLabelBoxProps) {
  const { token } = useToken();

  const statusColor = useMemo(() => {
    const colors = {
      borderColorActive: '#1FB46E',
      textColorActive: '#565656',
      textColor: '#C9C9C9',
      borderColor: '#EDEDED',
    };
    if (status === 'warning') {
      colors.borderColorActive = token.colorWarningActive;
      colors.textColorActive = token.colorWarningTextActive;
      colors.textColor = token.colorWarningText;
      colors.borderColor = token.colorWarningBorder;
    } else if (status === 'error') {
      colors.borderColorActive = token.colorErrorActive;
      colors.textColorActive = token.colorErrorTextActive;
      colors.textColor = token.colorErrorText;
      colors.borderColor = token.colorErrorBorder;
    }
    return colors;
  }, [status, token]);

  return (
    <div
      className="ant-float-label-box"
      style={{
        width: width ?? '100%',
        height,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: token.borderRadius,
        }}
      >
        {children}
      </div>
      <label
        className="ant-float-label-box-label"
        style={{
          color: focused ? statusColor.textColorActive : statusColor.textColor,
          height: focused || haveValue ? 'auto' : '100%',
          transform:
            focused || haveValue
              ? 'translate(14px, -9px) scale(0.75)'
              : `translate(1em, 0px) scale(1)`,
        }}
      >
        {focused || haveValue ? `${label} ${required ? '*' : ''}` : placeholder}
      </label>
      <fieldset
        style={{
          border: focused
            ? `2px solid ${statusColor.borderColorActive}`
            : `1px solid ${statusColor.borderColor}`,
          borderRadius: token.borderRadius,
        }}
        className="ant-float-label-box-fieldset"
      >
        <legend
          className="ant-float-label-box-legend"
          style={{
            maxWidth: focused || haveValue ? '100%' : '0.01px',
          }}
        >
          {label}
        </legend>
      </fieldset>
    </div>
  );
}
