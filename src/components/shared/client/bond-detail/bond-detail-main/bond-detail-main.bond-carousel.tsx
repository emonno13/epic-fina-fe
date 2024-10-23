import HCarousel from '@components/shared/common/h-carousel';
import { useTableSourceData } from '@schema-form/features/hooks';
import ClientBondListMainListItemGridView from '../../bond-list/bond-list-main/bond-list-main.list-item-grid-view';

import './bond-list-wrapper.scss';

export const BondCarousel = () => {
  const data = useTableSourceData() || [];

  return (
    <HCarousel
      {...{
        autoplay: false,
        className: 'bond-list-wrapper-carousel',
      }}
    >
      {data?.map((bond, index) => (
        <div key={index} className="bond-list-wrapper-carousel__item">
          <ClientBondListMainListItemGridView bondData={bond} />
        </div>
      ))}
    </HCarousel>
  );
};

export default BondCarousel;
