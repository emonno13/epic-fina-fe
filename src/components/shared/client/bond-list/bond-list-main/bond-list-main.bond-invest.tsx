import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';

const ClientBonProfessionalInvestorForm = (props) => {
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
          <div>
            <span className="client-bond-form-view__warp__label">
              {t('BOND NAME', { EN: 'Bond name', vn: 'Tên trái piếu' })}:{' '}
            </span>
            <span>{bond.name}</span>
          </div>
          <div>
            <span className="client-bond-form-view__warp__label">
              {t('BOND NAME TCPH', { EN: 'TCPH name', vn: 'Tên TCPH' })}:{' '}
            </span>
            <span>{bond.org.name}</span>
          </div>
          <div className="client-bond-form-view__warp__count">
            <span className="client-bond-form-view__warp__label">
              {t('NUMBER', { EN: 'Number', vn: 'Số lượng' })}:{' '}
            </span>

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
                onChange={(e) => onChange(e.target.value)}
              />
              <div
                className="client-bond-form-view__warp__button client-bond-form-view__warp__button-add"
                onClick={() => onChange(parseInt(value) + 1)}
              >
                +
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span className="client-bond-form-view__warp__label">
              {t('CODE PRODUCT', { EN: 'Product code', vn: 'Mã sản phẩm' })}:{' '}
            </span>
            <span>{bond.sku}</span>
          </div>
          <div>
            <span className="client-bond-form-view__warp__label">
              {t('BOND CODE', { EN: 'Bond code', vn: 'Mã trái phiếu' })}:{' '}
            </span>
            <span>{bond.productCodeOfTheInvestor}</span>
          </div>
          <div>
            <span className="client-bond-form-view__warp__label">
              {t('DENOMINATIONS', { EN: 'Denominations', vn: 'Mệnh giá' })}:{' '}
            </span>
            <span>
              {FormatterUtils.formatAmount(bond.info.parValueShares)}{' '}
              {t('VNĐ/TP', { vn: 'VNĐ/TP' })}
            </span>
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

export default ClientBonProfessionalInvestorForm;
