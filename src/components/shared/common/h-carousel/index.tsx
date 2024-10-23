import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useIsMobile } from '@lib/hooks/use-media';
import { Carousel, CarouselProps } from 'antd';
import { forwardRef, useMemo } from 'react';

const HCarousel = forwardRef((props: CarouselProps, ref: any) => {
  const { children, infinite, slidesToShow, className, ...rest } = props;
  const isMobile = useIsMobile();

  const slidesToShowProp = useMemo(() => {
    if (typeof slidesToShow === 'number') {
      return slidesToShow;
    }
    return isMobile ? 1 : 3;
  }, [slidesToShow, isMobile]);

  const infiniteProp = useMemo(() => {
    if (typeof infinite === 'boolean') {
      return infinite;
    }
    if (!Array.isArray(children)) {
      return false;
    }
    return children.length > slidesToShowProp;
  }, [children, infinite, slidesToShowProp]);

  return (
    <Carousel
      {...{
        className,
        dots: false,
        autoplay: true,
        arrows: true,
        nextArrow: (
          <div>
            <RightOutlined />
          </div>
        ),
        prevArrow: (
          <div>
            <LeftOutlined />
          </div>
        ),
        slidesToShow: slidesToShowProp,
        ...rest,
        infinite: infiniteProp,
        ref,
      }}
    >
      {children}
    </Carousel>
  );
});

export default HCarousel;
