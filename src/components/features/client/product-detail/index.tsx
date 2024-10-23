import ProductDetail from '@components/shared/client/product-detail';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Spin } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getProductDetailContent,
  getProductDetailFetchOptions,
  isRouteProductDetail,
} from './utils';

const ClientProductDetail = () => {
  const { t } = useHTranslation('common');
  const [loading, setLoading] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>({});
  const slug = useMemo(() => RouteUtils.getAdminFeatureNames(), []);
  const productDetailContent = getProductDetailContent(t);
  const onGotSuccess = (response) => {
    setProductData(response);
  };
  const productDetailFetchOptions = getProductDetailFetchOptions(
    slug,
    onGotSuccess,
  );
  const contentGenerateArray = useMemo(() => {
    return productDetailContent[slug[0]] || [];
  }, [slug, productDetailContent]);
  const fetchProductData = useCallback(async () => {
    if (isRouteProductDetail(slug)) {
      setLoading(true);
      const options = productDetailFetchOptions[slug[0]] || {};
      await FormUtils.submitForm({}, { ...options });
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <Spin spinning={loading}>
      <ProductDetail {...{ data: productData, contentGenerateArray }} />
    </Spin>
  );
};

export default ClientProductDetail;
