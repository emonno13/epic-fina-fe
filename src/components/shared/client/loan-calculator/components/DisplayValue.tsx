import React from 'react';

const DisplayLoanCalcValue = ({ title, value }) => {
  return (
    <div className={'displayValueWrap'}>
      <h3>{title}</h3>
      <div className={'value'}>{value}</div>
    </div>
  );
};

export default DisplayLoanCalcValue;
