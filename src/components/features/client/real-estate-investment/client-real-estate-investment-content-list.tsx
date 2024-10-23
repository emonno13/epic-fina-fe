import HViewMoreButton from '@components/shared/common/h-view-more-button';
import { useTableSourceData } from '@schema-form/features/hooks';
import ClientRealEstateInvestmentContentItem from './client-real-estate-investment-content-item';

const ClientRealEstateInvestmentContentList = () => {
  const data = useTableSourceData();

  if (!Array.isArray(data) || data.length < 1) {
    return null;
  }

  return (
    <div className="client-real-estate-investment-content-right">
      {data?.map((realEstate) => (
        <ClientRealEstateInvestmentContentItem
          key={realEstate?.id}
          realEstate={realEstate}
        />
      ))}

      <div className="client-bond-main-list__view-more">
        <HViewMoreButton />
      </div>
    </div>
  );
};

export default ClientRealEstateInvestmentContentList;
