import { PRODUCT_SOURCE } from '@components/features/fina/products/insurances/constant';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { MESSAGE_TYPE } from '@constants/mobile-app';
import { useCurrentUser } from '@lib/providers/auth';
import { MessageUtils } from '@lib/utils/message';
import { useSetDocumentDetail } from '@schema-form/features/hooks';

import './mobile-product-item.scss';

const MobileProductItem = ({ data }) => {
  const setDocumentDetail = useSetDocumentDetail();
  const { info, name, description, category, source } = data;
  const imgSrc = info?.image?.url
    ? info?.image?.url
    : '/assets/images/default-product-image.jpg';
  const currentUser = useCurrentUser();

  const openBrowserToGlobalCare = () => {
    const { productUrlOriginal, codeGatewayGlobalCare, defaultStaffId } =
      info || {};
    const staffId = currentUser?.id || defaultStaffId;
    const productUrl =
      productUrlOriginal && codeGatewayGlobalCare
        ? `${productUrlOriginal}&staff_id=${staffId}&token=${codeGatewayGlobalCare}`
        : productUrlOriginal;

    MessageUtils.postMessageToWebview(
      MESSAGE_TYPE.OPEN_OUTSIDE_BROWSER,
      productUrl,
    );
  };

  const handleRedirectToDetail = () => {
    if (source === PRODUCT_SOURCE.GLOBAL_CARE) {
      openBrowserToGlobalCare();
      return;
    }
    setDocumentDetail(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    RouteUtils.redirectToDocumentDetail(data.id);
  };

  return (
    <div
      className="mobile-product-item-wrapper"
      onClick={handleRedirectToDetail}
    >
      <div className="mobile-product-item-category">
        <div className="mobile-product-item-category__prefix" />
        <span>{category?.name}</span>
      </div>
      <div className="mobile-product-item">
        <img src={imgSrc} />
        <div className="mobile-product-item__content">
          <h1 className="mobile-product-item__content__name">{name}</h1>
          <p className="mobile-product-item__content__description">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileProductItem;
