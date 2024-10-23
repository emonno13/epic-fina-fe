import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@lib/utils/mobile';

import '../fina-agent-client.module.scss';

const FinaFooterAppLinks = () => {
  return (
    <div className="client-footer-app-links">
      <div className="client-footer-app-links__qr">
        <img src="/assets/images/app-links-qr-image.jpeg" alt="" width="140" />
      </div>
      <a
        {...{
          className: 'client-footer-app-links__store-link',
          target: '_blank',
          rel: 'noopener',
          href: GOOGLE_PLAY_LINK,
        }}
      >
        <img src="/assets/images/client_footer_chplay_image.png" height="50" />
      </a>
      <a
        {...{
          className: 'client-footer-app-links__store-link',
          target: '_blank',
          rel: 'noopener',
          href: APP_STORE_LINK,
        }}
      >
        <img
          src="/assets/images/client_footer_app_store_image.png"
          height="50"
        />
      </a>
    </div>
  );
};

export default FinaFooterAppLinks;
