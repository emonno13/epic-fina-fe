import { IconComment, IconPhone } from 'icons';

import './styles.module.scss';

const SupportButton = () => {
  return (
    <div className="support-button-wrapper">
      <input id="support-button" className="support-button" type="checkbox" />
      <label htmlFor="support-button">
        <IconComment />
      </label>

      <div className="facebook-action">
        <div id="fb-root"></div>
        <div id="fb-customer-chat" className="fb-customerchat"></div>
      </div>
      <div className="zalo-action">
        <a href={'https://zalo.me/937476885441449805'} target="_blank" rel="noopener noreferrer">
					Zalo
        </a>
      </div>
      <div className="phone-action">
        <a href={'tel:0857498668'} target="_blank" rel="noopener noreferrer">
          <IconPhone />
        </a>
      </div>
    </div>
  );
};

export default SupportButton;
