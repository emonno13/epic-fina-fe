import { Link } from '@components/shared/link';
import RecruitLayoutMenu from '../menu';

import './recruit-footer.module.scss';

const RecruitLayoutFooter = () => {
  return (
    <div className="recruit-footer">
      <div className="recruit-footer__content">
        <Link href="/">
          <img
            {...{
              src: '/assets/images/fina_logo_no_color.png',
            }}
          />
        </Link>
        <div className="recruit-footer__menu">
          <RecruitLayoutMenu root={'footer'} />
        </div>
      </div>
    </div>
  );
};

export default RecruitLayoutFooter;
