import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ClientHeaderMenuMobileButton from '../../admin/lightly/client/header/header.menu-mobile-button';
import LogoFina from '../icons/logo-fina';
import FinaAgentHorizontalMenu from './fina-horizontal-menu';
import FinaAgentHeaderMenu from './menu';

import './header.module.scss';

const ClientFinaAgentHeader = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();
  const { locale } = useRouter();
  const [visible, setVisible] = useState(false);
  const onVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="client-fina-agent-header fina-agent-container">
      <div className="client-fina-agent-header-logos">
        <Link href="/">
          <div className="logo-wrapper fina">
            <LogoFina />
          </div>
        </Link>
      </div>

      <div className="client-fina-agent-header__right">
        <div className="client-fina-agent-header__verticalMenu">
          <ClientHeaderMenuMobileButton
            {...{
              visible,
              onClick: onVisible,
            }}
          />
        </div>
        <div className="client-fina-agent-header__horizontalMenu">
          <FinaAgentHorizontalMenu />
        </div>
        {isMobile && visible && <FinaAgentHeaderMenu {...{ onVisible }} />}

        {!isMobile && (
          <Button
            className="client-fina-agent-header__right__register-btn"
            type="link"
            href={`/${locale}/fina-agent#register-now`}
          >
            {t('Register', { vn: 'Đăng ký ngay' })}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClientFinaAgentHeader;
