import { Link } from '@components/shared/link';
import { useIsMobile } from '../../../lib/hooks/use-media';
import ClientHeaderMenuMobileButton from '../../admin/lightly/client/header/header.menu-mobile-button';
import RecruitLayoutMenu from '../menu';
import HeaderRecruitMenu from './header-menu';

import './recruit-header.module.scss';

const RecruitLayoutHeader = ({ visible, onVisible }) => {
  const isMobile = useIsMobile();
  return (
    <div className="recruit-header">
      <div className="recruit-header__content">
        <div className="ui-lightly-client-header__left-content">
          <Link href="/">
            <img
              {...{
                src: '/assets/images/fina_logo.png',
              }}
            />
          </Link>
          <div style={{ flex: 'auto' }} />
          {isMobile ? (
            <ClientHeaderMenuMobileButton
              {...{
                visible,
                onClick: onVisible,
              }}
            />
          ) : (
            <RecruitLayoutMenu root={'header'} />
          )}
          {isMobile && visible && <HeaderRecruitMenu {...{ onVisible }} />}
        </div>
      </div>
    </div>
  );
};

export default RecruitLayoutHeader;
