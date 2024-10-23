import { useHTranslation } from '@lib/i18n';
import { Carousel } from 'antd';
import { CAROUSEL_DATA } from '../constants';
import CarouselItem from './carousel-item';

import './top-carousel.module.scss';

const TopCarousel = () => {
  const { t } = useHTranslation('mobile-home');
  return (
    <div className="top-carousel">
      <Carousel centerMode centerPadding="0" className="top-carousel__wrap">
        {CAROUSEL_DATA(t).map(({ img, content }, index) => (
          <CarouselItem
            key={`carousel-item-${index}`}
            img={img}
            content={content}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default TopCarousel;
