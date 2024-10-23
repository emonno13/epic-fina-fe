import HomeInsuranceListItem from '@components/shared/client/home-insurance-list/home-insurance-list.item';
import { useTableSourceData } from '@schema-form/features/hooks';
import { Col, Row } from 'antd';
import { isEmpty } from 'lodash';

const InsuranceDetailViewDetail = () => {
  const dataSource = useTableSourceData();

  if (isEmpty(dataSource)) return <></>;
  return (
    <Row gutter={[24, 24]}>
      {dataSource.map((insuranceData, index) => {
        return (
          <Col
            key={`client-home-insurance-list-item-${index}-${insuranceData.id}`}
            {...{ xs: 24, sm: 24, md: 12, lg: 8 }}
          >
            <HomeInsuranceListItem {...{ insuranceData }} />
          </Col>
        );
      })}
    </Row>
  );
};

export default InsuranceDetailViewDetail;
