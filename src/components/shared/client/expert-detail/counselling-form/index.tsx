import { forwardRef } from 'react';
import ExpertDetailCounsellingForm from './counselling-form';
import CounsellingFormDescription from './couselling-form-description';

import './expert-detail-counselling-form-section.module.scss';

const ExpertDetailCounsellingFormSection = forwardRef((props: any, ref: any) => {
  const { data } = props;
  return (
    <div className="client-expert-detail-container">
      <div className="expert-detail-counselling-form-section">
        <div {...{
          ref,
          className: 'expert-detail-counselling-form-section__anchor',
          id: 'counselling-form',
        }} />
        <CounsellingFormDescription {...{ data }} />
        <ExpertDetailCounsellingForm />
      </div>
    </div>
  );
});


export default ExpertDetailCounsellingFormSection;
