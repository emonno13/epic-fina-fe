import HViewMoreButton from '@components/shared/common/h-view-more-button';
import { useIsMobile } from '@lib/hooks/use-media';
import { useClientFeature } from '@schema-form/client-features/hooks/client-feature-hook';
import { Col, Row } from 'antd';
import { useMemo, useState } from 'react';
import { CounsellingRequestDealLoan } from '../../product-detail/product-detail-loan/product-detail-loan-form/register-form';
import ClientLoanListMainListItemGridView from './loan-list-main.list-item-grid-view';
import ClientLoanListMainListItemListView from './loan-list-main.list-item-list-view';

const ClientLoanListMainList = ({ gridView = false }) => {
  const { dataSource } = useClientFeature();
  const [visible, setVisible] = useState<boolean>(false);
  const [loanData, setLoanData] = useState<any>({});
  const isMobile = useIsMobile();

  const colSpan = useMemo(
    () => (isMobile || !gridView ? 24 : 12),
    [gridView, isMobile],
  );

  const handleCreateCounsellingRequest = (data) => {
    setVisible(true);
    setLoanData(data);
  };

  if (!Array.isArray(dataSource) || dataSource.length < 1) {
    return null;
  }

  return (
    <div className="client-loan-main-list">
      <Row gutter={[32, 32]}>
        {dataSource.map((loanData, index) => (
          <Col key={`client-loan-list-main-item-${index}`} span={colSpan}>
            {!gridView && (
              <ClientLoanListMainListItemListView
                {...{
                  loanData,
                  onClick: handleCreateCounsellingRequest,
                }}
              />
            )}
            {gridView && (
              <ClientLoanListMainListItemGridView
                {...{
                  loanData,
                  onClick: handleCreateCounsellingRequest,
                }}
              />
            )}
          </Col>
        ))}
      </Row>
      <div className="client-loan-main-list__view-more">
        <HViewMoreButton />
      </div>
      <CounsellingRequestDealLoan
        {...{
          loanData,
          setVisible,
          visible,
        }}
      />
    </div>
  );
};

export default ClientLoanListMainList;
