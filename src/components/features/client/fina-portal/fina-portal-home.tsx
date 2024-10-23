import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import {
  ClientFooterFbIcon,
  ClientFooterInstagramIcon,
  ClientFooterZaloIcon,
} from 'icons';
import { useMemo } from 'react';
import ClientHomeBanner from '../home/client-home-banner';
import { TYPE_FINA_PORTAL, useFinaPortalContext } from './fina-portal-context';
import { FinaLogo, PhoneCallIcon } from './icons';

import './styles.module.scss';

const URL_SOCIAL_NETWORK = [
  {
    icon: <ClientFooterFbIcon />,
    url: 'https://www.facebook.com/finavietnam',
  },
  {
    icon: <ClientFooterZaloIcon />,
    url: 'https://zalo.me/937476885441449805',
  },
  {
    icon: <ClientFooterInstagramIcon />,
    url: 'https://www.instagram.com/fina_taichinh/',
  },
];

const FinaPortalHome = () => {
  const { t } = useHTranslation('common');
  const { banners, setShowForm, showForm } = useFinaPortalContext();
  const showPortalHome = useMemo(() => {
    return [
      TYPE_FINA_PORTAL.HOME,
      TYPE_FINA_PORTAL.INPUT_INFO_CUSTOMER,
    ].includes(showForm);
  }, [showForm]);

  if (!showPortalHome) {
    return <></>;
  }

  return (
    <div className="fina-portal-home">
      <ClientHomeBanner {...{ banners }} />
      <div className="fina-portal-home-content">
        <div className="fina-portal-home-content-wrapper">
          <div
            onClick={() => setShowForm(TYPE_FINA_PORTAL.INPUT_INFO_CUSTOMER)}
            className="fina-portal-home-content-phone"
          >
            <PhoneCallIcon />
          </div>

          <div className="fina-portal-home-content-actions">
            <HButton
              type="primary"
              block
              className="fina-portal-home-content-actions__home-loan"
              onClick={() => setShowForm(TYPE_FINA_PORTAL.COUNSELLING)}
            >
              Tôi muốn tư vấn
            </HButton>
            <HButton
              block
              className="fina-portal-home-content-actions__borrower-introduction"
              onClick={() =>
                setShowForm(TYPE_FINA_PORTAL.BORROWER_INTRODUCTION)
              }
            >
              Tra cứu
            </HButton>
          </div>
        </div>

        <div className="fina-portal-home-content-footer">
          <FinaLogo />
          <div className="fina-portal-home-content-footer-text">
            {URL_SOCIAL_NETWORK?.map((social) => (
              <a
                href={social?.url}
                target="_blank"
                rel="noreferrer"
                key={social?.url}
              >
                {social?.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinaPortalHome;
