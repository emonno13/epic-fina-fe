import HCarousel from '@components/shared/common/h-carousel';
import { CarouselProps } from 'antd';

import './home-product-carousel.module.scss';

const HomeProductCarousel = (props: CarouselProps) => {
  return (
    <HCarousel
      {...{
        ...props,
        className: `client-home-product-carousel ${props.className || ''}`,
      }}
    />
  );
};

export default HomeProductCarousel;
