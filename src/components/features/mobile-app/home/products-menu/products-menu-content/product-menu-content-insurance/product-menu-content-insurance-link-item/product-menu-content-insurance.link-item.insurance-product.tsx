import { PRODUCT_SOURCE } from '@components/features/fina/products/insurances/constant';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { MESSAGE_TYPE } from '@constants/mobile-app';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { MessageUtils } from '@lib/utils/message';
import { useSetDocumentDetail } from '@schema-form/features/hooks';
import ProductsMenuContentInsuranceLinkItem from './index';

const LinkItemInsuranceProduct = ({ data }) => {
  const { t } = useHTranslation('mobile');
  const currentUser = useCurrentUser();
  const setDocumentDetail = useSetDocumentDetail();
  const { info, source } = data;
  const contentDetailData = [
    {
      label: t('Commission percentage', {
        vn: 'Hoa hồng',
        en: 'Commission percentage',
      }),
      field: ['info', 'commissionPercentage'],
      render: (value) => `${value}%`,
    },
  ];
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
  const openBrowserGoTrust = () => {
    const { productUrlOriginal, defaultStaffId } = info || {};
    const staffId = currentUser?.id || defaultStaffId;
    const productUrl = productUrlOriginal
      ? `${productUrlOriginal}?r=fina&s=${staffId}`
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
    if (source === PRODUCT_SOURCE.GOTRUST) {
      openBrowserGoTrust();
      return;
    }
    setDocumentDetail(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    RouteUtils.redirectToDocumentDetail(data.id);
  };

  return (
    <ProductsMenuContentInsuranceLinkItem
      {...{ data, onClick: handleRedirectToDetail, contentDetailData }}
    />
  );
};

export default LinkItemInsuranceProduct;
