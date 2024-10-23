import { formatMoney } from '../loan-calculator/utils';

export const LOAN_ESTIMATE_COLUMNS = ({ isMobile, t }) => [
  {
    title: t('Period', { vn: 'Kỳ' }),
    dataIndex: 'period',
    width: 80,
    align: 'center',
    fixed: isMobile ? 'left' : null,
  },
  {
    title: t('Opening Trade Receivable', { vn: 'Dư nợ đầu kỳ' }),
    dataIndex: 'startingBalance',
    render: val => formatMoney(val, ''),
  },
  {
    title: t('Principal payment', { vn: 'Trả gốc trong kỳ' }),
    dataIndex: 'principlePayment',
    render: val => formatMoney(val, ''),
  },
  {
    title: t('Interest payment', { vn: 'Trả lãi trong kỳ' }),
    dataIndex: 'interestPayment',
    render: val => formatMoney(val, ''),
  },
  {
    title: t('Total payment', { vn: 'Số tiền trả trong kỳ' }),
    dataIndex: 'totalPaymentPerMonth',
    width: 200,
    render: val => formatMoney(val, ''),
  },
  {
    title: t('Closing Trade Payable', { vn: 'Dư nợ cuối kỳ' }),
    dataIndex: 'endingBalance',
    render: val => formatMoney(val, ''),
  },
];
