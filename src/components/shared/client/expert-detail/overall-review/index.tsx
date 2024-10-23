import { useHTranslation } from '@lib/i18n';
import { ReviewModalButton } from '../../review-modal/review-modal-button';
import ExperDetailPencilIcon from '../icons/expert-detail.pencil-icon';
import ExpertDetailOvertallReviewSummary from './summary';

import './expert-detail-overall-review.module.scss';

const ExpertDetailOvertallReview = ({
  title,
  description,
  data,
  fetchReviews,
  ratingStats,
  fetchRatingStats,
}) => {
  const { t } = useHTranslation('common');

  return (
    <div className="client-expert-detail-container">
      <div className="expert-detail-overall-review">
        <h2 className="expert-detail-overall-review__title">{title}</h2>
        <p className="expert-detail-overall-review__desc">{description}</p>
        <ExpertDetailOvertallReviewSummary RatesData={ratingStats} />
        <ReviewModalButton
          {...{
            icon: <ExperDetailPencilIcon />,
            reviewModalProps: {
              reviewUser: data,
              formProps: {
                onGotSuccess: () => {
                  fetchRatingStats(data.id);
                  fetchReviews(1);
                },
              },
            },
          }}
        >
          {t('Write review', { vn: 'Viết đánh giá' })}
        </ReviewModalButton>
      </div>
    </div>
  );
};

export default ExpertDetailOvertallReview;
