import { ProductPvi } from '@components/features/fina/products/insurances/pvi';
import { useDocumentDetail } from '@schema-form/features/hooks';

const MobileInsuranceDetailPVI = () => {
  const detailData = useDocumentDetail();

  return <ProductPvi product={detailData} />;
};

export default MobileInsuranceDetailPVI;
