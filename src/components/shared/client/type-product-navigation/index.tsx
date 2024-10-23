import { RowProps } from 'antd';
import TypeProductNavigationItem from './type-product-navigation.item';

import './type-product-navigation.module.scss';

interface TypeProductNavigationProps {
  value: string;
  onChange?: (typeProduct: string) => void;
  typeProducts: any[];
  rowProps?: RowProps;
}

const TypeProductNavigation = ({
  value,
  onChange,
  typeProducts,
  rowProps = {},
}: TypeProductNavigationProps) => {
  if (!typeProducts?.length) {
    return null;
  }
  return (
    <div {...{ ...rowProps, className: 'type-product-navigation' }}>
      {typeProducts.map((typeProductData, index) => (
        <TypeProductNavigationItem
          key={`type-product-navigation-item-${index}`}
          {...{
            ...typeProductData,
            isSelected: value.includes(typeProductData?.value),
            onClick: () => {
              if (onChange) onChange(typeProductData?.value);
            },
          }}
        />
      ))}
    </div>
  );
};

export default TypeProductNavigation;
