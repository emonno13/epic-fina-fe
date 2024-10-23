import numeral from 'numeral';

export const getOverviewGenerateArray = ({
  calc,
  firstMonthTotalPay,
  prepaymentPenalty,
  isPrePaymentCheck,
  t,
}) => {
  const { propertyPrice, ratio } = calc;
  const result = [
    {
      label: t('Asset value', { vn: 'Giá trị tài sản' }),
      value: numeral(propertyPrice).format('0,0,0,0'),
    },
    {
      label: t('Loan value', { vn: 'Giá trị khoản vay' }),
      value: numeral(propertyPrice * ratio).format('0,0,0,0') || 0,
    },
    {
      label: t('Amount to be paid for the first month', { vn: 'Số tiền phải trả tháng đầu tiên' }),
      value: firstMonthTotalPay,
    },
  ];

  if (isPrePaymentCheck) {
    result.splice(2, 0, {
      label: t('Early repayment fee', { vn: 'Phí trả nợ trước hạn' }),
      value: prepaymentPenalty,
    });
  }

  return result;
};
