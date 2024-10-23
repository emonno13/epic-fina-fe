import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useIsMobile } from '@lib/hooks/use-media';
import { Carousel } from 'antd';
import { isEmpty } from 'lodash';

const ClientHomeBanner = ({ banners = [] }: { banners?: any[] }) => {
  const isMobile = useIsMobile();
  if (isEmpty(banners)) {
    return <></>;
  }
  return (
    <Carousel
      {...{
        className: 'client-home-banner',
        dots: true,
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
      }}
    >
      {banners.map((bannerData, index) => {
        const { desktopImage, mobileImage, link } = bannerData;
        const banner: any = isMobile ? mobileImage : desktopImage;
        return (
          <div key={`client-home-banner-item-${index}`}>
            <a href={link}>
              <img className="client-home-banner-image" src={banner?.url} />
            </a>
          </div>
        );
      })}
    </Carousel>
  );
};

export default ClientHomeBanner;
