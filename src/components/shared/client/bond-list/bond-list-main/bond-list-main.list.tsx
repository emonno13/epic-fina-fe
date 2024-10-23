import HViewMoreButton from '@components/shared/common/h-view-more-button';
import { useIsMobile } from '@lib/hooks/use-media';
import { useTableSourceData } from '@schema-form/features/hooks';
import { Col, Row } from 'antd';
import { FC } from 'react';
import ClientBondListMainListItemListView from './bond-list-main.list-item-list-view';
import ClientBondTable from './bond-table';
interface ClientBondListMainListProps {
  gridView?: boolean;
  defaultData?: any[];
}
const ClientBondListMainList: FC<ClientBondListMainListProps> = ({
  gridView = false,
  defaultData = [],
}) => {
  const dataByHook = useTableSourceData();
  const data = defaultData.length ? defaultData : dataByHook;
  const isMobile = useIsMobile();

  if (!Array.isArray(data) || data.length < 1) {
    return null;
  }

  return (
    <div className="client-bond-main-list">
      {!isMobile ? (
        <>
          <Row gutter={[32, 32]}>
            {data.map((bondData, index) => (
              <Col key={`client-bond-list-main-item-${index}`} span={24}>
                <ClientBondListMainListItemListView {...{ bondData }} />
                {/* {gridView && <ClientBondListMainListItemGridView {...{ bondData }} />} */}
              </Col>
            ))}
          </Row>

          <div className="client-bond-main-list__view-more">
            <HViewMoreButton />
          </div>
        </>
      ) : (
        <ClientBondTable defaultData={data} />
      )}
    </div>
  );
};

export default ClientBondListMainList;
