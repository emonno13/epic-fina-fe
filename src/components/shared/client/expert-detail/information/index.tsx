import { useMemo } from 'react';
import { getLabelExpertise } from '@components/features/profiles/constanst';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { ExclusiveRealEstateData } from '../constants';

import './expert-detail-information.module.scss';

export const ExpertDetailExclusiveItem = ({ icon, content }) => (
  <div className="expert-detail-information-real-estate-item">
    <div className="expert-detail-information-real-estate-item__icon">
      {icon}
    </div>
    <span className="expert-detail-information-real-estate-item__content">
      {content}
    </span>
  </div>
);

const ExpertDetailInformation = ({ data }) => {
  const { t } = useHTranslation('common');
  const { org, advancedInformation } = data;
  const RealEstateData = ExclusiveRealEstateData({
    address: org?.address || '',
    url: '',
    tel: org?.tels?.[0]?.tel || '',
  });
  const epxertise = useMemo(() => {
    const labelExpertise = getLabelExpertise(t);
    return (
      advancedInformation?.expertise
        ?.map((expertiseTitle) => {
          const existExpertise = labelExpertise.find(
            ({ value }) => value === expertiseTitle,
          );
          return existExpertise?.label || '';
        })
        .join(', ') || ''
    );
  }, [advancedInformation]);
  return (
    <div className="client-expert-detail-container">
      <div className="expert-detail-information">
        <div className="expert-detail-information-about">
          <p className="expert-detail-information-about__title">
            {t('Information about', { vn: 'Thông tin về' })}{' '}
            {ConverterUtils.getFullNameUser(data)}
          </p>
          <p className="expert-detail-information-about__content">
            {advancedInformation?.about}
          </p>
          <p className="expert-detail-information-about__expertise">
            <span>{t('Expertise', { vn: 'Chuyên môn' })}: </span>
            {epxertise}
          </p>
        </div>
        <div className="expert-detail-information-real-estate">
          <h2>{org?.name}</h2>
          {RealEstateData.map((item, index) => (
            <ExpertDetailExclusiveItem
              key={`expert-detail-exclusive-item-${index}`}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailInformation;
