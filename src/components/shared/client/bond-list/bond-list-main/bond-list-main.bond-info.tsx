import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';

const ClientInformationBonForm = (props) => {
  const { t } = useHTranslation('common');
  const { value, bond, onChange } = props;
  if (!bond) return null;

  return (
    <div>
      <div className="client-bond-form-view__title">
        {t('BOND-INFORMATION', {
          en: 'Bond Information',
          vn: 'Thông tin trái phiếu',
        })}
      </div>
      <div className="client-bond-form-view">
        <div className="client-bond-form-view__warp">
          <div className="client-bond-form-view__warp_item">
            <div className="client-bond-form-view__warp__label">
              {t('BOND NAME', { EN: 'Bond name', vn: 'Tên trái phiếu' })}:{' '}
            </div>
            <div className="client-bond-form-view__warp__value">
              {bond.name}
            </div>
          </div>
          <div className="client-bond-form-view__warp_item">
            <div className="client-bond-form-view__warp__label">
              {t('BOND NAME TCPH', { EN: 'TCPH name', vn: 'Tên TCPH' })}:{' '}
            </div>
            <div className="client-bond-form-view__warp__value">
              {bond.org.name}
            </div>
          </div>
          <div className="client-bond-form-view__warp__count">
            <div className="client-bond-form-view__warp__label">
              {t('NUMBER', { EN: 'Number', vn: 'Số lượng' })}:{' '}
            </div>

            <div className="client-bond-form-view__warp__count-value">
              <div
                className="client-bond-form-view__warp__button"
                onClick={() => value > 1 && onChange(parseInt(value) - 1)}
              >
                -
              </div>
              <input
                type={'number'}
                value={value}
                min={1}
                onChange={(e) => onChange(e.target.value)}
              />
              <div
                className="client-bond-form-view__warp__button client-bond-form-view__warp__button-add"
                onClick={() => onChange(parseInt(value || 0) + 1)}
              >
                +
              </div>
            </div>
          </div>
        </div>
        <div className="client-bond-form-view__warp">
          <div className="client-bond-form-view__warp_item">
            <div className="client-bond-form-view__warp__label">
              {t('CODE PRODUCT', { EN: 'Product code', vn: 'Mã sản phẩm' })}:{' '}
            </div>
            <div className="client-bond-form-view__warp__value">{bond.sku}</div>
          </div>
          <div className="client-bond-form-view__warp_item">
            <div className="client-bond-form-view__warp__label">
              {t('BOND CODE', { EN: 'Bond code', vn: 'Mã trái phiếu' })}:{' '}
            </div>
            <div className="client-bond-form-view__warp__value">
              {bond.productCodeOfTheInvestor}
            </div>
          </div>
          <div className="client-bond-form-view__warp_item">
            <div className="client-bond-form-view__warp__label">
              {t('DENOMINATIONS', { EN: 'Denominations', vn: 'Mệnh giá' })}:{' '}
            </div>
            <div className="client-bond-form-view__warp__value">
              {FormatterUtils.formatAmount(bond.info.parValueShares)}{' '}
              {t('VNĐ/TP', { vn: 'VNĐ/TP' })}
            </div>
          </div>
        </div>
      </div>

      <div className="client-bond-form-view__footer">
        <div className="client-bond-form-view__footer__title">
          {t('BOND-TOTAL', {
            en: 'Total purchase value',
            vn: 'Tổng giá trị mua',
          })}
        </div>

        <div className="client-bond-form-view__footer__value">
          {FormatterUtils.formatAmount(bond.info.parValueShares * (value || 0))}{' '}
          VNĐ
        </div>
      </div>
    </div>
  );
};

export default ClientInformationBonForm;
