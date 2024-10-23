import { useHTranslation } from '@lib/i18n';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { getOverviewGenerateArray } from '../helpers';

const OverView = ({ calc, prepaymentPenalty, firstMonthTotalPay }) => {
  const { query } = useRouter();
  const { t } = useHTranslation('common');
  const isPrePaymentCheck = useMemo(() => {
    const isPrePaymentCheckParam = query?.isPrePaymentCheck;

    return Number(isPrePaymentCheckParam) === 1;
  }, [query]);

  const renderContent = useMemo(() => {
    return getOverviewGenerateArray({
      calc,
      firstMonthTotalPay,
      prepaymentPenalty,
      isPrePaymentCheck,
      t,
    }).map(({ label, value }, index) => (
      <div
        key={`overview-group-${label}-${index}`}
        className="Fn_LoanEstimate_Table_OverView_Group"
      >
        <span>{label}</span>
        <h2>{value} vnđ</h2>
      </div>
    ));
  }, [calc, prepaymentPenalty, firstMonthTotalPay, isPrePaymentCheck]);

  return <div className="Fn_LoanEstimate_Table_OverView">{renderContent}</div>;
};

export default OverView;
