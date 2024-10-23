import { Link } from '@components/shared/link';
import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../../../components/shared/common/language-switcher';
import { ProfileMenu } from '../../../../components/shared/user/profile-menu';
import { useAuth } from '../../../../lib/providers/auth';

import './frontend-default-header.module.scss';

const { Header } = Layout;
export const PageHeader = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation('common');
  return (
    <Header className="_page-default-header">
      <div className="_ui-pdh-left">
        {/*<ul className="my-inline-list">*/}
        {/*  <li><span>+2.000 Tin đăng mới hàng tháng </span></li>*/}
        {/*  <li><span>+33.124 Thành viên Youhomer </span></li>*/}
        {/*  <li><span>+300 Kết nối thành công </span></li>*/}
        {/*</ul>*/}
      </div>
      <div className="_ui-pdh-right">
        <ul className="my-inline-list">
          {/*<li>*/}
          {/*  <Link href="/">*/}
          {/*    <span>Quyền lợi thành viên</span>*/}
          {/*  </Link>*/}
          {/*</li>*/}
          {!isAuthenticated && (
            <li>
              <Link href="/users/login">
                <span>{t('login')}</span>
              </Link>
              <span className="p-l-5 p-r-5">/</span>
              <Link href="/signup/user">
                <span>{t('register')}</span>
              </Link>
            </li>
          )}
          <li>
            <LanguageSwitcher className="header-height" />
          </li>
          <li>{isAuthenticated && <ProfileMenu />}</li>
        </ul>
      </div>
    </Header>
  );
};
