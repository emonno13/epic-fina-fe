import React from 'react';
import JobOpportunitiesItem from '../components/home/job-opportunities-item';
import { ArrowRightSvg, DesignerSvg, EmployeeSvg, MarketingSvg, SaleSvg } from '../../../../../icons';
import { useHTranslation } from '../../../../../lib/i18n';

import './career-opportunities.scss';

const CareerOpportunities = React.memo(()=> {
  const { t } = useHTranslation('recruit');
  return (
    <div className="career-opportunities__container">
      <div className="career-opportunities__title">{t('home.jopOpportunities')}</div>
      <div className="career-opportunities__body">
        <div className="career-opportunities__item">
          <JobOpportunitiesItem Icon={SaleSvg} title={t('home.sale')} onClick={()=>{}} />
          <JobOpportunitiesItem Icon={EmployeeSvg} title={t('home.employee')} onClick={()=>{}} />
        </div>
        <div className="career-opportunities__item">
          <JobOpportunitiesItem Icon={MarketingSvg} title={t('home.marketing')} onClick={()=>{}} />
          <JobOpportunitiesItem Icon={DesignerSvg} title={t('home.design')} onClick={()=>{}} />
        </div>
      </div>
      <div className="career-opportunities__moreContainer">
        <div className="career-opportunities__more">
          {t('home.more')}
          <ArrowRightSvg />
        </div>
      </div>

    </div>
  );
});

export default CareerOpportunities;
