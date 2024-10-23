import { useIsMobile } from '@lib/hooks/use-media';
import { HFeature } from '@schema-form/features';
import { useState } from 'react';
import ClientRealEstateInvestmentContentFilterForm from './client-real-estate-investment-content-filter-form';
import ClientRealEstateInvestmentContentHeader from './client-real-estate-investment-content-header';
import ClientRealEstateInvestmentContentList from './client-real-estate-investment-content-list';

const ClientRealEstateInvestmentContent = () => {
  const [hiddenValues, setHiddenValues] = useState<any>({});
  const isMobile = useIsMobile();

  return (
    <HFeature
      {...{
        featureId: 'properties-list-public',
        nodeName: 'properties/public',
        useQueryParams: false,
      }}
    >
      <div className="client-real-estate-investment-content">
        {!isMobile && (
          <ClientRealEstateInvestmentContentHeader {...{ setHiddenValues }} />
        )}

        <div className="client-bond-list-main__body client-real-estate-investment-content-body">
          <ClientRealEstateInvestmentContentFilterForm {...{ hiddenValues }} />

          {isMobile && (
            <ClientRealEstateInvestmentContentHeader {...{ setHiddenValues }} />
          )}

          <ClientRealEstateInvestmentContentList />
        </div>
      </div>
    </HFeature>
  );
};

export default ClientRealEstateInvestmentContent;
