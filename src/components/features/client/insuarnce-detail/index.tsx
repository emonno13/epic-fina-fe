import HFeature from '@schema-form/features/feature';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { useRouter } from 'next/router';
import ShowViewDetail from './show-view-detail';

const ClientInsuranceDetail = () => {
  const { query } = useRouter() || {};
  const { categoryName, id } = query || {};

  return (
    <div className="home-list-insurance-by-category">
      <HFeature
        key={`homeInsuranceListByCategory-${id}`}
        {...{
          featureId: `homeInsuranceListByCategory-${id}`,
          nodeName: 'products/public',
        }}
      >
        <HSearchFormHiddenAble
          {...{
            withRelations: ['category'],
            hiddenValues: {
              filter: {
                where: {
                  categoryId: id,
                  isActive: true,
                },
              },
            },
          }}
        />
        <ShowViewDetail {...{ categoryName }} />
      </HFeature>
    </div>
  );
};

export default ClientInsuranceDetail;
