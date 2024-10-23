import React, { useEffect, useMemo } from 'react';

import { Radio, Select } from 'antd';
import cls from 'classnames';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import CalcRange from '../../loan-calculator-range';

import { changeHistory, filterOptions } from '../utils';
import { PREFERENTIAL_RATE_OPTIONS, TIME_SUFFIX_OBJ_ENDOW } from '../constants';
import { getExistObj, onSuffixChange } from '../utils';

const { Option } = Select;

const getOptionBank = (banks) => {
  if (banks && Array.isArray(banks) && banks.length > 0) {
    const bankOption = banks.map(bank => (
      {
        label: bank?.org?.name || '',
        value: bank?.org?.id,
      }
    ));
    return [...bankOption];
  }
  return [];

};

const getOptionLoan = (loans) => {
  if (loans && loans?.length > 0) {
    const loanOption = loans.map(loanElement => {
      return (
        {
          label: loanElement?.name || '',
          value: loanElement?.name,
        }
      );
    });
    return [...loanOption];
  }
  return [];
};

const onChangeRouter = (newQuery, router) => {
  const { pathname, query } = router;
  const submit = {
    ...query,
    ...newQuery,
  };
  router.push({
    pathname,
    query: submit,
  },
  undefined,
  { shallow: true });
};

const CalcPreferentialRate = ({
  getCalcProperty,
  handleChangeValue,
  onPreferentialRateOptionChange,
  banks,
  data,
}) => {

  const renderPrerentialRateOptions = useMemo(() => {
    return PREFERENTIAL_RATE_OPTIONS.map(({ id, label, style }) => (
      <Radio key={id} className={'customRadio'} value={id} style={style}>
        <span className={'customRadio_Span'}>{label}</span>
      </Radio>
    ));
  }, []);

  const router = useRouter();
  const bankSelectedId = data?.brand?.id || router?.query?.bankId;
  const loans = router?.query?.loans ? JSON.parse(String(router?.query?.loans)) : [];

  const loanValue = router?.query?.loanId;
  const setData = (value) => {
    const bankSelected = banks?.find(bankElement => bankElement?.org?.id === value);
    const newQuery = {
      bankId: value,
      loans: JSON.stringify(bankSelected?.loans),
      loanId: '',
    };
    onChangeRouter(newQuery, router);
  };

  const setLoansData = (value) => {
    const newQuery = {
      loanId: value,
    };
    onChangeRouter(newQuery, router);
  };

  useEffect(() => {
    if (getCalcProperty('preferentialRateOption') === 1) {
      if (!isEmpty(loans)) {
        loans?.forEach(loansProduct => {
          changeHistory(router, {
            introRate: loansProduct?.preferentialRate
              ? Number(loansProduct?.preferentialRate) / 100
              : 0,
            introMonths: loansProduct?.preferentialTime,
          });
        });
      }
    }
  }, [bankSelectedId]);

  const existIntroMonthsSuffixObj = useMemo(() => {
    return getExistObj(TIME_SUFFIX_OBJ_ENDOW, getCalcProperty('introMonthsSuffix'));
  }, [getCalcProperty]);

  return (
    <div className={'Fn_LoanCalc_Calc_preferentialRate'}>
      <div className={'Fn_LoanCalc_Calc_preferentialRate_Wrapper'}>
        <h3>Lãi suất ưu đãi</h3>
        <div className={'Fn_LoanCalc_Calc_preferentialRate_Group'}>
          <Radio.Group
            value={getCalcProperty('preferentialRateOption')}
            onChange={onPreferentialRateOptionChange}
          >
            {renderPrerentialRateOptions}
          </Radio.Group>
        </div>
        {getCalcProperty('preferentialRateOption') === 1 && (
          <div className={'Fn_LoanCalc_Calc_preferentialRate_Select'}>
            <Select
              placeholder={<span className={'customPlaceHolder'}>Chọn ngân hàng</span>}
              className={'customSelect'}
              style={{ marginBottom: 10 }}
              onChange={setData}
              value={bankSelectedId}
              showSearch
              filterOption={filterOptions}
              options={getOptionBank(banks)}
            />
            <Select
              placeholder={<span className={'customPlaceHolder'}>Chọn sản phẩm</span>}
              className={cls('customSelect', {
                ['customSelectBlock']: !bankSelectedId,
              })}
              disabled={!bankSelectedId}
              onChange={setLoansData}
              showSearch
              value={loanValue}
              filterOption={filterOptions}
              options={getOptionLoan(loans)}
            />
          </div>
        )}
        <div className={'Fn_LoanCalc_Calc_preferentialRate_Select'}>
          <CalcRange
            value={getCalcProperty('introRate')}
            onChange={val => handleChangeValue('introRate', val)}
            max={40}
            step={0.01}
            title="Lãi suất ưu đãi"
            suffix="%"
            multiplier={1 / 100}
            placeholder="Nhập lãi suất"
          />
          <CalcRange
            value={getCalcProperty('introMonths')}
            onChange={val => handleChangeValue('introMonths', val)}
            max={existIntroMonthsSuffixObj.max}
            step={existIntroMonthsSuffixObj.step}
            title="Thời gian ưu đãi"
            suffix={getCalcProperty('introMonthsSuffix')}
            multiplier={existIntroMonthsSuffixObj.multiplier}
            altSuffix={existIntroMonthsSuffixObj.altSuffix}
            placeholder="Nhập thời gian"
            onSuffixChange={val =>
              onSuffixChange({
                property: 'introMonthsSuffix',
                val,
                router,
              })
            }
            suffixOptions={Object.keys(TIME_SUFFIX_OBJ_ENDOW).map(label => ({ label, value: label }))}
          />
          <CalcRange
            value={getCalcProperty('rate')}
            onChange={val => handleChangeValue('rate', val)}
            max={40}
            step={0.01}
            title="Lãi suất sau ưu đãi"
            suffix="%"
            multiplier={1 / 100}
            placeholder="Nhập lãi suất"
          />
        </div>
      </div>
    </div>
  );
};

export default CalcPreferentialRate;
