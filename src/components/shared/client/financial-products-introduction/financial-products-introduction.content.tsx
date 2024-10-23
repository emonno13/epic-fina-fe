import { RightOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { Link } from '@components/shared/link';
import { getClientFinancialProductsIntroductionData } from './constants';

const ClientFinancialProductsIntroductionContent = () => {
  const { t } = useHTranslation('common');
  const data = getClientFinancialProductsIntroductionData(t);
  return (
    <div className="client-financial-products-introduction-content">
      {data.map(({ href, label }, index) => (
        <div
          key={`client-financial-products-introduction-content-item-${index}`}
          className="client-financial-products-introduction-content__item"
        >
          <div className="client-financial-products-introduction-content__item__icon">
            <RightOutlined />
          </div>
          <Link href={href}>
            <span className="client-financial-products-introduction-content__item__label">
              {label}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ClientFinancialProductsIntroductionContent;
