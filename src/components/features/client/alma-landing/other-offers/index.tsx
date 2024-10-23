import { useHTranslation } from '@lib/i18n';
import dynamic from 'next/dynamic';

const AlmaOtherOffersProductDetails = dynamic(
  () => import('./other-offers.product-details'),
  {
    ssr: false,
  },
);

const AlmaOtherOffers = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="alma-other-offers">
      <div className="alma-container">
        <h1 className="alma-other-offers__title">
          {t('REFERENCES OTHER SPECIAL PROGRAMS', {
            vn: 'THAM KHẢO CÁC CHƯƠNG TRÌNH ƯU ĐÃI KHÁC',
          })}
        </h1>
        <AlmaOtherOffersProductDetails />
      </div>
    </div>
  );
};

export default AlmaOtherOffers;
