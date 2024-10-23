import { PRODUCT_SOURCE } from '@components/features/fina/products/insurances/constant';
import { useDocumentDetail } from '@schema-form/features/hooks';
import MobileInsuranceDetailPVI from './mobile-insurance-detail-pvi';

import './index.scss';

const MobileInsuranceDetail = () => {
  const detailData = useDocumentDetail();
  const { category, source, name, description } = detailData;

  if (source === PRODUCT_SOURCE.PVI) {
    return <MobileInsuranceDetailPVI />;
  }

  return (
    <div className="product-menu-content-insurance-detail">
      <p className="product-menu-content-insurance-detail__category-name">
        {category?.name}
      </p>
      <h1 className="product-menu-content-insurance-detail__name">{name}</h1>
      <p className="product-menu-content-insurance-detail__description">
        {description}
      </p>
    </div>
  );
};

export default MobileInsuranceDetail;
