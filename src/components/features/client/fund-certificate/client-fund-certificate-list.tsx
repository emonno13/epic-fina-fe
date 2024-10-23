import { FundCertificatesTableSchema } from '@components/shared/client/fund-certificates/fund-certificates-table';
import HViewMoreButton from '@components/shared/common/h-view-more-button';
import { useIsMobile } from '@lib/hooks/use-media';
import { HTable } from '@schema-form/features';
import { Col, Row } from 'antd';
import { FC } from 'react';
import { ClientFundCertificateListWithListView } from './client-fund-certificate-list-with-list-view';

import './client-fund-certificate.module.scss';

interface ClientFundCertificateListProps {
  data?: any[];
}

export const ClientFundCertificateList: FC<ClientFundCertificateListProps> = ({
  data = [],
}) => {
  const isMobile = useIsMobile();

  if (!data.length) return null;

  return (
    <div className="client-bond-main-list client-fund-certificate__related-product-list">
      {isMobile ? (
        <HTable
          dataSource={data}
          schema={FundCertificatesTableSchema}
          className="client-fund-certificates-table"
          pagination={false}
        />
      ) : (
        <>
          <Row gutter={[32, 32]}>
            {data.map((fund, index) => (
              <Col key={`client-related-fund-${index}`} span={24}>
                <ClientFundCertificateListWithListView fundData={fund} />
              </Col>
            ))}
          </Row>

          <div className="client-bond-main-list__view-more">
            <HViewMoreButton />
          </div>
        </>
      )}
    </div>
  );
};
