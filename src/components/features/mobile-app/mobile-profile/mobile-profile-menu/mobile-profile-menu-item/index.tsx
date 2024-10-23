import { rgbDataURL } from '@components/shared/atom/rgb';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import Image from 'next/image';

import './mobile-profile-menu-item.scss';

interface MobileProfileMenuItemProps {
  iconSrc?: string;
  label: string;
  icon?: any;
  onClick?: any;
  link?: string;
}

const MobileProfileMenuItem = ({
  iconSrc = '',
  label,
  icon = null,
  link,
  onClick,
  ...rest
}: MobileProfileMenuItemProps) => {
  const onMenuClick = async () => {
    if (onClick) {
      onClick();
      return;
    }
    if (link) {
      await RouteUtils.redirect(link);
    }
  };
  return (
    <div {...rest} onClick={onMenuClick} className="mobile-profile-menu-item">
      {icon || (
        <Image
          placeholder="blur"
          blurDataURL={rgbDataURL(220, 220, 220)}
          src={iconSrc}
          width="24px"
          height="24px"
        />
      )}
      <span className="mobile-profile-menu-item__label">{label}</span>
    </div>
  );
};

export default MobileProfileMenuItem;
