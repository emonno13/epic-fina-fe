import { VnFlagIcon } from '@icons';
import { useHTranslation } from '@lib/i18n';
import React from 'react';
import AlmaImageCarouselLeftArrowIcon from '../icons/alma-image-carousel-left-arrow-icon';
import AlmaImageCarouselRightArrowIcon from '../icons/alma-image-carousel-right-arrow-icon';

const AlmaReviewsItem = React.forwardRef((props: any, ref: any) => {
  const { customerName, rate, review, imageName, shortReview } = props;
  const { t } = useHTranslation('common');
  const handleNext = () => {
    ref?.current?.next();
  };
  const handlePrev = () => {
    ref?.current?.prev();
  };
  return (
    <div className="alma-reviews-item">
      <div className="alma-reviews-item__image">
        <img src={`/assets/images/${imageName}`} />
      </div>
      <div className="alma-reviews-item__review-container">
        <div
          className="alma-reviews-item__review-container-btn next"
          onClick={handleNext}
        >
          <AlmaImageCarouselRightArrowIcon />
        </div>
        <div
          className="alma-reviews-item__review-container-btn prev"
          onClick={handlePrev}
        >
          <AlmaImageCarouselLeftArrowIcon />
        </div>
        <h1 className="alma-reviews-item__review-container-short-text">
          {shortReview}
        </h1>
        <p className="alma-reviews-item__review-container-text">{review}</p>
        <h1 className="alma-reviews-item__review-container-customer-name">
          {customerName}
        </h1>
        <div className="alma-reviews-item__review-container-country">
          <VnFlagIcon /> <span>{t('Vietnam', { vn: 'Việt Nam' })}</span>
        </div>
      </div>
    </div>
  );
});

export default AlmaReviewsItem;
