import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { Col, Row } from 'antd';
import { getHereToHelpData } from '../constants';

const ClientHomeHereToHelpContact = () => {
  const { t } = useHTranslation('admin-common');
  const hereToHelpData = getHereToHelpData(t);
  const isMobile = useIsMobile();

  return (
    <Row className="client-home-here-to-help__contact" gutter={[24, 24]}>
      {hereToHelpData.map(({ imgSrc, desc }, index) => (
        <Col
          key={`client-home-here-to-help-contact-item-${index}`}
          {...{
            className: 'client-home-here-to-help__contact__item',
            xs: 24,
            sm: 24,
            md: 6,
          }}
        >
          <div className="client-home-here-to-help__contact__item__content">
            <img src={imgSrc} width="144px" height="144px" />
            <div className="client-home-here-to-help__contact__item__content__desc">
              {desc}
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ClientHomeHereToHelpContact;
