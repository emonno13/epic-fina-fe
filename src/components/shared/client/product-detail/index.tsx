import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { ReactNode, useMemo } from 'react';
import {
  isRouteInsuranceDetail,
  isRouteLoanDetail,
  isRouteProjectDetail,
  isRouteRealEstateDetail,
} from '../../../features/client/product-detail/utils';
import ProductDetailInsurace from './product-detail-insurance';
import ProductDetailLoan from './product-detail-loan';
import ProductDetailProject from './product-detail-project';
import ProductDetailRealEstate from './product-detail-real-estate';
import ProductDetailContent from './product-detail.content';

import './product-detail.module.scss';

export interface ContentGenerateObj {
  label: string;
  field?: string | string[];
  render?: (value: any, data?: any) => ReactNode;
}

export interface ProductDetailProps {
  data: any;
  contentGenerateArray?: ContentGenerateObj[];
}

const ProductDetail = (props: ProductDetailProps) => {
  const { data } = props;
  const slug = useMemo(() => RouteUtils.getAdminFeatureNames(), []);

  if (isRouteLoanDetail(slug)) {
    return <ProductDetailLoan {...{ data }} />;
  }
  if (isRouteInsuranceDetail(slug)) {
    return <ProductDetailInsurace {...{ data }} />;
  }
  if (isRouteRealEstateDetail(slug)) {
    return <ProductDetailRealEstate {...{ data }} />;
  }
  if (isRouteProjectDetail(slug)) {
    return <ProductDetailProject {...{ data }} />;
  }

  return (
    <div className="client-product-detail">
      <div className="client-product-detail__name">{data.name}</div>
      <div className="client-product-detail__desc">{data.description}</div>
      <ProductDetailContent {...props} />
    </div>
  );
};

export default ProductDetail;
