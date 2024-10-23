import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';
import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';

import './product-list-wrapper.module.scss';

interface ProductListWrapperProps {
  title: string;
  description?: string;
  url?: string;
  linkText?: string;
  children?: ReactNode;
}

export const ProductListHeaderLink = ({ url, linkText, className = '' }) => {
  if (!url) return null;
  return (
    <Link href={url}>
      <Button
        {...{
          type: 'link',
          className: `${className} product-list-wrapper__link`,
        }}
      >
        <span>{linkText}</span>
        <RightOutlined />
      </Button>
    </Link>
  );
};

const ProductListWrapper = (props: ProductListWrapperProps) => {
  const { t } = useHTranslation('admin-common');
  const defaultLinkText = t('product_list_header_default_link_text', {
    en: 'Browse all',
    vn: 'Xem tất cả',
  });
  const {
    title,
    description,
    url,
    linkText = defaultLinkText,
    children,
  } = props;
  return (
    <div className="product-list-wrapper">
      <div className="product-list-wrapper__header">
        <div className="product-list-wrapper__header__title">{title}</div>
        {description && (
          <div className="product-list-wrapper__header__description">
            <span>{description}</span>
            <ProductListHeaderLink
              {...{
                url,
                linkText,
                className: 'product-list-wrapper__header__description__link',
              }}
            />
          </div>
        )}
      </div>
      {children}
      <div className="product-list-wrapper__bottom-wrapper">
        <ProductListHeaderLink
          {...{ url, linkText, className: 'product-list-wrapper__bottom-link' }}
        />
      </div>
    </div>
  );
};

export default ProductListWrapper;
