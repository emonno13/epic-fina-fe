import React from 'react';
import RecruitmentProcessItem from '../components/home/recruitment-process-item';
import { ContractSvg, InterviewSvg, ResultReceivedSvg, ApplySvg } from '../../../../../icons';
import { useHTranslation } from '../../../../../lib/i18n';

import './recruitment-process.scss';

const RecruitmentProcess = React.memo(()=> {
  const { t } = useHTranslation('recruit');
  return (
    <div className="recruitment-process__container">
      <div className="recruitment-process__title">{t('home.recruitmentProcess')}</div>
      <div className="recruitment-process__body">
        <RecruitmentProcessItem Icon={ApplySvg} position={'01'} title={t('home.apply')} content={t('home.applyContent')} />
        <RecruitmentProcessItem Icon={InterviewSvg} position={'02'} title={t('home.interview')} content={t('home.interviewContent')} />
        <RecruitmentProcessItem Icon={ResultReceivedSvg} position={'03'} title={t('home.resultReceived')} content={t('home.resultReceivedContent')} />
        <RecruitmentProcessItem Icon={ContractSvg} position={'04'} title={t('home.contract')} content={t('home.contractContent')} />
        <div className="recruitment-process__dashed"/>
      </div>
    </div>
  );
});

export default RecruitmentProcess;
