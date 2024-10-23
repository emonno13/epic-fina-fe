/* eslint-disable @next/next/no-img-element */

import HResponsiveImage from '@components/shared/common/h-responsive-image/h-responsive-image';
import { Link } from '@components/shared/link';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';

const ClientLogo = () => {
  const { t } = useHTranslation('common');
  return (
    <Link href="/">
      <div className="client-logo">
        <div className="client-logo__image">
          <img src="/assets/images/fina_logo.png" />
          <span className="client-logo__image__txt">
            <span className="client-logo__image__txt__top">&nbsp;</span>
            <span className="client-logo__image__txt__btm">.com.vn</span>
          </span>
        </div>
        <div className="client-logo__top">
          {t('Together with you to build a home', {
            vn: 'Cùng bạn tạo dựng mái ấm',
          })}
        </div>
      </div>
    </Link>
  );
};

export default ClientLogo;

export const SmallClientLogo = () => {
  const isMobile = useIsMobile();

  return (
    <Link href="/">
      <HResponsiveImage
        src={'/assets/images/fina-logo-small.png'}
        width={isMobile ? 182 : 245}
        height={isMobile ? 48 : 65}
        alt={'fina logo small'}
        priority
      />
    </Link>
  );
};
