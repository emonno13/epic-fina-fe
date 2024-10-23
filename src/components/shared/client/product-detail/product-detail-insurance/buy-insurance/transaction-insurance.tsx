import React from 'react';

export const TransactionInsurance = ({ link }) => {
  return (
    <div className="transaction-insurance">
      <iframe src={link} style={{ width: '100%', height: '100%' }}/>
    </div>
  );
};

export default TransactionInsurance;