import { useHTranslation } from '@lib/i18n';
import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { AlmaSpecialOfferData } from '../constants';
import AlmaSpecialOfferSingleItem from './special-offer.single-item';

const AlmaSpecialOffer = () => {
  const { t } = useHTranslation('common');
  const data = AlmaSpecialOfferData(t);
  const { locale } = useRouter();
  return (
    <div className="alma-special-offer" id="endow">
      <div className="alma-special-offer-container">
        <h1 className="alma-special-offer__title">
          {t('SPECIAL OFFERS', { vn: 'CHƯƠNG TRÌNH ƯU ĐÃI' })}
        </h1>
        <h1 className="alma-special-offer__title">
          {t('FOR CUSTOMERS OF FINA', { vn: 'DÀNH CHO KHÁCH HÀNG CỦA FINA' })}
        </h1>
        <Row gutter={[30, 80]}>
          {data.map((item, index) => (
            <Col
              key={`alma-special-offer-${index}`}
              {...{ xs: 24, sm: 24, md: 12 }}
            >
              <AlmaSpecialOfferSingleItem {...item} />
            </Col>
          ))}
        </Row>
        <div className="alma-special-offer__register-btn">
          <Button
            type="link"
            href={`/${locale}/alma-landing-page#register-now`}
          >
            {t('Register now', { vn: 'Đăng ký ngay' })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlmaSpecialOffer;
