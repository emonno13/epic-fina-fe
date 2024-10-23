import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  IconArrowRight,
  IconCurrentIncome,
} from '../earnings-commissions/constants';
import { TransactionWithTable } from './table';

import './styles.module.scss';
const fundActions = {
  buy: 'BUY',
  sell: 'SELL',
};

const ProfileAccountTransaction = () => {
  const { query } = useRouter();
  const { t } = useHTranslation('admin-common');
  const currentUser: any = useCurrentUser();
  const isMobile = useIsMobile();
  const [tabActive, setTabActive] = useState(fundActions.buy);
  if (!currentUser) return <></>;

  return (
    <div className="profile-information profile-information-transaction">
      {isMobile && (
        <div>
          <IconCurrentIncome />
          <h2 className="profile-information-title">Danh sách giao dịch</h2>
          <IconArrowRight />
        </div>
      )}

      <div className="profile-el-wrapper">
        <h2 className="profile-information-title">Danh sách giao dịch</h2>
        <div className="profile-tabs-list">
          <button
            className={`profile-tabs ${tabActive === fundActions.buy ? 'profile-tabs-active' : ''}`}
            onClick={() => setTabActive(fundActions.buy)}
          >
            {t('Lệnh mua')}
          </button>
          <button
            className={`profile-tabs ${tabActive === fundActions.sell ? 'profile-tabs-active' : ''}`}
            onClick={() => setTabActive(fundActions.sell)}
          >
            {t('Lệnh bán')}
          </button>
        </div>

        {tabActive === fundActions.sell && (
          <TransactionWithTable type={fundActions.sell} />
        )}
        {tabActive === fundActions.buy && (
          <TransactionWithTable type={fundActions.buy} />
        )}
      </div>
    </div>
  );
};

export default ProfileAccountTransaction;
