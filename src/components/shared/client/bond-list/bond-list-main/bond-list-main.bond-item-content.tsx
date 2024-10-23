import { ConverterUtils } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { TYPE_OF_PROFIT } from '../constants';

const ClientBondListMainListItemContent = ({ bondData }) => {
  const { info } = bondData;
  const { t } = useHTranslation('admin-common');

  const maxInterest = info.interestRate
    .filter((e) => e.rate)
    .reduce((previousValue, nextValue) =>
      previousValue.rate > nextValue.rate ? previousValue : nextValue,
    );

  return (
    <div className="client-bond-list-main-list-item-list-view__content__service">
      <div className="client-bond-list-main-list-item-list-view__content__service__divider">
        <div className="client-bond-list-main-list-item-list-view__content__service__item">
          <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
            Tổng giá trị phát hành
          </div>
          <div className="client-bond-list-main-list-item-list-view__content__service__item__value">
            {info.parValueShares && info.totalReleaseVolume
              ? ConverterUtils.getMoneyLabel(
                  info.totalReleaseVolume * info.parValueShares,
                  t,
                )
              : '_'}
          </div>
        </div>

        {/* <div className="client-bond-list-main-list-item-list-view__content__service__divider-break"></div> */}

        <div className="client-bond-list-main-list-item-list-view__content__service__item">
          <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
            Lãi suất
          </div>
          <div className="client-bond-list-main-list-item-list-view__content__service__item__value">
            {maxInterest.rate}%/
            {t('Preferential time', { en: 'Year', vn: 'Năm' })}
          </div>
        </div>
      </div>
      <div className="client-bond-list-main-list-item-list-view__content__service__break"></div>
      <div className="client-bond-list-main-list-item-list-view__content__service__divider">
        <div className="client-bond-list-main-list-item-list-view__content__service__item">
          <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
            Mệnh giá
          </div>
          <div className="client-bond-list-main-list-item-list-view__content__service__item__value-bottom">
            {FormatterUtils.formatAmount(info.parValueShares)}
          </div>
          <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
            VNĐ/Trái phiếu
          </div>
        </div>

        {/* <div className="client-bond-list-main-list-item-list-view__content__service__divider-break"></div> */}

        {info.typeOfProfit === TYPE_OF_PROFIT.PERIODIC ? (
          <div className="client-bond-list-main-list-item-list-view__content__service__item">
            <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
              Kì tính lãi
            </div>
            <div className="client-bond-list-main-list-item-list-view__content__service__item__value-bottom">
              {info.interestPeriod}
            </div>
            <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
              {t('product ', { en: 'Month', vn: 'tháng' })}/lần
            </div>
          </div>
        ) : (
          <div className="client-bond-list-main-list-item-list-view__content__service__item">
            <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
              Nhận lãi cuối kì
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientBondListMainListItemContent;
