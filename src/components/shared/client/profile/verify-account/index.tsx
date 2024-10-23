import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { InfoBlueIcon } from 'icons/rsvgs/info-blue';
import { InfoOrangeIcon } from 'icons/rsvgs/info-orange';
import { isEmpty } from 'lodash';

import './styles.modules.scss';

const VerifyAccountProfile = ({ user }) => {
  const currentUser: any = useCurrentUser();
  const isVerifyAccount = isEmpty(
    user?.identification || currentUser?.identification,
  );
  const { t } = useHTranslation('common');

  if (!user) return <></>;

  return (
    <div
      className={`verify-account ${isVerifyAccount ? 'no-verify-account' : 'verifying-account'}`}
    >
      {isVerifyAccount ? (
        <>
          <InfoOrangeIcon />
          &nbsp;{t('profile.notVerified')}
        </>
      ) : (
        <>
          <InfoBlueIcon /> &nbsp;{t('Đang xác thực')}
        </>
      )}
    </div>
  );
};

export default VerifyAccountProfile;
