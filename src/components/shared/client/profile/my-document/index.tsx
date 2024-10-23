import ProfileDocument from '@components/features/profiles/profile-document';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';

import './styles.module.scss';

const ProfileMyNetwork = () => {
  const currentUser: any = useCurrentUser();
  const { t } = useHTranslation('common');

  if (!currentUser) return <></>;

  return (
    <div className="profile-my-network">
      <div className="profile-el-wrapper">
        <h2 className="profile-information-title">{t('profile.myDocument')}</h2>
        <ProfileDocument />
      </div>
    </div>
  );
};

export default ProfileMyNetwork;
