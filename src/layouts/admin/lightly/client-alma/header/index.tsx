import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import ClientAlmaHeaderLogos from './header-logos';
import ClientAlmaHeaderMenu from './header-menu';

const ClientAlmaHeader = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();
  const { locale } = useRouter();
  return (
    <div className="client-alma-header alma-container">
      <ClientAlmaHeaderLogos />
      <div className="client-alma-header-right">
        {!isMobile && <ClientAlmaHeaderMenu />}
        <Button
          className="client-alma-header-right__register-btn"
          type="link"
          href={`/${locale}/alma-landing-page#register-now`}
        >
          {t('Register', { vn: 'Đăng ký ngay' })}
        </Button>
      </div>
    </div>
  );
};

export default ClientAlmaHeader;
