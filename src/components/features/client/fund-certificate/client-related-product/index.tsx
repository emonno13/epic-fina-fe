import { FC, ReactNode } from 'react';
import { ClientRelatedProductHeader, ClientRelatedProductHeaderProps } from './client-related-product-header';

interface ClientRelatedProductProps extends ClientRelatedProductHeaderProps {
  children?: ReactNode;
}

const ClientRelatedProduct: FC<ClientRelatedProductProps> = ({
  children,
  ...headerProps
}) => {
  return (
    <div className="related-bonds">
      <ClientRelatedProductHeader {...{ ...headerProps }}/>
      {children}
    </div>
  );
};

export default ClientRelatedProduct;
