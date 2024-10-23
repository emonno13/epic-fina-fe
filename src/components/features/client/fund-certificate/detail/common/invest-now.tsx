import { Button } from 'antd';
import cls from 'classnames';

export const InvestNow = ({
  handleClickInvestNow = () => {},
  loading = false,
  className = '',
  text = 'Đầu tư ngay',
}) => {
  return (
    <Button
      className={cls(className, 'form-info-fund-action-buy')}
      size="large"
      type="primary"
      loading={loading}
      onClick={handleClickInvestNow}
    >
      {text}
    </Button>
  );
};
