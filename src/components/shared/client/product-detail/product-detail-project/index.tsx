import { Col, Row } from 'antd';
import Head from 'next/head';
import { CLIENT_PRODUCT_DETAIL_ROUTE } from '@components/features/client/product-detail/constants';
import { getProductDetailContent } from '@components/features/client/product-detail/utils';
import { ExternalLinkIcon } from 'icons';
import { useHTranslation } from '@lib/i18n';
import ClientDetailPageCover from '../../detail-page-cover';
import FeaturedNews from '../../featured-news';
import { HomeLoanListWithFetching } from '../../home-loan-list';
import { HomeRealEstateListWithFetching } from '../../home-real-estate-list';
import ProductDetailContent from '../product-detail.content';

import './product-detail-project.module.scss';

const ProductDetailProjectContent = ({ data }) => {
  const { name, images, image, content, link } = data;
  const { t } = useHTranslation('common');
  const productDetailContent = getProductDetailContent(t);
  const projectDetailContent =
    productDetailContent[CLIENT_PRODUCT_DETAIL_ROUTE.PROJECT];
  return (
    <div className="client-product-detail-project-content">
      <Row>
        <Col {...{ xs: 24, sm: 24, md: 8 }}>
          <img src={images?.[0] || image} />
        </Col>
        <Col {...{ xs: 24, sm: 24, md: 8 }}>
          <div className="client-product-detail-project-content__info">
            <div className="client-product-detail-project-content__info__project-text">
              {t('Project', { vn: 'Dự án' })}
            </div>
            <div className="client-product-detail-project-content__info__name">
              {name}
            </div>
            <div className="client-product-detail-project-content__info__desc">
              {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
            </div>
            <a
              className="client-product-detail-project-content__info__link"
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLinkIcon />
              <span>{t('Project website', { vn: 'Website dự án' })}</span>
            </a>
          </div>
        </Col>
        <Col {...{ xs: 24, sm: 24, md: 8 }}>
          <div className="client-product-detail-project-content__detail-content">
            <ProductDetailContent
              {...{ data, contentGenerateArray: projectDetailContent }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const ProductDetailProject = ({ data }) => {
  const { t } = useHTranslation('common');
  const { name, images, image, content, slug } = data;
  return (
    <>
      <Head>
        <meta property="og:url" content={`/du-an/${slug}`} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={content} />
        <meta property="og:image" content={images?.[0] || image} />
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
      <div className="client-product-detail-project">
        <div className="max-w-1100 m-auto">
          <ProductDetailProjectContent {...{ data }} />
          <div className="client-product-detail-project__under-detail">
            <HomeLoanListWithFetching />
            <HomeRealEstateListWithFetching />
            <FeaturedNews />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailProject;
