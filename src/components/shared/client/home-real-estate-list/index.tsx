import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import HomeProductCarousel from '../home-product-carousel';
import ProductListWrapper from '../product-list-wrapper';
import HomeRealEstateListItem from './home-real-estate-list.item';

import './home-real-estate-list.module.scss';

const HomeRealEstateList = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();
  const data = useTableSourceData() || [];
  return (
    <ProductListWrapper
      {...{
        title: t('home_real_estate_list_wrapper_title', {
          en: 'Liquidation real estate',
          vn: 'Bất động sản thanh lý',
        }),
        description: t('home_real_estate_list_wrapper_desc', {
          en: 'Interest rates with attractive incentives for townhouses and land plots',
          vn: 'Lãi suất kèm ưu đãi hấp dẫn dành cho nhà phố, đất nền​',
        }),
        url: '/danh-sach-bat-dong-san',
      }}
    >
      <HomeProductCarousel
        {...{
          slidesToShow: isMobile ? 1 : 4,
          className: 'home-real-estate-carousel',
        }}
      >
        {data.map((realEstateData, index) => (
          <HomeRealEstateListItem
            key={`home-real-estate-list-item-${index}`}
            {...{ realEstateData }}
          />
        ))}
      </HomeProductCarousel>
    </ProductListWrapper>
  );
};

export const HomeRealEstateListWithFetching = ({
  transformData = (f) => f,
}) => {
  return (
    <HFeature
      {...{
        featureId: 'homeRealEstate',
        nodeName: 'properties/public',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          onDataReadyToSubmit: transformData,
        }}
      />
      <HomeRealEstateList />
    </HFeature>
  );
};

export default HomeRealEstateList;
