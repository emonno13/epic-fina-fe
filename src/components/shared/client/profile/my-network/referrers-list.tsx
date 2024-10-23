/* eslint-disable @next/next/no-img-element */
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { HTable } from '@schema-form/features';
import VerifyAccountProfile from '../verify-account';
import { AvatarDefault, ReferrersSchema } from './constant';

import './styles.module.scss';

const ProfileMyNetworkReferrersList = ({ dataSource }) => {
  const isMobile = useIsMobile();
  const { t } = useHTranslation('common');

  return (
    <div className="profile-my-network-referrers-list">
      {!isMobile ? (
        <HTable
          schema={ReferrersSchema}
          dataSource={dataSource}
          pagination={false}
        />
      ) : (
        <>
          {dataSource?.map((user) => (
            <div
              className="profile-my-network-referrers-list-item"
              key={user?.id}
            >
              <div className="profile-my-network-referrers-list-left">
                <img src={user?.avatar || AvatarDefault} alt="avatar" />
                <div>
                  <div className="profile-my-network-referrers-list-name">
                    {user?.fullName}
                  </div>
                  <div className="profile-my-network-referrers-list-code">
                    ID: {user?.code}
                  </div>
                  <div className="profile-my-network-referrers-list-date">
                    {ConverterUtils.fullDatetimeConverter(user?.createdAt)}
                  </div>
                  <div className="profile-my-network-referrers-list-verified">
                    <VerifyAccountProfile user={user} />
                  </div>
                </div>
              </div>

              <div className="profile-my-network-referrers-list-right">
                <div className="profile-my-network-referrers-list-children">
                  {user?.children?.length || 0} {t('profile.customer')}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProfileMyNetworkReferrersList;
