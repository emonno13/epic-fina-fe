import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';

import './bank.module.scss';

const BankComponent = (props: any) => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();

  const { bank = {} } = props;

  return (
    <div className="bank">
      <div
        className="bank__title item-center"
        style={{
          background: bank?.org?.backgroundColor
            ? bank?.org?.backgroundColor
            : '#009EDA',
        }}
      >
        {bank?.org?.avatar?.url ? (
          <img
            src={bank?.org?.avatar?.url}
            className="bank__image"
            alt="bank"
          />
        ) : (
          <span>{bank?.org?.name}</span>
        )}
      </div>

      <div className="bank__description">
        <div className="description-content">
          <div className="description-content__title">
            {t('', { vn: 'Lãi suất ưu đãi' })}
          </div>
          <div className="description-content__value">
            {bank?.info?.preferentialRate || 0}%
          </div>
          <div className="description-content__label">
            {'trong vòng '} {bank?.info?.preferentialTime || 0} {'tháng'}
          </div>
        </div>
        <div className="description-content">
          <div className="description-content__title">
            {t('', { vn: 'Thời gian vay tối đa' })}
          </div>
          <div className="description-content__value">
            {bank?.info?.maxTime || 0}
          </div>
          <div className="description-content__label">{'năm'}</div>
        </div>
        <div className="description-content">
          <div className="description-content__title">
            {t('', { vn: 'Tỉ lệ cho vay lên đến' })}
          </div>
          <div className="description-content__value">
            {bank?.info?.maxRate || 0} %
          </div>
          <div className="description-content__label">{'giá trị căn hộ'}</div>
        </div>
        <div className="description-content">
          <div className="description-content__title">
            {t('', { vn: 'Phí trả nợ trước hạn' })}
          </div>
          <div className="description-content__value">
            {bank?.info?.earlyRepaymentFee || 0}%
          </div>
          <div className="description-content__label">
            {'trong'} {bank?.info?.minTime || 0} {'tháng đầu'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankComponent;
