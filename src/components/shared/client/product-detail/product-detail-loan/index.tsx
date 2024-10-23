import {
  CheckCircleOutlined,
  RightOutlined,
  StarFilled,
} from '@ant-design/icons';
import React, { useMemo } from 'react';
import Head from 'next/head';
import { CLIENT_PRODUCT_DETAIL_ROUTE } from '@components/features/client/product-detail/constants';
import { getProductDetailContent } from '@components/features/client/product-detail/utils';
import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';
import ProductDetailLoanForm from './product-detail-loan-form';
import ProductDetailLoanDocumentTemplates from './product-detail-loan.document-templates';
import ClientDetailPageCover from '../../detail-page-cover';
import FeaturedNews from '../../featured-news';
import { HomeLoanListWithFetching } from '../../home-loan-list';
import ClientLeaveInfoForm from '../../leave-info-form';
import ClientWhyChooseUs from '../../why-choose-us';
import ProductDetailContent from '../product-detail.content';

import './product-detail-loan.module.scss';

const ProductDetailLoanContentAdvantages = ({ advantages = [] }) => {
  if (!Array.isArray(advantages) || advantages.length < 1) {
    return null;
  }
  return (
    <div>
      {advantages.map((text, index) => (
        <div
          key={`product-detail-loan-content-advantage-${index}`}
          className="client-product-detail-loan-content__info__advantage"
        >
          <CheckCircleOutlined style={{}} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
};

const ProductDetailLoanContent = ({ data }) => {
  const { org, name, product, description, slug } = data;
  const { t } = useHTranslation('common');
  const productDetailContent = getProductDetailContent(t);
  const loanDetailContent =
    productDetailContent[CLIENT_PRODUCT_DETAIL_ROUTE.LOAN];
  const advantages = useMemo(() => {
    const productAdvantages = product?.advantages;
    if (!productAdvantages) {
      return '';
    }
    return productAdvantages
      .split(/\n+/g)
      .map((x) => x ?? x.trim())
      .filter((x) => !!x);
  }, [product?.advantages]);
  return (
    <div className="client-product-detail-loan-content">
      <div
        className="client-product-detail-loan-content__org-image"
        style={{
          backgroundImage: org?.image ? `url(${org?.image})` : undefined,
        }}
      >
        <Link href="/danh-sach-san-pham-vay">
          <div className="client-product-detail-loan-content__see-more">
            <span>{t('See more loans', { vn: 'Xem thêm gói vay khác' })}</span>
            <RightOutlined />
          </div>
        </Link>
      </div>
      <div className="client-product-detail-loan-content__info-wrapper">
        <div className="client-product-detail-loan-content__info">
          <div className="client-product-detail-loan-content__info__name">
            {name}
          </div>
          <div className="client-product-detail-loan-content__info__desc">
            {description}
          </div>
          <div className="client-product-detail-loan-content__info__advantage-outstading">
            <StarFilled />
            <span>{product?.outstandingAdvantages}</span>
          </div>
          <ProductDetailLoanContentAdvantages {...{ advantages }} />
          <ProductDetailContent
            {...{ data, contentGenerateArray: loanDetailContent }}
          />
          <ProductDetailLoanDocumentTemplates
            documentTemplateId={product?.documentTemplateId}
          />
        </div>
        <ProductDetailLoanForm {...{ loanData: data }} />
      </div>
    </div>
  );
};

const ProductDetailLoan = ({ data }) => {
  const { t } = useHTranslation('common');
  const title = t('Other loans', { vn: 'Các khoản vay khác' });
  const { name, description, slug } = data;
  return (
    <>
      <Head>
        <meta property="og:url" content={`/san-pham-vay/${slug}`} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <title>{name}</title>
      </Head>
      <ClientDetailPageCover
        breadCrumbRoutes={[
          {
            path: '/danh-sach-san-pham-vay',
            breadcrumbName: t('House loan', { vn: 'Vay mua nhà' }),
          },
          {
            path: '#',
            breadcrumbName: data.name,
          },
        ]}
      />
      <ClientLeaveInfoForm />
      <div className="client-product-detail-loan">
        <div className="max-w-1100 m-auto">
          <ProductDetailLoanContent {...{ data }} />
          <HomeLoanListWithFetching {...{ title }} />
        </div>
        <ClientWhyChooseUs />
        <FeaturedNews />
      </div>
    </>
  );
};

export default ProductDetailLoan;
