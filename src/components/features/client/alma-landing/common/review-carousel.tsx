import HCarousel from '@components/shared/common/h-carousel';
import { CarouselProps } from 'antd';
import { forwardRef } from 'react';

interface AlmaReviewCarouselProps extends CarouselProps {
  children: any;
}

const AlmaReviewCarousel = forwardRef(
  (props: AlmaReviewCarouselProps, ref: any) => {
    const { children, ...rest } = props;
    return (
      <div className="alma-review-carousel">
        <HCarousel
          {...{
            slidesToShow: 1,
            arrows: false,
            autoplay: false,
            ...rest,
            ref,
          }}
        >
          {children}
        </HCarousel>
      </div>
    );
  },
);

export default AlmaReviewCarousel;
