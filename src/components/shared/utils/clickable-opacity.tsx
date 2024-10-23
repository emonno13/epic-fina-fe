import { Popconfirm, Tooltip } from 'antd';
import { ReactElement } from 'react';
import cls from 'classnames';
import { useHTranslation } from '../../../lib/i18n';
interface ClickableOpacityProps extends ReactElement{
  children?: any,
  onClick?: any,
  confirmation?: {
    onConfirmCancel?: Function,
    message?: string
  },
  className?: string;
}

export const ClickableOpacity = (props: ClickableOpacityProps | any): ReactElement => {
  const {
    children,
    onClick,
    confirmation,
    className = '',
    tooltip = '',
    ...restProps
  }  = props;
  const clickableComponent = <span className={cls('clickable-opacity', className)} onClick={onClick} {...restProps}>
    <Tooltip title={tooltip}>
      {children}
    </Tooltip>
  </span>;
  const { t } = useHTranslation('admin-common');

  if (!confirmation) {
    return clickableComponent;
  }
  return (
    <Popconfirm
      title={confirmation.message || 'Are you sure to confirm this action?'}
      onConfirm={onClick}
      onCancel={confirmation.onConfirmCancel}
      okText={t('Yes', { vn: 'Có' })}
      cancelText={t('No', { vn: 'Không' })}
    >
      <Tooltip title={tooltip}>
        <span className={cls('clickable-opacity', className)}>{children}</span>
      </Tooltip>
    </Popconfirm>);
};
