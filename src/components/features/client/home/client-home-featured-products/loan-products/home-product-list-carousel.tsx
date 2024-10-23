import { memo } from 'react';
import { useFetchProductDetailsByCategoryId } from './hooks';
import HomeProductCarousel from '../../../../../shared/client/home-product-carousel';
import HomeLoanListItem from '../../../../../shared/client/home-loan-list/home-loan-list.item';

export const HomeProductListCarousel = memo(({ categoryId }: any) => {
  const productDetailsByCategoryId = useFetchProductDetailsByCategoryId(categoryId);

  return (
    <HomeProductCarousel {...{ autoplay: false }}>
      {productDetailsByCategoryId.map((productDetail = {}, index) => <HomeLoanListItem key={`home-loan-list-item-${index}`} loanData={productDetail} />)}
    </HomeProductCarousel>
  );
});
