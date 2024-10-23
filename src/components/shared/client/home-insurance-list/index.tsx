import AlmaImageCarouselLeftArrowIcon from '@components/features/client/alma-landing/icons/alma-image-carousel-left-arrow-icon';
import AlmaImageCarouselRightArrowIcon from '@components/features/client/alma-landing/icons/alma-image-carousel-right-arrow-icon';
import HCarousel from '@components/shared/common/h-carousel';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import HomeInsuranceListItem from './home-insurance-list.item';

import './home-insurance-list.module.scss';

interface Props {
  data: any;
  isShowFull?: boolean;
}

const HomeInsuranceList = (props: Props) => {
  const { data } = props;
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();
  return (
    <>
      <HCarousel
        {...{
          autoplay: false,
          speed: 500,
          slidesToShow: isMobile ? 1 : 3,
          className: 'insurance-list-carousel',
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
        }}
      >
        {data.map((insuranceData, index) => {
          return (
            <div
              className="insurance-list-carousel__view-items"
              key={`client-home-insurance-list-item-${index}-${insuranceData.id}`}
              {...{ xs: 24, sm: 24, md: 8 }}
            >
              <HomeInsuranceListItem {...{ insuranceData }} />
            </div>
          );
        })}
      </HCarousel>
    </>
  );
};

export default HomeInsuranceList;
