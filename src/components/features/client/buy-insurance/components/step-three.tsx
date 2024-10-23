import React from 'react';
import { useTranslation } from 'react-i18next';

export const StepThree = ({ link }) => {
  const { t } = useTranslation('common');

  return (
    <div className="buy-insurance-page__step-three">
      <iframe src={link} style={{ width: '100%', height: '100%' }}/>
    </div>
  );
};

export default StepThree;