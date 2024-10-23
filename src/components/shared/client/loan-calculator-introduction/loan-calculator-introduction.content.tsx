import { RightOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { Link } from '@components/shared/link';
import { getClientLoanCalculatorIntroductionData } from './constants';

const ClientLoanCalculatorIntroductionContent = () => {
  const { t } = useHTranslation('common');
  const data = getClientLoanCalculatorIntroductionData(t);
  return (
    <div className="client-loan-calculator-introduction-content">
      {data.map(({ href, label }, index) => (
        <div
          key={`client-loan-calculator-introduction-content-item-${index}`}
          className="client-loan-calculator-introduction-content__item"
        >
          <div className="client-loan-calculator-introduction-content__item__icon">
            <RightOutlined />
          </div>
          <Link href={href}>
            <span className="client-loan-calculator-introduction-content__item__label">
              {label}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ClientLoanCalculatorIntroductionContent;
