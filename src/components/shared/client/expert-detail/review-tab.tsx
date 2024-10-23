import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { forwardRef, useMemo } from 'react';
import ExpertDetailCounsellingFormSection from './counselling-form';
import ExpertDetailOvertallReview from './overall-review';
import ExpertDetailReviews from './reviews';
import { useExpertDetailReviewsList } from './reviews/reviews-list/hooks';

export const ExpertDetailReviewTab = forwardRef(
  ({ data, ratingStats, fetchRatingStats }: any, ref) => {
    const { t } = useHTranslation('admin-common');
    const { fetchReviews, loading, reviewsData } = useExpertDetailReviewsList({
      userData: data,
    });
    const fullName = useMemo(
      () => ConverterUtils.getFullNameUser(data),
      [data],
    );

    return (
      <>
        <ExpertDetailOvertallReview
          {...{
            title: t('All reviews', { vn: 'Tất cả đánh giá' }),
            description: t(
              `From customers who have bought, borrowed to buy a house with ${fullName}.`,
              {
                vn: `Từ những khách hàng đã mua, vay mua nhà với ${fullName}.`,
              },
            ),
            data,
            fetchReviews,
            ratingStats,
            fetchRatingStats,
          }}
        />
        <ExpertDetailReviews
          {...{ userData: data, fetchReviews, loading, reviewsData }}
        />
        <ExpertDetailCounsellingFormSection {...{ data, ref }} />
      </>
    );
  },
);
