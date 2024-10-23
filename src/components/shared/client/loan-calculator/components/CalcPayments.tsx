import React, { useMemo } from 'react';

import { Radio } from 'antd';

import { PAYMENT_METHOD_OPTIONS } from '../constants';

const CalcPayments = ({ onPaymentsOptionChange, getCalcProperty }) => {
  const renderPaymentMethodOptions = useMemo(() => {
    return PAYMENT_METHOD_OPTIONS.map(({ id, label, style }) => (
      <Radio className={'customRadio'} key={id} value={id} style={style}>
        <span className={'customRadio_Span'}>{label}</span>
      </Radio>
    ));
  }, []);

  return (
    <div className={'Fn_LoanCalc_Calc_payments'}>
      <div className={'Fn_LoanCalc_Calc_payments_Wrapper'}>
        <h3>Phương thức tính lãi</h3>
        <div className={'Fn_LoanCalc_Calc_payments_Group'}>
          <Radio.Group value={getCalcProperty('paymentMethod')} onChange={onPaymentsOptionChange}>
            {renderPaymentMethodOptions}
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default CalcPayments;
