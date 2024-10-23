import { useHTranslation } from '@lib/i18n';
import { Col, Row } from 'antd';
import { getWhyChooseFinaInsurance } from './constants';

const ClientWhyChooseFinaInsuranceContent = () => {
  const { t } = useHTranslation('common');
  const data = getWhyChooseFinaInsurance(t);
  return (
    <div className="client-why-choose-fina-insurance-content">
      <Row gutter={[8, 8]}>
        {data.map(({ icon, title, description }, index) => (
          <Col
            key={`client-why-choose-fina-insurance-content-item-${index}`}
            {...{ xs: 24, sm: 24, md: 6 }}
          >
            <div className="client-why-choose-fina-insurance-content-item">
              <div className="client-why-choose-fina-insurance-content-item__icon">
                {icon}
              </div>
              <div className="client-why-choose-fina-insurance-content-item__title">
                {title}
              </div>
              <div className="client-why-choose-fina-insurance-content-item__desc">
                {description}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ClientWhyChooseFinaInsuranceContent;
