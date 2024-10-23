/* eslint-disable @next/next/no-img-element */
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@lib/utils/mobile';

const LoansIntroduceFooterAppLinks = () => {
  return (
    <div className="client-footer-links-app">
      <h2 className="title-footer">
        Tải App FINA
        <div className="line-header"></div>
      </h2>

      <div className="client-footer-links-app-content">
        <img src="/assets/images/fina-qr-code.png" alt="" width="140" />
        <div>
          <a
            {...{
              className: 'client-footer-links-app-store-link',
              target: '_blank',
              rel: 'noopener',
              href: GOOGLE_PLAY_LINK,
            }}
          >
            <img
              src="/assets/images/client_footer_chplay_image.png"
              height="50"
            />
          </a>
          <a
            {...{
              className: 'client-footer-links-app-store-link',
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
      </div>
    </div>
  );
};

export default LoansIntroduceFooterAppLinks;
