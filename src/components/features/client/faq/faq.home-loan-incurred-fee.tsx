import { useHTranslation } from '@lib/i18n';

const ClientFaqHomeLoanIncurredFee = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-faq-panel-wrap">
      <p>
        <span style={{ fontWeight: 'bold' }}>
          {t('Notarization and certification fees:', {
            vn: 'Phí công chứng, chứng thực:',
          })}
        </span>
        <br />
        {t(
          'Is the type of fee that customers have to pay when certifying loan documents. After paying this fee, the loan document will be effective.',
          {
            vn: 'Là loại phí khách hàng phải trả khi làm chứng thực cho các hồ sơ vay vốn. Sau khi thanh toán phí này thì giấy tờ vay vốn sẽ có hiệu lực.',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('Secured transaction registration fee:', {
            vn: 'Phí đăng ký giao dịch bảo đảm:',
          })}
        </span>
        <br />
        {t(
          "This fee is to ensure that the customer's apartment will be transacted at the bank, this fee will be collected by the lending bank to pay to the transaction registrant.",
          {
            vn: 'Mức phí này để đảm bảo căn hộ của khách hàng sẽ được giao dịch tại ngân hàng, số tiền phí này sẽ được ngân hàng cho vay vốn thu hộ để nộp cho bên đăng ký giao dịch đảm bảo.',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('', { vn: 'Phí mở tài khoản ngân hàng:' })}
        </span>
        <br />
        {t(
          'When applying for a loan with a bank, you need to open an account at that bank so that you can receive the disbursement package after completing the procedures.',
          {
            vn: 'Khi đăng ký vay vốn với một ngân hàng, quý khách cần mở tài khoản tại ngân hàng đó để có thể nhận được gói giải ngân sau khi hoàn thành các thủ tục.',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('Property insurance premium:', { vn: 'Phí bảo hiểm tài sản:' })}
        </span>
        <br />
        {t(
          "Property insurance premium: to ensure the integrity of the mortgaged property against possible incidents such as fire, explosion, natural disaster, flood, theft, etc., destroying the property. At that time, the insurer will stand responsible for the borrower's assets to help the bank not lose the collateral.",
          {
            vn: 'Phí bảo hiểm tài sản: nhằm đảm bảo tính toàn vẹn của tài sản thế chấp trước những sự cố có thể xảy ra như cháy nổ, thiên tai, lũ lụt, trộm cắp... làm huỷ hoại tài sản. Khi đó, bên bảo hiểm sẽ đứng ra chịu trách nhiệm với tài sản của người vay nhằm giúp ngân hàng không bị thất thoát tài sản đảm bảo.',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('Early repayment fee:', { vn: 'Phí trả nợ trước hạn:' })}
        </span>
        <br />
        {t(
          'For loans where the customer has enough financial capacity to pay off early or prepay a part of the loan, the lender will charge an early penalty fee corresponding to the number of years that the customer has pay off part of the loan.',
          {
            vn: 'Đối với những khoản vay mà khách hàng có đủ khả năng tài chính để tất toán sớm hoặc trả trước kỳ hạn một phần tiền vay thì bên đơn vị cho vay sẽ tính một khoản phí phạt trước hạn tương ứng theo số năm mà khách hàng đã chi trả một phần khoản vay.',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('Late payment fee:', { vn: 'Phí thanh toán chậm:' })}
        </span>
        <br />
        {t(
          'During the loan process, there may be cases of late payment compared to the set time due to objective or subjective factors, the lender will charge an additional penalty fee for late payment (also known as late payment penalty). interest rate on overdue debt).',
          {
            vn: 'Trong quá trình vay vốn, sẽ có thể xảy ra những trường hợp thanh toán chậm so với thời hạn đã định do yếu tố khách quan hoặc chủ quan thì đơn vị cho vay sẽ tính thêm một khoản phí phạt thanh toán chậm (hay còn gọi là lãi suất trả nợ quá hạn).',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('Property appraisal fee:', { vn: 'Phí thẩm định tài sản:' })}
        </span>
        <br />
        {t(
          'Property appraisal fee occurs in case the customer chooses to mortgage the property (house, apartment, vehicle, etc.) to the Bank. The purpose of this fee is so that the Bank can re-assess the assets and accurately determine the maximum amount that customers can borrow.',
          {
            vn: 'Phí thẩm định tài sản xảy ra trong trường hợp khách hàng lựa chọn hình thức vay thế chấp tài sản (nhà đất, nhà chung cư, phương tiện di chuyển…) cho Ngân hàng. Mục đích của mức phí này nhằm để Ngân hàng có thể tái thẩm định tài sản và xác định chính xác số tiền tối đa khách hàng có thể được vay.',
          },
        )}
      </p>
    </div>
  );
};

export default ClientFaqHomeLoanIncurredFee;
