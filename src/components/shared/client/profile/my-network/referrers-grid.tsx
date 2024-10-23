/* eslint-disable @next/next/no-img-element */
import { AvatarDefault } from './constant';
import VerifyAccountProfile from '../verify-account';

import './styles.module.scss';

const ProfileMyNetworkReferrersGrid = ({ dataSource }) => {

  return (
    <div className="profile-my-network-referrers-grid">
      {dataSource?.map(user => (
        <div className="profile-my-network-referrers-grid-item" key={user?.id}>
          <img src={user?.avatar || AvatarDefault} alt="avatar" />
          <div className="profile-my-network-referrers-grid-name">{user?.fullName}</div>
          <div className="profile-my-network-referrers-grid-code">ID: {user?.code}</div>
          <div className="profile-my-network-referrers-grid-verified">
            <VerifyAccountProfile user={user} />
          </div>
          {user?.children?.length > 0 && <div className="profile-my-network-referrers-grid-children">{user?.children?.length} khách</div>}
        </div>
      ))}
    </div>
  );
};

export default ProfileMyNetworkReferrersGrid;

