import { useHTranslation } from '@lib/i18n';
import ProfileMyNetworkTopReferrer from './my-network-top-referrer';
import ProfileMyNetworkTopUser from './my-network-top-user';

import './styles.module.scss';

const IconReferrer = () => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.85678 0C10.2153 0 12.1426 1.92745 12.1426 4.28591C12.1426 6.64438 10.2153 8.571 7.85678 8.571C5.4983 8.571 3.571 6.64438 3.571 4.28591C3.571 1.92745 5.4983 0 7.85678 0ZM9.28572 10.0001C12.8348 10.0001 15.7139 12.8796 15.7139 16.4287V20H-0.000306129V16.4287C-0.000306129 12.8796 2.87928 10.0001 6.42836 10.0001C6.89292 10.0002 7.23375 10.4367 7.12122 10.8874L5.79087 16.2092L7.85678 18.2752L9.92321 16.2092L8.59235 10.8874C8.47976 10.4365 8.82095 9.99989 9.28572 10.0001Z"
        fill="black"
      />
    </svg>
  );
};

const ProfileMyNetworkTop = () => {
  const { t } = useHTranslation('common');

  return (
    <div className="profile-my-network-top">
      <ProfileMyNetworkTopUser />

      <h2 className="profile-my-network-title-bold">
        <IconReferrer /> {t('profile.referrerBy')}
      </h2>

      <ProfileMyNetworkTopReferrer />
    </div>
  );
};

export default ProfileMyNetworkTop;
