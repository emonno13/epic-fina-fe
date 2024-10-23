import cls from 'classnames';
import HomeProjectListItem from '../home-project-list/home-project-list.item';

import './real-estate-list-header.module.scss';

const RealEstateList = (props) => {
  const { realEstates } = props;
  const classNameItem = realEstates.length > 3 ? 'full-item' : 'less-item';
  return (
    <div className={cls('real-estate-list', classNameItem)} >
      {realEstates.map((projectData, index) => (
        <HomeProjectListItem className="real-estate-item" key={`home-project-list-item-${index}`} {...{ projectData }} />
      ))}
    </div>
  );
};

export default RealEstateList;
