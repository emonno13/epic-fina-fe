import React from 'react';
import { useIsTablet } from '../../../../../lib/hooks/use-media';
import BenefitItem from '../components/home/benefit-item';
import {
  BenefitMobileSvg,
  BenefitSvg, CareerPathMobileSvg,
  CareerPathSvg, HealthMobileSvg,
  HealthSvg,
  ProEnvironmentMobileSvg,
  ProEnvironmentSvg, SalaryMobileSvg,
  SalarySvg, TrainingMobileSvg,
  TrainingSvg,
} from '../../../../../icons';
import { useHTranslation } from '../../../../../lib/i18n';

import './benefit.scss';

const Benefit = React.memo(()=>{
  const { t } = useHTranslation('recruit');
  const isTablet = useIsTablet();
  return (
    <div className="benefit__container">
      <div className="benefit__title">{t('home.benefit')}</div>
      {
        !isTablet ?
          <div className="benefit__body">
            <div className="benefit__web">
              <BenefitItem Icon={SalarySvg} title={t('home.salary')} onClick={()=>{}} />
              <BenefitItem Icon={CareerPathSvg} title={t('home.careerPath')} onClick={()=>{}} />
              <BenefitItem Icon={ProEnvironmentSvg} title={t('home.proEnvironment')} onClick={()=>{}} />
            </div>
            <div className="benefit__web">
              <BenefitItem Icon={BenefitSvg} title={t('home.comprehensiveBenefits')} onClick={()=>{}} />
              <BenefitItem Icon={TrainingSvg} title={t('home.training')} onClick={()=>{}} />
              <BenefitItem Icon={HealthSvg} title={t('home.periodicHealthExamination')} onClick={()=>{}} />
            </div>
          </div>
          :
          <div className="benefit__body">
            <div className="benefit__mobile">
              <BenefitItem Icon={SalaryMobileSvg} title={t('home.salary')} onClick={()=>{}} />
              <BenefitItem Icon={CareerPathMobileSvg} title={t('home.careerPath')} onClick={()=>{}} />
            </div>
            <div className="benefit__mobile">
              <BenefitItem Icon={ProEnvironmentMobileSvg} title={t('home.proEnvironment')} onClick={()=>{}} />
              <BenefitItem Icon={BenefitMobileSvg} title={t('home.comprehensiveBenefits')} onClick={()=>{}} />

            </div>
            <div className="benefit__mobile">
              <BenefitItem Icon={TrainingMobileSvg} title={t('home.training')} onClick={()=>{}} />
              <BenefitItem Icon={HealthMobileSvg} title={t('home.periodicHealthExamination')} onClick={()=>{}} />
            </div>
          </div>
      }
    </div>
  );
});

export default Benefit;
