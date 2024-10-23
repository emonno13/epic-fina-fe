import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useState } from 'react';
import ProfileAccountDealInsurance from './deal-insurance';
import ProfileAccountDealLoan from './deal-loan';

import './styles.module.scss';

const tabs = {
  loan: 'loan',
  insurance: 'insurance',
};

const ProfileAccountDeal = () => {
  const isMobile = useIsMobile();
  const { t } = useHTranslation('admin-common');
  const [tabActive, setTabActive] = useState(tabs.loan);
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <div className="profile-information profile-information-deal">
      <div className="profile-el-wrapper">
        <h2
          className="profile-information-title"
          style={openDetail ? { display: 'none' } : {}}
        >
          Quản lý hồ sơ
        </h2>
        <div
          className="profile-tabs-list"
          style={openDetail ? { display: 'none' } : {}}
        >
          <button
            className={`profile-tabs ${tabActive === tabs.loan ? 'profile-tabs-active' : ''}`}
            onClick={() => setTabActive(tabs.loan)}
          >
            {t('Hồ sơ vay')}
          </button>
          <button
            className={`profile-tabs ${tabActive === tabs.insurance ? 'profile-tabs-active' : ''}`}
            onClick={() => setTabActive(tabs.insurance)}
          >
            {t('Hồ bảo hiểm')}
          </button>
        </div>

        {tabActive === tabs.loan && (
          <>
            <ProfileAccountDealLoan {...{ openDetail, setOpenDetail }} />
          </>
        )}
        {tabActive === tabs.insurance && <ProfileAccountDealInsurance />}
      </div>
    </div>
  );
};

export default ProfileAccountDeal;
