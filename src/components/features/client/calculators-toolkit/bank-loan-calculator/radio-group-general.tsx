import { useHTranslation } from '@lib/i18n';
import { Radio } from 'antd';

const RadioGroupGeneral = ({ onChangeIsGeneral, keyGeneral, value }) => {
  const { t } = useHTranslation('calculator-toolkit');

  return (
    <Radio.Group
      onChange={(e) => onChangeIsGeneral(e?.target?.value, keyGeneral)}
      value={value}
    >
      <Radio value={true}>
        {keyGeneral === 'isShowGeneralIncome'
          ? t('totalIncomes')
          : t('totalOutcomes')}{' '}
      </Radio>
      <Radio value={false}>
        {keyGeneral === 'isShowGeneralIncome'
          ? t('incomesDetails')
          : t('outcomesDetails')}
      </Radio>
    </Radio.Group>
  );
};

export default RadioGroupGeneral;
