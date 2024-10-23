import { get } from 'underscore';

import './product-menu-content-insurance.link-item.scss';

interface ProductsMenuContentInsuranceLinkItemProps {
  data: any;
  className?: string;
  onClick?: Function;
  contentDetailData?: any[];
}

const ContentDetailRender = ({ data, contentDetailData }) => {
  if (!Array.isArray(contentDetailData) || contentDetailData.length < 1) {
    return null;
  }
  return (
    <>
      {contentDetailData.map((item, index) => {
        const { field = '', label, render } = item;
        const value = get(data, field) || '';
        const displayValue = typeof render === 'function' ? render(value) : value;

        return (
          <div
            key={`conten-detail-render-${data.id}-${index}`}
            className="menu-insurance-link-item__content-wrap__content__detail"
          >
            <span className="menu-insurance-link-item__content-wrap__content__detail__label">
              {label}:
            </span>
            {displayValue}
          </div>
        );
      })}
    </>
  );
};

const ProductsMenuContentInsuranceLinkItem = (props: ProductsMenuContentInsuranceLinkItemProps) => {
  const { data, className, onClick = (f) => f, contentDetailData } = props;
  const { name, info } = data;
  const imageSrc = info?.image?.url
    ? info?.image?.url
    : '/assets/images/icons/ic_insurance-active.svg';
  const handleOnClick = () => {
    onClick();
  };
  return (
    <div onClick={handleOnClick} className={`menu-insurance-link-item ${className}`}>
      <div className="menu-insurance-link-item__content-wrap">
        <img width="40px" height="40px" src={imageSrc} />
        <div className="menu-insurance-link-item__content-wrap__content">
          <div className="menu-insurance-link-item__content-wrap__content__title">{name}</div>
          <ContentDetailRender
            {...{
              data,
              contentDetailData,
            }}
          />
        </div>
      </div>
      <img
        width="10px"
        height="10px"
        src="/assets/images/icons/ic_product-menu-content-right-arrow.svg"
      />
    </div>
  );
};

export default ProductsMenuContentInsuranceLinkItem;
