import { UpCircleOutlined } from '@ant-design/icons';
import { MessageUtils } from '@lib/utils/message';
import { Popover } from 'antd';
import { MESSAGE_TYPE } from 'constants/mobile-app';
import { useEffect, useState } from 'react';

import './contact-menu-item.module.scss';

const ContactMenuItem = () => {
  const [visible, setVisible] = useState(false);

  const onMessengerClick = () => {
    MessageUtils.postMessageToWebview(
      MESSAGE_TYPE.OPEN_OUTSIDE_BROWSER,
      'https://m.me/101999141463247',
    );
    setVisible(false);
  };

  useEffect(() => {
    const closePopover = () => {
      setVisible(false);
    };
    window.addEventListener('scroll', closePopover);
    return () => {
      window.removeEventListener('scroll', closePopover);
    };
  }, []);

  return (
    <Popover
      overlayClassName="contact-menu-item-popover"
      trigger="click"
      content={
        <div>
          <img
            width="48"
            height="48"
            src="/assets/images/icons/ic_messenger.svg"
            onClick={onMessengerClick}
          />
        </div>
      }
      visible={visible}
    >
      <UpCircleOutlined
        onClick={() => setVisible(!visible)}
        className="contact-menu-item-icon"
      />
    </Popover>
  );
};

export default ContactMenuItem;
