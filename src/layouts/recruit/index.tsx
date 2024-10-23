import cls from 'classnames';
import { useState } from 'react';
import RecruitLayoutFooter from './footer';
import RecruitLayoutHeader from './header';

const RecruitLayout = ({ children, style }) => {
  const [menuMobileVisible, setMenuMobileVisible] = useState(false);
  const onToggleMobileMenuVisible = () => {
    setMenuMobileVisible(!menuMobileVisible);
  };
  return (
    <div
      className={cls('recruit-layout')}
      style={style}
    >
      <RecruitLayoutHeader {...{ visible: menuMobileVisible, onVisible: onToggleMobileMenuVisible }}/>
      <div className="recruit-layout__children">
        {children}
      </div>
      <RecruitLayoutFooter />
    </div>
  );
};

export default RecruitLayout;
