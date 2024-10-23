import { Link } from '@components/shared/link';
import HomeInsuranceList from '../home-insurance-list';

import './home-insurance-list-with-category.module.scss';

const HomeInsuranceListWithCategory = ({ category, productList }) => {
  const { id, name } = category || {};
  if (!Array.isArray(productList) || productList.length < 1) {
    return null;
  }
  return (
    <div className="client-home-insurance-list-with-category">
      <div className="client-home-insurance-list-with-category__title">
        <div className="client-home-insurance-list-with-category__name">
          {category?.name}
        </div>
        <Link
          href={`/danh-sach-san-pham-bao-hiem?categoryName=${name}&id=${id}`}
        >
          <div className="client-home-insurance-list-with-category__show-full">
            Xem tất cả
          </div>
        </Link>
      </div>
      <HomeInsuranceList data={productList} />
    </div>
  );
};

export default HomeInsuranceListWithCategory;
