/* eslint-disable @next/next/no-img-element */
import HScrollAnimation from '@components/shared/common/h-scroll-animation';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import { PRODUCT_DETAIL } from '../constants';

import './product-detail.module.scss';

const ProductDetail = ({ props }) => {
  const valuePercent = props?.value?.[0]?.tags[0] || 5.8;

  return (
    <div id="introduce" className="product-detail">
      <div className="loans-introduce-container">
        {PRODUCT_DETAIL(valuePercent)?.map((el, index) => (
          <div className="product-detail-row" key={index}>
            <HScrollAnimation
              animateIn={index % 2 !== 0 ? 'fadeInRight' : 'fadeInLeft'}
            >
              <Row
                gutter={[32, 32]}
                className={classNames('product-detail-row items-center', {
                  'row-reverse': index % 2 !== 0,
                })}
              >
                <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                  <div
                    className={classNames('image-wrapper', {
                      'align-image': index % 2 !== 0,
                    })}
                  >
                    <img
                      src={`/assets/images/${el?.image}`}
                      alt={el?.image}
                      className="product-detail-img"
                    />
                  </div>
                </Col>
                <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                  {el?.contents?.map((content) => (
                    <div key={content} className="product-detail-description">
                      <span className="dot" />
                      <div
                        dangerouslySetInnerHTML={{ __html: content }}
                        className="product-detail-description-content"
                      />
                    </div>
                  ))}
                </Col>
              </Row>
            </HScrollAnimation>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
