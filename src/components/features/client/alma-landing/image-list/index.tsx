import { useIsMobile } from '@lib/hooks/use-media';
import AlmaImageCarousel from '../common/image-carousel';
import { AlmaImageListImage } from '../constants';

const AlmaImageList = () => {
  const isMobile = useIsMobile();
  return (
    <div className="alma-image-list">
      <div className="alma-container">
        <AlmaImageCarousel
          {...{
            slidesToShow: isMobile ? 1 : 4,
            dots: false,
            arrows: false,
            autoplay: false,
          }}
        >
          {AlmaImageListImage.map((fileName, index) => (
            <div
              key={`alma-image-list-item-${index}`}
              {...{
                className: 'alma-image-list__image',
                style: {
                  paddingRight: index === 3 ? 0 : 30,
                },
              }}
            >
              <img src={`/assets/images/${fileName}`} />
            </div>
          ))}
        </AlmaImageCarousel>
      </div>
    </div>
  );
};

export default AlmaImageList;
