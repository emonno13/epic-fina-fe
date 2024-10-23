import HomeLoanListItem from '@components/shared/client/home-loan-list/home-loan-list.item';
import { useClientDataSource } from '@schema-form/client-features/hooks/client-feature-hook';
import ClientFeatureProvider from '@schema-form/client-features/providers/client-feature-provider';
import ClientFeatureSearchForm from '@schema-form/client-features/search-form/client-feature-search-form';
import Scrollbars from 'react-custom-scrollbars-2';
import { endpoints } from '../../../../../lib/networks/endpoints';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';

import './credit-offer-letter-bank-recomendation.module.scss';

const CreditOfferLetterBankRecommendationList = () => {
  const dataSource = useClientDataSource();

  return (
    <div className="credit-offer-letter-bank-recomend-list">
      {dataSource?.map((loanData, index) => (
        <div key={`home-loan-list-item-${index}`}>
          <HomeLoanListItem
            {...{
              loanData,
              className: 'credit-offer-letter-loan-item',
            }}
          />
        </div>
      ))}
    </div>
  );
};

const CreditOfferLetterBankRecommendation = ({ taskId }) => {
  return (
    <CreditOfferLetterBodyContainer title="Ngân hàng đề xuất">
      <ClientFeatureProvider
        {...{
          endpoint: endpoints.endpointWithApiDomain(
            `/product-details/public/banks-feed-backs/${taskId}`,
          ),
          initialFetching: true,
        }}
      >
        <ClientFeatureSearchForm
          {...{
            withRelations: ['product', 'org'],
            hideControlButton: true,
          }}
        />
        <Scrollbars
          {...{
            autoHeight: true,
            autoHeightMax: 600,
          }}
        >
          <CreditOfferLetterBankRecommendationList />
        </Scrollbars>
      </ClientFeatureProvider>
    </CreditOfferLetterBodyContainer>
  );
};

export default CreditOfferLetterBankRecommendation;
