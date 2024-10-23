import { useHTranslation } from '@lib/i18n';

const ClientFaqHomeLoanForm = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-faq-panel-wrap">
      <p>
        <span style={{ fontWeight: 'bold' }}>
          • {t('Mortgage loan', { vn: 'Vay thế chấp' })}:
        </span>
        {t(
          ' is a type of using the house you intend to buy or using existing assets as collateral for a loan. The advantage is that you can borrow a large amount of money depending on the value of the property, the loan period is long',
          {
            vn: ' là loại hình dùng chính căn nhà dự định mua hoặc dùng tài sản có sẵn để thế chấp khoản vay. Ưu điểm là có thể vay được khoản tiền lớn tuỳ theo giá trị tài sản, thời gian vay dài',
          },
        )}
      </p>
      <p>
        <span style={{ fontWeight: 'bold' }}>
          • {t('Unsecured loan', { vn: 'Vay tín chấp' })}:
        </span>
        {t(
          ' is a type of loan without collateral, mainly based on the creditworthiness of the borrower. The disadvantage of this type of loan is that it is not possible to borrow too much money, the loan period is short, and the interest rate is high.',
          {
            vn: ' là loại hình vay không thế chấp tài sản, chủ yếu dựa vào sự uy tín của người vay. Nhược điểm của loại hình này là không thể vay số tiền quá lớn, thời gian vay ngắn, lãi suất cao.',
          },
        )}
      </p>
    </div>
  );
};

export default ClientFaqHomeLoanForm;
