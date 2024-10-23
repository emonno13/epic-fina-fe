import { useMemo } from 'react';

import { formatNumber } from '@components/shared/common-form-elements/utils';
import { Col, Radio, Row } from 'antd';
import { useRouter } from 'next/router';
import CalcInput from '../../loan-calculator-input';
import CalcRange from '../../loan-calculator-range';

import {
  CALCULATE_LOAN_OPTIONS,
  CALCULATE_LOAN_OPTION_LOAN_VALUE,
  CALCULATE_LOAN_OPTION_REAL_ESTATE_VALUE,
  MONEY_SUFFIX_OBJ,
  TIME_SUFFIX_OBJ,
} from '../constants';
import { getExistObj, onSuffixChange } from '../utils';

import CalcRangePickersStyles from '../styles/CalcRangePickers.module.scss';

const CalcRangePickers = ({
  getCalcProperty,
  handleChangeValue,
  onCalculateLoanOptionChange,
  isEmbeded,
}) => {
  const router = useRouter();
  const renderCalculateLoanOptions = useMemo(() => {
    return CALCULATE_LOAN_OPTIONS.map(({ id, label, style }) => (
      <Radio key={id} className={'customRadio'} value={id} style={style}>
        <span className={'customRadio_Span'}>{label}</span>
      </Radio>
    ));
  }, []);

  const existMoneySuffixObj = useMemo(() => {
    return getExistObj(
      MONEY_SUFFIX_OBJ,
      getCalcProperty('propertyPriceSuffix'),
    );
  }, [getCalcProperty]);

  const existMonthSuffixObj = useMemo(() => {
    return getExistObj(TIME_SUFFIX_OBJ, getCalcProperty('monthsSuffix'));
  }, [getCalcProperty]);

  const loanValue = useMemo(() => {
    const propertyPrice = getCalcProperty('propertyPrice');
    const ratio = getCalcProperty('ratio');

    return `${formatNumber(propertyPrice * ratio)} VNĐ`;
  }, [getCalcProperty]);

  if (isEmbeded) {
    return (
      <div>
        <Row gutter={[16, 24]} style={{ marginBottom: 20 }}>
          <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
            <CalcInput
              label="Giá trị bất động sản"
              value={getCalcProperty('propertyPrice')}
              onChange={(val) => handleChangeValue('propertyPrice', val)}
              suffix="VNĐ"
            />
          </Col>
          <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
            <CalcInput
              label="Tỉ lệ vay"
              value={getCalcProperty('ratio')}
              onChange={(val) => handleChangeValue('ratio', val)}
              suffix="%"
              multiplier={1 / 100}
            />
          </Col>
        </Row>
        <div className={CalcRangePickersStyles.loanValue}>
          <span className={CalcRangePickersStyles.label}>
            Giá trị khoản vay:
          </span>
          &nbsp;{loanValue}
        </div>
        <CalcRange
          value={getCalcProperty('months')}
          onChange={(val) => handleChangeValue('months', val)}
          max={existMonthSuffixObj.max}
          step={existMonthSuffixObj.step}
          title="Thời hạn vay"
          suffix={getCalcProperty('monthsSuffix')}
          multiplier={existMonthSuffixObj.multiplier}
          altSuffix={existMonthSuffixObj.altSuffix}
          onSuffixChange={(val) =>
            onSuffixChange({
              property: 'monthsSuffix',
              val,
              router,
            })
          }
        />
      </div>
    );
  }

  return (
    <div className={'Fn_LoanCalc_Calc_preferentialRate_Wrapper'}>
      <div className={'Fn_LoanCalc_Calc_preferentialRate_Group'}>
        <Radio.Group
          value={getCalcProperty('calculateLoanOption')}
          onChange={onCalculateLoanOptionChange}
        >
          {renderCalculateLoanOptions}
        </Radio.Group>
      </div>
      {getCalcProperty('calculateLoanOption') ===
        CALCULATE_LOAN_OPTION_LOAN_VALUE && (
        <>
          <CalcRange
            value={getCalcProperty('propertyPrice')}
            onChange={(val) => handleChangeValue('propertyPrice', val)}
            max={existMoneySuffixObj.max}
            step={existMoneySuffixObj.step}
            title="Giá trị khoản vay"
            suffix={getCalcProperty('propertyPriceSuffix')}
            altSuffix={existMoneySuffixObj.altSuffix}
            placeholder="Nhập số tiền"
            onSuffixChange={(val) => {
              onSuffixChange({
                property: 'propertyPriceSuffix',
                val,
                router,
              });
            }}
            multiplier={existMoneySuffixObj.multiplier}
            suffixOptions={Object.keys(MONEY_SUFFIX_OBJ).map((label) => ({
              label,
              value: label,
            }))}
          />
        </>
      )}
      {getCalcProperty('calculateLoanOption') ===
        CALCULATE_LOAN_OPTION_REAL_ESTATE_VALUE && (
        <>
          <CalcRange
            value={getCalcProperty('propertyPrice')}
            onChange={(val) => handleChangeValue('propertyPrice', val)}
            max={existMoneySuffixObj.max}
            step={existMoneySuffixObj.step}
            title="Giá trị bất động sản"
            suffix={getCalcProperty('propertyPriceSuffix')}
            altSuffix={existMoneySuffixObj.altSuffix}
            onSuffixChange={(val) => {
              onSuffixChange({
                property: 'propertyPriceSuffix',
                val,
                router,
              });
            }}
            multiplier={existMoneySuffixObj.multiplier}
            suffixOptions={Object.keys(MONEY_SUFFIX_OBJ).map((label) => ({
              label,
              value: label,
            }))}
          />
          <CalcRange
            value={getCalcProperty('ratio')}
            onChange={(val) => handleChangeValue('ratio', val)}
            max={100}
            step={1}
            title="Tỷ lệ vay"
            suffix="%"
            multiplier={1 / 100}
          />
        </>
      )}
      <CalcRange
        value={getCalcProperty('months')}
        onChange={(val) => handleChangeValue('months', val)}
        max={existMonthSuffixObj.max}
        step={existMonthSuffixObj.step}
        title="Thời hạn vay"
        suffix={getCalcProperty('monthsSuffix')}
        multiplier={existMonthSuffixObj.multiplier}
        altSuffix={existMonthSuffixObj.altSuffix}
        placeholder="Nhập thời hạn"
        suffixOptions={Object.keys(TIME_SUFFIX_OBJ).map((label) => ({
          label,
          value: label,
        }))}
        onSuffixChange={(val) =>
          onSuffixChange({
            property: 'monthsSuffix',
            val,
            router,
          })
        }
      />
    </div>
  );
};

export default CalcRangePickers;
