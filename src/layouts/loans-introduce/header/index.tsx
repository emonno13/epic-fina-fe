import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ClientHeaderMenuMobileButton from '../../admin/lightly/client/header/header.menu-mobile-button';
import LoansIntroduceHorizontalMenu from './loans-introduce-horizontal-menu';
import LoansIntroduceHeaderMenu from './menu';

import './header.module.scss';

const LoansIntroduceHeader = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();
  const { locale } = useRouter();
  const [visible, setVisible] = useState(false);

  const onVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="client-loans-introduce-header loans-introduce-container">
      <div className="client-loans-introduce-header-logos">
        <Link href="/">
          <div className="logo-wrapper fina">
            <img src="/assets/images/fina_logo.png" />
          </div>
        </Link>
      </div>

      <div className="client-loans-introduce-header__right">
        <div className="client-loans-introduce-header__verticalMenu">
          <ClientHeaderMenuMobileButton
            {...{
              visible,
              onClick: onVisible,
            }}
          />
        </div>
        <div className="client-loans-introduce-header__horizontalMenu">
          <LoansIntroduceHorizontalMenu />
        </div>
        {isMobile && visible && (
          <>
            <LoansIntroduceHeaderMenu {...{ onVisible }} />
          </>
        )}

        {!isMobile && (
          <Button
            className="client-loans-introduce-header__right__register-btn"
            type="link"
            href={`/${locale}/loans-introduce#register`}
          >
            {t('Register', { vn: 'Đăng ký' })}
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoansIntroduceHeader;
