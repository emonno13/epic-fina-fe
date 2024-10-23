import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { Divider } from 'antd';
import ProfileMyNetworkTop from './my-network-top';
import ProfileMyNetworkReferrers from './referrers';

import './styles.module.scss';

const ProfileMyNetwork = () => {
  const currentUser: any = useCurrentUser();
  const { t } = useHTranslation('common');

  if (!currentUser) return <></>;

  return (
    <div className="profile-my-network">
      <div className="profile-el-wrapper">
        <h2 className="profile-information-title">{t('profile.myNetwork')}</h2>
        <ProfileMyNetworkTop />
        <Divider />
        <ProfileMyNetworkReferrers />
      </div>
    </div>
  );
};

export default ProfileMyNetwork;
