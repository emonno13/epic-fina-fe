import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { forwardRef, useMemo } from 'react';
import ExpertDetailCounsellingFormSection from './counselling-form';
import ExpertDetailInformation from './information';
import ExpertDetailMarketInCharge from './market-in-charge';
import ExpertDetailOvertallReview from './overall-review';
import ExpertDetailReviews from './reviews';
import { useExpertDetailReviewsList } from './reviews/reviews-list/hooks';

export const ExpertDetailOverallTab = forwardRef(
  ({ data, onTabChange, ratingStats, fetchRatingStats }: any, ref) => {
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
        <ExpertDetailInformation {...{ data }} />
        <ExpertDetailMarketInCharge {...{ data }} />
        <ExpertDetailOvertallReview
          {...{
            title: t('Newest reviews', { vn: 'Đánh giá mới nhất' }),
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
          {...{ isViewAll: false, fetchReviews, loading, reviewsData }}
        />
        <Button
          {...{
            onClick: () => onTabChange('reviews'),
            className: 'expert-detail__see-all-reviews-btn',
          }}
        >
          {t('See all reviews', { vn: 'Xem tất cả đánh giá' })}
        </Button>
        <ExpertDetailCounsellingFormSection {...{ data, ref }} />
      </>
    );
  },
);
