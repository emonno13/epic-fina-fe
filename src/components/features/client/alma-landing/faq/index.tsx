import { useHTranslation } from '@lib/i18n';
import { Col, Collapse, Row } from 'antd';
import { AlmaReviewsFaqData } from '../constants';
import AlmaFaqDownArrowIcon from '../icons/alma-faq-down-arrow-icon';
import AlmaFaqUpArrowIcon from '../icons/alma-faq-up-arrow-icon';

const { Panel } = Collapse;

const AlmaFaqItem = ({ panel, content }) => {
  return (
    <div className="alma-faq-item">
      <Collapse
        {...{
          expandIconPosition: 'right',
          expandIcon: (props) => {
            const { isActive } = props;
            if (isActive) {
              return <AlmaFaqUpArrowIcon />;
            }
            return <AlmaFaqDownArrowIcon />;
          },
        }}
      >
        <Panel key={1} header={panel}>
          <div className="alma-faq-item-content">
            <p>{content}</p>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

const AlmaFaq = () => {
  const { t } = useHTranslation('common');
  const data = AlmaReviewsFaqData(t);
  return (
    <div className="alma-faq" id="faq">
      <div className="alma-faq-container">
        <h1 className="alma-faq__title">
          <span>FAQ</span> -{' '}
          {t('FREQUENTLY ASKED QUESTIONS', { vn: 'NHỮNG CÂU HỎI THƯỜNG GẶP' })}
        </h1>
        <Row gutter={[30, 16]}>
          <Col {...{ xs: 24, sm: 24, md: 12 }}>
            {data.slice(0, 4).map((item, index) => (
              <AlmaFaqItem key={`alma-faq-item-${index}`} {...item} />
            ))}
          </Col>
          <Col {...{ xs: 24, sm: 24, md: 12 }}>
            {data.slice(4).map((item, index) => (
              <AlmaFaqItem key={`alma-faq-item-${index + 4}`} {...item} />
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AlmaFaq;
