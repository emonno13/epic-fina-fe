import LoanCalc from '@components/shared/client/loan-calculator';
import LoanCalculatorWrapper from '@components/shared/client/loan-calculator-wrapper';
import { useEffect } from 'react';

const ClientEmbededCalculator = () => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <LoanCalculatorWrapper>
      <LoanCalc isEmbeded />
    </LoanCalculatorWrapper>
  );
};

export default ClientEmbededCalculator;
