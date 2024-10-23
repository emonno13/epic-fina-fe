import { useHTranslation } from '@lib/i18n';
import ClientFinancialProductsIntroductionContent from './financial-products-introduction.content';

import './financial-products-introduction.module.scss';

const ClientFinancialProductsIntroduction = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-financial-products-introduction">
      <div className="max-w-1100 m-auto">
        <div className="client-financial-products-introduction__wrapper">
          <div className="client-financial-products-introduction__wrapper__content">
            <h3 className="client-financial-products-introduction__wrapper__content__title">
              {t('Financial products', { vn: 'Sản phẩm tài chính' })}
            </h3>
            <p className="client-financial-products-introduction__wrapper__content__desc">
              {t("FINA's financial products are unique", {
                vn: 'Những sản phẩm tài chính của FINA là những sản phẩm độc đáo',
              })}
              <br />
              {t('and unique on the market today.', {
                vn: 'và duy nhất trên thị trường hiện nay.',
              })}
            </p>
            <ClientFinancialProductsIntroductionContent />
          </div>
          <div className="client-financial-products-introduction__wrapper__cover">
            <i />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFinancialProductsIntroduction;
