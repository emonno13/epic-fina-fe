/* eslint-disable @next/next/no-img-element */

import { isEmpty } from 'lodash';
import { useFetchReferralUser } from '@components/features/organizations/users/hooks';
import { useCurrentUser } from '@lib/providers/auth';
import { AvatarDefault } from './constant';
import VerifyAccountProfile from '../verify-account';

import './styles.module.scss';

const ProfileMyNetworkTopReferrer = () => {
  const currentUser: any = useCurrentUser();
  const { referralCode } = currentUser;
  const referralUser = useFetchReferralUser(referralCode);

  const renderAvatar = (avatar) => {
    return avatar ? avatar : AvatarDefault;
  };

  return (
    <div className="profile-my-network-top-referrer">
      <div className="profile-my-network-top-referrer-left">
        <img
          src={
            !isEmpty(referralUser)
              ? renderAvatar(referralUser?.avatar)
              : '/assets/images/fina_title_bar_icon.png'
          }
          alt="avatar"
        />
        <div className="profile-my-network-top-referrer-info">
          <h4 className="profile-my-network-top-referrer-info-name">
            {!isEmpty(referralUser) ? referralUser?.fullName : 'Fina'}
          </h4>
          <div className="profile-my-network-top-referrer-info-code">
            ID: {!isEmpty(referralUser) ? referralUser?.code : 'Fina'}
          </div>
        </div>
      </div>

      {!isEmpty(referralUser) && (
        <div className="profile-my-network-top-referrer-right">
          <VerifyAccountProfile user={referralUser} />
          {/* <div className="profile-my-network-top-referrer-info-transactions">3 giao dịch</div> */}
        </div>
      )}
    </div>
  );
};

export default ProfileMyNetworkTopReferrer;
