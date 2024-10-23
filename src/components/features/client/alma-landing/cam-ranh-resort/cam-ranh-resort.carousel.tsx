import React from 'react';
import ReactImageGallery from 'react-image-gallery';
import { AlmaResortImagesData } from '../constants';
import AlmaImageCarouselLeftArrowIcon from '../icons/alma-image-carousel-left-arrow-icon';
import AlmaImageCarouselRightArrowIcon from '../icons/alma-image-carousel-right-arrow-icon';

import 'react-image-gallery/styles/scss/image-gallery.scss';

const NavButton = React.memo(({ position, onClick, disabled }: any) => {
  return (
    <div
      {...{
        type: 'button',
        onClick,
        disabled,
        className: `alma-resort-gallery-nav-btn ${position}`,
      }}
    >
      {position === 'left' && <AlmaImageCarouselLeftArrowIcon />}
      {position === 'right' && <AlmaImageCarouselRightArrowIcon />}
    </div>
  );
});

const AlmaCamRanhResortCarousel = () => {
  return (
    <div className="alma-cam-ranh-resort-carousel">
      <ReactImageGallery
        {...{
          items: AlmaResortImagesData,
          showPlayButton: false,
          showFullscreenButton: false,
          lazyLoad: true,
          autoPlay: true,
          infinite: true,
          renderLeftNav: (onClick, disabled) => (
            <NavButton
              {...{
                onClick,
                disabled,
                position: 'left',
              }}
            />
          ),
          renderRightNav: (onClick, disabled) => (
            <NavButton
              {...{
                onClick,
                disabled,
                position: 'right',
              }}
            />
          ),
        }}
      />
    </div>
  );
};

export default AlmaCamRanhResortCarousel;
