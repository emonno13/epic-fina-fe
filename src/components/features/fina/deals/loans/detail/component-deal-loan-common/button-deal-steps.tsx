import { FastForwardOutlined } from '@ant-design/icons/lib/icons';
import { Button } from 'antd';

import './component-deal-loan-common.module.scss';

export const ButtonDealSteps = (props: any) => {
  const { label = '', handleClickNextSteps, disabled } = props;
  return (
    <Button {...{
      className: 'deal-step-btn m-l-10',
      onClick: handleClickNextSteps,
      disabled,
      type: 'primary',
    }}>
      <span><FastForwardOutlined className="m-r-5" />{label}</span>
    </Button>
  );
};
