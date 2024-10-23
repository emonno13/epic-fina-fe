import { useHTranslation } from '@lib/i18n';
import { Col, Row } from 'antd';
import { AlmaServiceData } from '../constants';
import AlmaServicePanel from './service-panel';

const AlmaService = () => {
  const { t } = useHTranslation('common');
  const data = AlmaServiceData(t);
  return (
    <div className="alma-service" id="service">
      <div className="alma-container">
        <h1 className="alma-service__title">
          {t('SERVICE', { vn: 'DỊCH VỤ' })} &{' '}
          <span>{t('FACILITIES', { vn: 'TIỆN NGHI' })}</span>
        </h1>
        <p className="alma-service__desc">
          {t(
            "At ALMA, guests can fully enjoy the facilities of a 5* oceanfront resort including a system of luxury restaurants, miniature water parks, cinemas, open-air theatres, golf courses, and shopping centers. sports, children's play area, bars,...",
            {
              vn: 'Tại ALMA, khách được tận hưởng đầy đủ các tiện ích của một khu nghỉ dưỡng 5* hướng biển bao gồm hệ thống nhà hàng sang trọng, công viên nước thu nhỏ, rạp chiếu phim, nhà hát ngoài trời, sân golf, trung tâm thể thao, khu vui chơi cho trẻ em, quán bar,...',
            },
          )}
        </p>
        <Row gutter={[30, 48]}>
          {data.map((item, index) => (
            <Col
              key={`alma-service-panel-${index}`}
              {...{ xs: 24, sm: 24, md: 8 }}
            >
              <AlmaServicePanel {...item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AlmaService;
