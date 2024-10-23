import { useHTranslation } from '@lib/i18n';
import AlmaCamRanhResortCarousel from './cam-ranh-resort.carousel';

const AlmaCamRanhResort = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="alma-cam-ranh-resort">
      <div className="alma-container">
        <AlmaCamRanhResortCarousel />
        <div className="alma-cam-ranh-resort__info">
          <h1 className="alma-cam-ranh-resort__info-title">
            {t('ALMA Resort, Khanh Hoa', {
              vn: 'Khu nghỉ dưỡng ALMA Resort, Khánh Hoà',
            })}
          </h1>
          <p className="alma-cam-ranh-resort__info-desc">
            {t(
              'Located in a prime location on the beach of Bai Dai, one of the 10 most beautiful beaches on the planet in Cam Lam, Khanh Hoa, ALMA Resort is like a peaceful green oasis with impressive architecture with a warm sound zone.',
              {
                vn: 'Tọa lạc tại vị trí đắc địa bên bờ biển Bãi Dài, một trong 10 bãi biển đẹp nhất hành tinh tại Cam Lâm, Khánh Hoà, ALMA Resort tựa như một ốc đảo xanh yên bình với nét kiến trúc đầy ấn tượng mang âm hưởng nhiệt đới.',
              },
            )}
            <br />
            <br />
            {t(
              'ALMA Resort has a total area of ​​nearly 30 hectares designed according to the all-in-one concept with dozens of diverse entertainment facilities, about 100 large and small swimming pools, nearly 600 luxury apartments & villas. The resort meets international standards in terms of class, size, amenities, won many international awards and aims to become the leading resort in Asia for families.',
              {
                vn: 'ALMA Resort có tổng diện tích gần 30 ha được thiết kế theo concept all-in-one với hàng chục tiện ích giải trí đa dạng, khoảng 100 hồ bơi lớn nhỏ, gần 600 căn hộ & biệt thự cao cấp. Khu nghỉ dưỡng đáp ứng các tiêu chuẩn quốc tế về tính đẳng cấp, quy mô, tiện nghi, đạt nhiều giải thưởng quốc tế và hướng đến mục tiêu trở thành khu nghỉ dưỡng hàng đầu tại Châu Á dành cho các gia đình.',
              },
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlmaCamRanhResort;
