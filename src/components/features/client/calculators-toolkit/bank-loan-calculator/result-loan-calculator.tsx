import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';

const ResultLoanCalculator = ({ dataBankLoanCalculator, loading }) => {
  const { t } = useHTranslation('calculator-toolkit');

  return (
    // <Spin spinning={loading}>
    <div className="bank-loan-calculator-result">
      <h2>
        {t('youCanBorrow')}
        <span>
          {ConverterUtils.formatNumber(
            Math.floor(dataBankLoanCalculator?.loanableAmount),
          )}{' '}
          đ
        </span>
      </h2>
      <p>
        {t('loanTerm')}
        <span>
          {dataBankLoanCalculator?.totalYear} {t('year')}
        </span>
      </p>
      <p>
        {t('interestRate')}
        <span>
          {dataBankLoanCalculator?.realInterestRate
            ? Math.round(dataBankLoanCalculator?.realInterestRate * 100) / 100
            : 0}{' '}
          %
        </span>
      </p>
      <p>
        {t('monthlyPrincipalRepayment')}
        <span>
          {ConverterUtils.formatNumber(
            Math.floor(dataBankLoanCalculator?.rootMonthlyPayment),
          )}{' '}
          đ
        </span>
      </p>
      <p>
        {t('firstMonthInterestPayment')}
        <span>
          {ConverterUtils.formatNumber(
            Math.floor(dataBankLoanCalculator?.interestMonthlyPayment),
          )}{' '}
          đ
        </span>
      </p>
    </div>
    // </Spin>
  );
};

export default ResultLoanCalculator;
