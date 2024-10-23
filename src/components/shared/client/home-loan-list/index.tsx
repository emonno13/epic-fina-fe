import { LOAN_STATUS } from '@components/features/fina/products/utils';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import HomeProductCarousel from '../home-product-carousel';
import ProductListWrapper from '../product-list-wrapper';
import HomeLoanListItem from './home-loan-list.item';

import './home-loan-list.module.scss';

const HomeLoanList = ({ title = '', description = '' }) => {
  const { t } = useHTranslation('common');
  const data = useTableSourceData() || [];
  return (
    <div className="home-loan-list-wrapper">
      <ProductListWrapper
        {...{
          title:
            title ||
            t('home_loan_list_wrapper_title', {
              en: 'Outstanding home loan package',
              vn: 'Gói vay mua nhà nổi bật',
            }),
          description:
            description ||
            t('home_loan_list_wrapper_desc', {
              en: 'Attractive compound interest rates for townhouses and land plots',
              vn: 'Lãi suất kép ưu đãi hấp dẫn dành cho nhà phố, đất nền',
            }),
          url: '/danh-sach-san-pham-vay',
        }}
      >
        <HomeProductCarousel {...{ autoplay: false }}>
          {data.map((loanData, index) => (
            <HomeLoanListItem
              key={`home-loan-list-item-${index}`}
              {...{ loanData }}
            />
          ))}
        </HomeProductCarousel>
      </ProductListWrapper>
    </div>
  );
};

export const HomeLoanListWithFetching = ({
  transformData = (f) => f,
  title = '',
  description = '',
}) => {
  return (
    <HFeature
      {...{
        featureId: 'homeLoanList',
        nodeName: 'product-details/public/index-prioritized',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          withRelations: ['product', 'org'],
          hiddenFields: {
            status: LOAN_STATUS?.APPROVED,
          },
          hiddenValues: {
            filter: {
              fields: [
                'id',
                'name',
                'org',
                'product',
                'info',
                'preferentialTime',
                'orgId',
                'productId',
                'outstandingAdvantages',
                'slug',
              ],
            },
          },
          onDataReadyToSubmit: transformData,
        }}
      />
      <HomeLoanList {...{ title, description }} />
    </HFeature>
  );
};

export default HomeLoanList;
