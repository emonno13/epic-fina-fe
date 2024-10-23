
import ProfileDashboardMenu from './menu';
import ProfileDashboardStatistics from './statistics';

import './styles.module.scss';

const ProfileDashboard = () => {
  return (
    <div className="profile-dashboard">
      <div className="profile-el-wrapper">
        <h2 className="profile-information-title">Dashboard</h2>
        <ProfileDashboardStatistics />
        <ProfileDashboardMenu />
      </div>
    </div>
  );
};

export default ProfileDashboard;
