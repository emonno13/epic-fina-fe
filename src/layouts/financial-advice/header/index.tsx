import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ClientHeaderMenuMobileButton from '../../admin/lightly/client/header/header.menu-mobile-button';
import FinancialAdviceHorizontalMenu from './financial-advice-horizontal-menu';
import FinancialAdviceHeaderMenu from './menu';

import './header.module.scss';

const FinancialAdviceHeader = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();
  const { locale } = useRouter();
  const [visible, setVisible] = useState(false);

  const onVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="client-financial-advice-header financial-advice-container">
      <div className="client-financial-advice-header-logos">
        <Link href="/">
          <div className="logo-wrapper fina">
            <img src="/assets/images/fina_logo.png" />
          </div>
        </Link>
      </div>

      <div className="client-financial-advice-header__right">
        <div className="client-financial-advice-header__verticalMenu">
          <ClientHeaderMenuMobileButton
            {...{
              visible,
              onClick: onVisible,
            }}
          />
        </div>
        <div className="client-financial-advice-header__horizontalMenu">
          <FinancialAdviceHorizontalMenu />
        </div>
        {isMobile && visible && (
          <>
            <FinancialAdviceHeaderMenu {...{ onVisible }} />
          </>
        )}

        {!isMobile && (
          <Button
            className="client-financial-advice-header__right__register-btn"
            type="link"
            href={`/${locale}/financial-advice#register`}
          >
            {t('Register', { vn: 'Đăng ký' })}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FinancialAdviceHeader;
