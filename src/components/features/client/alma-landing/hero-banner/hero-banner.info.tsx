import { useHTranslation } from '@lib/i18n';

const AlmaHeroBannerInfo = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="alma-hero-banner-info">
      <p className="alma-hero-banner-info__vacation">
        {t('Vacation', { vn: 'Kỳ nghỉ dưỡng' })}
      </p>
      <h1 className="alma-hero-banner-info__vacation-name">
        {t('4 DAYS 3 NIGHT AT RESORT 5* ALMA', {
          vn: '4 NGÀY 3 ĐÊM TẠI RESORT 5* ALMA',
        })}
      </h1>
      <p className="alma-hero-banner-info__vacation-location">
        {t('(Cam Ranh - Khanh Hoa)', { vn: '(Cam Ranh - Khánh Hòa)' })}
      </p>
      <div className="alma-hero-banner-info__gift">
        {t('Exclusive gift for customers of FINA', {
          vn: 'Món quà dành riêng cho khách hàng của FINA',
        })}
      </div>
    </div>
  );
};

export default AlmaHeroBannerInfo;
