import { endpoints } from '@lib/networks/endpoints';
import { HFeature } from '@schema-form/features';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import BondDetailProjectItemCarousel from './bond-detail-main.project-item';

import './bond-list-wrapper.scss';

export const BondDetailProjectCarousel = ({ orgId }) => {
  return (
    <HFeature
      {...{
        featureId: 'projects',
        nodeName: 'projects',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          endpoint: endpoints.endpointWithApiDomain('/projects/public'),
          withRelations: ['investor', 'user'],
          hiddenValues: {
            filter: {
              where: {
                investorId: orgId,
                active: true,
              },
            },
          },
        }}
      />
      <BondDetailProjectItemCarousel />
    </HFeature>
  );
};

export default BondDetailProjectCarousel;
