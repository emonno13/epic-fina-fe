import { HomeLoanListWithFetching } from '@components/shared/client/home-loan-list';
import { HomeProjectListWithFetching } from '@components/shared/client/home-project-list';
import ProductListWrapper from '../../../../../shared/client/product-list-wrapper';
import { HomeProductListCarousel } from './home-product-list-carousel';
import { useFetchCategoriesOutStanding } from './hooks';

const ClientHomeFeaturedProductsLoan = () => {
  const categoriesOutStanding = useFetchCategoriesOutStanding();

  return (
    <>
      <HomeLoanListWithFetching />
      {categoriesOutStanding?.map((category, index) => {
        return (
          <div
            className="home-loan-list-wrapper"
            key={`${category.id}-${index}`}
          >
            <ProductListWrapper
              {...{
                title: category?.name,
                description: category?.description,
                url: `/danh-sach-san-pham-vay?categoryId=${category?.id}`,
              }}
            >
              <HomeProductListCarousel categoryId={category.id} />
            </ProductListWrapper>
          </div>
        );
      })}
      <HomeProjectListWithFetching />
    </>
  );
};

export default ClientHomeFeaturedProductsLoan;
