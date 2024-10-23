import HCarousel from '@components/shared/common/h-carousel';
import { CarouselProps } from 'antd';
import AlmaImageCarouselLeftArrowIcon from '../icons/alma-image-carousel-left-arrow-icon';
import AlmaImageCarouselRightArrowIcon from '../icons/alma-image-carousel-right-arrow-icon';

interface AlmaImageCarouselProps extends CarouselProps {
  children: any;
}

const AlmaImageCarousel = (props: AlmaImageCarouselProps) => {
  const { children, ...rest } = props;
  return (
    <div className="alma-image-carousel">
      <HCarousel
        {...{
          dots: true,
          slidesToShow: 1,
          nextArrow: (
            <div>
              <AlmaImageCarouselRightArrowIcon />
            </div>
          ),
          prevArrow: (
            <div>
              <AlmaImageCarouselLeftArrowIcon />
            </div>
          ),
          ...rest,
        }}
      >
        {children}
      </HCarousel>
    </div>
  );
};

export default AlmaImageCarousel;
