import { useHTranslation } from '@lib/i18n';
import { Col, Row } from 'antd';
import { get } from 'underscore';
import { ProductDetailProps } from './index';

const ProductDetailContent = ({
  data,
  contentGenerateArray,
}: ProductDetailProps) => {
  const { t } = useHTranslation('common');
  if (!Array.isArray(contentGenerateArray) || contentGenerateArray.length < 0) {
    return null;
  }
  return (
    <div className="client-product-detail__detail-content">
      <div className="client-product-detail__detail-content__title">
        {t('Product info', {
          en: 'Product info',
          vn: 'Thông tin sản phẩm',
        })}
      </div>
      {contentGenerateArray.map((contentGenerateObj, index) => {
        const { label, field, render } = contentGenerateObj;
        const value = field ? get(data, field) : '';
        const renderValue =
          typeof render === 'function' ? render(value, data) : value;
        return (
          <Row
            key={`product-detail-content-${index}`}
            className="client-product-detail-item"
          >
            <Col
              className="client-product-detail-item__label"
              {...{ xs: 24, sm: 24, md: 12 }}
            >
              {label}
            </Col>
            <Col
              className="client-product-detail-item__value"
              {...{ xs: 24, sm: 24, md: 12 }}
            >
              {renderValue}
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default ProductDetailContent;
