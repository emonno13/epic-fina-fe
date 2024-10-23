import { useIsMobile } from '@lib/hooks/use-media';
import { useRouter } from 'next/router';
import ProfileInfoDetail from './profile-info-detail';
import ProfileInfoEdit from './profile-info-edit';
import ProfileInformationTop from './profile-info-top';

import './styles.module.scss';

const ProfileAccountInformation = () => {
  const { query } = useRouter();
  const isMobile = useIsMobile();

  return (
    <div className="profile-information profile-account-information">
      {isMobile && (
        <h2 className="profile-information-title">Quản lý tài khoản</h2>
      )}
      <div className="profile-el-wrapper">
        <ProfileInformationTop />
      </div>

      <br />

      {query.screen && query.screen === 'edit' ? (
        <ProfileInfoEdit />
      ) : (
        <ProfileInfoDetail />
      )}
    </div>
  );
};

export default ProfileAccountInformation;
