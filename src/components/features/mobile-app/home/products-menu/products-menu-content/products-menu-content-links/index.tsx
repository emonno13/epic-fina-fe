import { Divider } from 'antd';
import React from 'react';
import ProductsMenuContentLinksItem from './products-menu-content-links.item';

import './products-menu-content-links.scss';

type ProductsMenuContentLinksData = {
  icon: string;
  label: string;
  needAuthenticate: boolean;
  componentProps?: any;
};

type ProductsMenuContentLinksProps = {
  data: Array<ProductsMenuContentLinksData>;
};

const ProductsMenuContentLinks = (props: ProductsMenuContentLinksProps) => {
  const { data } = props;

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  return (
    <div className="links-wrapper">
      {data.map(({ icon, label, needAuthenticate, componentProps = {} }, index) => (
        <React.Fragment key={`product-menu-content-link-${index}`}>
          <ProductsMenuContentLinksItem
            {...{
              ...componentProps,
              icon,
              label,
              needAuthenticate,
            }}
          />
          {index + 1 !== data.length && (
            <Divider className="links-wrapper__divider" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductsMenuContentLinks;
