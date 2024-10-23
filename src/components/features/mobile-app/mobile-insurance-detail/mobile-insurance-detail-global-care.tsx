import { useCurrentUser } from '@lib/providers/auth';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { useEffect } from 'react';

const MobileInsuranceDetailGlobalCare = (props) => {
  const detailData = useDocumentDetail();
  const currentUser = useCurrentUser();
  const { productUrlOriginal, codeGatewayGlobalCare, defaultStaffId } =
    detailData?.info || {};
  const staffId = currentUser?.id || defaultStaffId;
  const productUrl =
    productUrlOriginal && codeGatewayGlobalCare
      ? `${productUrlOriginal}&staff_id=${staffId}&token=${codeGatewayGlobalCare}`
      : productUrlOriginal;

  useEffect(() => {
    window.scroll(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <iframe
      title={productUrl}
      allowFullScreen
      frameBorder="0"
      src={productUrl}
      width="100%"
      {...props}
    />
  );
};

export default MobileInsuranceDetailGlobalCare;
