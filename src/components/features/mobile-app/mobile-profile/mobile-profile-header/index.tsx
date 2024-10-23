import { UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { USER_TYPES_LABEL_MAPPING } from '@components/shared/user/constants';
import { useCurrentUser } from '@lib/providers/auth';

import './mobile-profile-header.scss';

const MobileProfileHeader = () => {
  const currentUser = useCurrentUser();
  const userType = USER_TYPES_LABEL_MAPPING[currentUser.type];
  return (
    <div className="mobile-profile-header">
      <div className="mobile-profile-header__avatar">
        <Avatar size={90} icon={<UserOutlined />} />
      </div>
      <div className="mobile-profile-header__name">{currentUser.fullName}</div>
      <div className="mobile-profile__user-type">{userType}</div>
    </div>
  );
};

export default MobileProfileHeader;
