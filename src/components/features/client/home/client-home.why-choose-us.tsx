import { useHTranslation } from '@lib/i18n';
import { Col, Row } from 'antd';
import { getWhyChooseUsData } from './constants';

const ClientHomeWhyChooseUsItem = ({ icon, title, description }) => {
  return (
    <div className="client-home-why-choose-us__item">
      <div className="client-home-why-choose-us__item__icon">{icon}</div>
      <div>
        <div className="client-home-why-choose-us__item__title">{title}</div>
        <div className="client-home-why-choose-us__item__description">
          {description}
        </div>
      </div>
    </div>
  );
};

const ClientHomeWhyChooseUs = () => {
  const { t } = useHTranslation('admin-common');
  const whyChooseUsData = getWhyChooseUsData(t);
  return (
    <div className="client-home-why-choose-us">
      <div className="max-w-1100 m-auto">
        <div className="client-home-why-choose-us__title">
          {t('why_choose_us_title', {
            en: 'Why choose FINA?',
            vn: 'Tại sao lại lựa chọn FINA?',
          })}
        </div>
        <Row>
          {whyChooseUsData.map((itemData, index) => (
            <Col
              key={`why-choose-us-item-${index}`}
              {...{ xs: 24, sm: 12, md: 12 }}
            >
              <ClientHomeWhyChooseUsItem {...itemData} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ClientHomeWhyChooseUs;
