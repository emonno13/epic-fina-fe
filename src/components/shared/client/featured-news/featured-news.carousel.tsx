import HCarousel from '@components/shared/common/h-carousel';
import { CarouselProps } from 'antd';

const FeaturedNewsCarousel = (props: CarouselProps) => {
  return (
    <HCarousel
      {...{
        ...props,
        className: 'client-featured-news-carousel',
        infinite: true,
      }}
    />
  );
};

export default FeaturedNewsCarousel;
