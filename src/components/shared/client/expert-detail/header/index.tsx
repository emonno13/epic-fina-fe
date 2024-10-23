import ExpertDetailHeaderContact from './header-contact';
import ExpertDetailHeaderInfo from './header-info';

import './expert-detail-header.module.scss';

const ExpertDetailHeader = ({ data, onCreateRequest, ratingStats }) => {
  return (
    <div className="client-expert-detail-container">
      <div className="expert-detail-header">
        <ExpertDetailHeaderInfo {...{ data, ratingStats }} />
        <ExpertDetailHeaderContact {...{ data, onCreateRequest }} />
      </div>
    </div>
  );
};

export default ExpertDetailHeader;
