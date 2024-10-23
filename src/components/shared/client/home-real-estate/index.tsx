import RealEstateList from '../real-estate-list';
import RealEstateListHeader from '../real-estate-list/real-estate-list-header';

export const HomeRealEstates = (props) => {
  const { realEstates } = props;
  if (!Array.isArray(realEstates.data) || realEstates.data.length < 0) {
    return null;
  }
  return (
    <div className="home-real-estates" >
      <RealEstateListHeader {...{ total: realEstates.total }} />
      <RealEstateList realEstates={realEstates.data} />
    </div>
  );
};

export default HomeRealEstates;
