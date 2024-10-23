import { Col, Row } from 'antd';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';

import './credit-offer-letter-list-with-label.module.scss';

export type CreditOfferLetterListGenerateArrayItem = {
  label: string;
  value: string;
}

type CreditOfferLetterListWithLabelProps = {
  generateArray: CreditOfferLetterListGenerateArrayItem[];
  title: string;
}

const CreditOfferLetterListWithLabel = ({ generateArray = [], title, ...rest }: Partial<CreditOfferLetterListWithLabelProps>) => {
  return (
    <CreditOfferLetterBodyContainer {...{
      title,
      ...rest,
    }}>
      <ul className="credit-offer-letter-list">
        {generateArray.map(({ label, value }, index) => {
          return (
            <li key={`credit-offer-letter-list-with-label-${index}`}>
              <Row gutter={13}>
                <Col span={12}>
                  <p className="credit-offer-letter-list-label">
                    {label}:
                  </p>
                </Col>
                <Col span={12}>
                  <p className="credit-offer-letter-list-value">
                    {value}
                  </p>
                </Col>
              </Row>
            </li>
          );
        })}
      </ul>
    </CreditOfferLetterBodyContainer>
  );
};

export default CreditOfferLetterListWithLabel;
