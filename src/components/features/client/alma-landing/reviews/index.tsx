import { useHTranslation } from '@lib/i18n';
import { useRef } from 'react';
import AlmaReviewCarousel from '../common/review-carousel';
import { AlmaReviewsData } from '../constants';
import AlmaReviewsItem from './reviews.item';

const AlmaReviews = () => {
  const { t } = useHTranslation('common');
  const data = AlmaReviewsData(t);
  const carouselRef = useRef<any>();

  return (
    <div className="alma-reviews" id="review">
      <div className="alma-reviews-container">
        <h1 className="alma-reviews__title">
          {t('FEELINGS,', { vn: 'CẢM NHẬN,' })}{' '}
          <span>
            {t('SHARE FROM CUSTOMERS', { vn: 'CHIA SẺ TỪ KHÁCH HÀNG' })}
          </span>
        </h1>
        <p className="alma-reviews__desc">
          <span>9.2</span>
          {t(
            '/10 from 205 reviews from customers who have experienced the service at Alma Resort Cam Ranh',
            {
              vn: '/10 từ 205 đánh giá từ khách hàng đã trải nghiệm dịch vụ tại Alma Resort Cam Ranh',
            },
          )}
        </p>
        <AlmaReviewCarousel ref={carouselRef}>
          {data.map((item, index) => (
            <AlmaReviewsItem
              key={`alma-review-${index}`}
              {...{ ...item, ref: carouselRef }}
            />
          ))}
        </AlmaReviewCarousel>
      </div>
    </div>
  );
};

export default AlmaReviews;
