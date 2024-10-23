import { useHTranslation } from '@lib/i18n';
import ClientLoanCalculatorIntroductionContent from './loan-calculator-introduction.content';

import './loan-calcultor-introduction.module.scss';

const ClientLoanCalculatorIntroduction = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-loan-calculator-introduction">
      <div className="max-w-1100 m-auto">
        <div className="client-loan-calculator-introduction__wrapper">
          <div className="client-loan-calculator-introduction__wrapper__content">
            <h3 className="client-loan-calculator-introduction__wrapper__content__title">
              {t('Loan calculator', { vn: 'Công cụ tính' })}
            </h3>
            <h4 className="client-loan-calculator-introduction__wrapper__content__desc">
              {t(
                'Borrowing to buy a house - land is a credit product to support capital',
                {
                  vn: 'Vay mua nhà - đất là sản phẩm tín dụng nhằm hỗ trợ nguồn vốn',
                },
              )}
              <br />
              {t('help customers pay expenses for the purpose of buying/', {
                vn: 'giúp khách hàng thanh toán các chi phí cho mục đích mua/',
              })}
              <br />
              {t('receiving the transfer of houses and residential land.', {
                vn: 'nhận chuyển nhượng nhà ở, đất ở.',
              })}
            </h4>
            <div className="client-loan-calculator-introduction__wrapper__cover">
              <i />
            </div>
            <ClientLoanCalculatorIntroductionContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLoanCalculatorIntroduction;
