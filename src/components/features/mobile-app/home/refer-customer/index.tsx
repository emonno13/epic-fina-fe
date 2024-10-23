import { Button } from 'antd';
import { useMobile } from '../../hooks/login-drawer-hooks';
import { MOBILE_TASK_TYPE } from '../../mobile-create-task/constants';

import './refer-customer.module.scss';

const ReferCustomer = ({ menuData }) => {
  const { createTaskButtonText, referCustomerButtonText, productType } = menuData;
  const { setCreateTaskVisible, setTaskExtraValues } = useMobile();

  const onButtonClick = (taskType, taskSubject) => {
    setCreateTaskVisible(true);
    setTaskExtraValues({
      type: taskType,
      subject: taskSubject,
      productType,
    });
  };

  return (
    <div className="refer-customer">
      <Button
        {...{
          className: 'refer-customer__want-loan-button',
          icon: <img src="/assets/images/icons/ic_want-loan.svg" />,
          onClick: () =>
            onButtonClick(
              MOBILE_TASK_TYPE.WANT_TO_BUY,
              createTaskButtonText,
            ),
        }}
      >
        {createTaskButtonText}
      </Button>
      <Button
        {...{
          className: 'refer-customer__refer-loan-button',
          icon: <img src="/assets/images/icons/ic_refer-loan.svg" />,
          onClick: () =>
            onButtonClick(
              MOBILE_TASK_TYPE.INTRODUCE_BUYER,
              referCustomerButtonText,
            ),
        }}
      >
        {referCustomerButtonText}
      </Button>
    </div>
  );
};

export default ReferCustomer;
