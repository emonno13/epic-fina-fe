import { PhoneOutlined } from '@ant-design/icons';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { Button, Divider } from 'antd';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import ClientCounsellingRequestModal from '../../counselling-request-modal-fom';
import ClientDetailPageCover from '../../detail-page-cover';
import FeaturedNews from '../../featured-news';
import ClientFinancialProductsIntroduction from '../../financial-products-introduction';
import ClientLoanCalculatorIntroduction from '../../loan-calculator-introduction';

import './product-detail-real-estate.module.scss';

const ProductDetailRealEstateContent = ({ data }) => {
  const { createdAt, name, images, content, description } = data;
  const { t } = useHTranslation('common');
  const [visible, setVisible] = useState<boolean>(false);
  const imageSrc = useMemo(() => images?.[0]?.url, [images]);
  return (
    <div className="client-product-detail-real-estate-content">
      <div className="client-product-detail-real-estate-content__header">
        <div className="client-product-detail-real-estate-content__header__date">
          {ConverterUtils.dateConverterToString(createdAt)}
        </div>
        <div className="client-product-detail-real-estate-content__header__title">
          <div className="client-product-detail-real-estate-content__header__title__name">
            {name}
          </div>
          <div className="client-product-detail-real-estate-content__header__title__image">
            <img src={imageSrc} />
          </div>
        </div>
        <div className="client-product-detail-real-estate-content__desc">
          {description}
        </div>
      </div>
      <Divider className="client-product-detail-real-estate-content__divider" />
      <div className="client-product-detail-real-estate-content__post-content">
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        <Button
          type="primary"
          onClick={() => setVisible(true)}
          className="client-product-detail-real-estate-content__post-content__contact-now-btn"
          icon={<PhoneOutlined rotate={90} />}
        >
          {t('Contact now', { vn: 'Liên hệ ngay' })}
        </Button>
      </div>
      <ClientCounsellingRequestModal
        {...{
          visible,
          onCancel: () => setVisible(false),
        }}
      />
    </div>
  );
};

const ProductDetailRealEstate = ({ data }) => {
  const { t } = useHTranslation('common');
  const { name, images, slug, description } = data;

  return (
    <>
      <Head>
        <meta property="og:url" content={`/san-pham-bat-dong-san/${slug}`} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={images?.[0]?.url} />
        <title>{name}</title>
      </Head>
      <ClientDetailPageCover
        breadCrumbRoutes={[
          {
            path: '/danh-sach-bat-dong-san',
            breadcrumbName: t('Real estate list', {
              vn: 'Danh sách bất động sản',
            }),
          },
          {
            path: '#',
            breadcrumbName: data.name,
          },
        ]}
      />
      <div className="client-product-detail-real-estate">
        <div className="max-w-1100 m-auto">
          <ProductDetailRealEstateContent {...{ data }} />
        </div>
        <ClientFinancialProductsIntroduction />
        <ClientLoanCalculatorIntroduction />
        <FeaturedNews />
      </div>
    </>
  );
};

export default ProductDetailRealEstate;
