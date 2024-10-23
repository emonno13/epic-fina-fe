import LoanCalculatorWrapper from '@components/shared/client/loan-calculator-wrapper';
import LoanEstimate from '@components/shared/client/loan-estimate';

const ClientLoanEstimate = () => {
  return (
    <LoanCalculatorWrapper>
      <div className="max-w-1100 m-auto">
        <LoanEstimate />
      </div>
    </LoanCalculatorWrapper>
  );
};

export default ClientLoanEstimate;
