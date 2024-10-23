import { useHTranslation } from '@lib/i18n';
import ExpertDetailReviewsList from './reviews-list';

import './expert-detail-reviews.module.scss';

const ExpertDetailReviews = ({
  isViewAll = true,
  fetchReviews,
  loading,
  reviewsData,
}) => {
  const { t } = useHTranslation('common');
  return (
    <div className="expert-detail-reviews">
      <div className="expert-detail-reviews-container">
        <ExpertDetailReviewsList
          {...{ hasPagination: isViewAll, fetchReviews, loading, reviewsData }}
        />
      </div>
    </div>
  );
};

export default ExpertDetailReviews;
