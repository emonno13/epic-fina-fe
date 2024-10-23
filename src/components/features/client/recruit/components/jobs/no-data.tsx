import React from 'react';
import { NoDataSvg } from '../../icons';
import { useHTranslation } from '../../../../../../lib/i18n';

import './no-data.module.scss';

const NoData = React.memo(()=> {
  const { t } = useHTranslation('recruit');
  return (
    <div className="no-data__container">
      <NoDataSvg />
      <div>
        <span className="no-data__sorry">{t('jobs.sorry')}&nbsp;</span>
        <span className="no-data__no-job">{t('jobs.noJobFounded')}</span>
      </div>
      <p className="no-data__try-again">{t('jobs.tryAgain')}</p>
    </div>
  );
});

export default NoData;

