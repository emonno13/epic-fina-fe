import { useIsMobile } from '@lib/hooks/use-media';
import { Affix } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import { RoundCloseIcon } from 'icons/rsvgs/round-close';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useState } from 'react';
import Sticky from 'react-sticky-el';
import ClientFooter from './footer';
import ClientHeader from './header';
import SupportButton from './support-button';
import ClientToppedHeader from './topped-header';

import './lightly-client.module.scss';

const View = ({ children }) => {
  const [menuMobilevisible, setMenuMobileVisible] = useState(false);
  const [isShowPopupLearn, setIsShowPopupLearn] = useState(false);
  const { locale } = useRouter();
  const router = useRouter();

  const onToggleMobileMenuVisible = () => {
    setMenuMobileVisible(!menuMobilevisible);
  };
  const isMobile = useIsMobile();

  return (
    <Layout className="layout-client">
      <ClientToppedHeader />
      {!isMobile && (
        <Sticky stickyStyle={{ zIndex: 10 }} scrollElement=".height100percent">
          <ClientHeader
            {...{
              visible: menuMobilevisible,
              onVisible: onToggleMobileMenuVisible,
            }}
          />
        </Sticky>
      )}
      {isMobile && (
        <Affix className="client-header-affix" offsetTop={10}>
          <ClientHeader
            {...{
              visible: menuMobilevisible,
              onVisible: onToggleMobileMenuVisible,
            }}
          />
        </Affix>
      )}

      {isShowPopupLearn && (
        <Affix offsetTop={isMobile ? 400 : 500} className="popup-learn-first">
          <div
            className="popup-learn-first-content"
            onClick={() => router.push(`/${locale}/loans-introduce`)}
          >
            <span
              onClick={(e) => {
                e?.preventDefault();
                e?.stopPropagation();
                setIsShowPopupLearn(false);
              }}
            >
              <RoundCloseIcon />
            </span>
          </div>
        </Affix>
      )}

      <Content
        style={{ opacity: menuMobilevisible ? 0 : 1 }}
        className="ui-lightly-client-content"
      >
        {children}
      </Content>
      <ClientFooter />

      <SupportButton />
      <Script
        id="facebook-chat"
        dangerouslySetInnerHTML={{
          __html: `
				var chatbox = document.getElementById('fb-customer-chat');
				chatbox.setAttribute("page_id", "101999141463247");
				chatbox.setAttribute("attribution", "biz_inbox");
				window.fbAsyncInit = function() {
				FB.init({
					xfbml            : true,
					version          : 'v15.0'
				});
				};

				(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
				fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			`,
        }}
      />
    </Layout>
  );
};

export default View;
