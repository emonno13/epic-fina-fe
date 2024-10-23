import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TYPE_GENERAL } from '../constants';

const ShowTotalFormSelect = ({ total, keyGeneral }) => {
  const { t } = useHTranslation('calculator-toolkit');

  return (
    <div className="content-show-total">
      <p className="lable-total">
        {keyGeneral === TYPE_GENERAL.INCOME
          ? t('totalIncomes')
          : t('totalOutcomes')}{' '}
        :
      </p>
      <p className="value-tatal">
        {ConverterUtils.formatNumber(Math.floor(total))} đ / {t('month')}
      </p>
    </div>
  );
};

export default ShowTotalFormSelect;
