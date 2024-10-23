import { useHTranslation } from '@lib/i18n';
import { Input, InputNumber, Select } from 'antd';
import { ArrowDownIconSvg } from 'icons';
import { TYPE_TIME } from '../constants';

const { Option } = Select;

const BankLoanCalculatorItem = ({
  valueInput,
  valueSelect,
  label,
  placeholder = '',
  onChangeValue,
  keyData,
  maxLength = 16,
  indexItem = 0,
}) => {
  const { t } = useHTranslation('calculator-toolkit');

  return (
    <div className="bank-loan-calculator-item">
      <span className="bank-loan-calculator-item-label">{label}</span>
      <Input.Group compact>
        <InputNumber
          min={1}
          value={valueInput}
          placeholder={placeholder || t('enterTheAmount')}
          maxLength={maxLength}
          onChange={(e: any) => onChangeValue(e, 'value', keyData, indexItem)}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value: any) => value.replace(/(,*)/g, '')}
        />
        <Select
          defaultValue={TYPE_TIME.MONTH}
          suffixIcon={<ArrowDownIconSvg />}
          value={valueSelect}
          onChange={(e: any) => onChangeValue(e, 'time', keyData, indexItem)}
        >
          <Option
            value={TYPE_TIME.MONTH}
            className="bank-loan-calculator-option"
          >
            {t('month')}
          </Option>
          <Option
            value={TYPE_TIME.YEAR}
            className="bank-loan-calculator-option"
          >
            {t('year')}
          </Option>
        </Select>
      </Input.Group>
    </div>
  );
};

export default BankLoanCalculatorItem;
