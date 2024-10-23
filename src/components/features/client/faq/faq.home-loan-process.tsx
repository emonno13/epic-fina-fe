import { useHTranslation } from '@lib/i18n';

const ClientFaqHomeLoanProcess = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-faq-panel-wrap">
      <p>
        <span style={{ fontWeight: 'bold' }}>
          {t('Step 1: Prepare documents including:', {
            en: 'Bước 1: Chuẩn bị hồ sơ gồm:',
          })}
        </span>
        • {t('Personal Profile', { vn: 'Hồ sơ nhân thân' })}
        <br />•{' '}
        {t('Documents proving the purpose of the loan', {
          vn: 'Hồ sơ chứng minh mục đích vay vốn',
        })}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('Step 2: Appraisal and valuation of the property:', {
            vn: 'Bước 2: Thẩm định và định giá tài sản:',
          })}
        </span>
        <br />
        {t(
          'Depending on the chosen loan method, the bank will conduct an appraisal and valuation of your collateral. The appraisal process usually includes:',
          {
            vn: 'Tuỳ theo phương thức vay đã chọn, ngân hàng sẽ tiến hành thẩm định và định giá tài sản thế chấp của Quý khách. Quy trình thẩm định thường gồm:',
          },
        )}
        <br />•{' '}
        {t('Check your credit history and credit score', {
          vn: 'Kiểm tra lịch sử tín dụng và điểm tín dụng của Quý khách',
        })}
        <br />•{' '}
        {t('Appraisal by phone exchange', {
          vn: 'Thẩm định qua trao đổi điện thoại',
        })}
        <br />•{' '}
        {t(
          'Physical assessment of residence, place of work/business and field trip to assess collateral (if any)',
          {
            vn: 'Thẩm định thực tế nơi cư trú, nơi làm việc/kinh doanh và đi thực địa để định giá tài sản thế chấp (nếu có)',
          },
        )}
        <br />
        {t(
          "Valuation costs may be paid by the Bank or by the customer depending on the Bank's regulations. Valuation value",
          {
            vn: 'Chi phí định giá có thể do Ngân hàng hoặc khách hàng trả tuỳ vào quy định của Ngân hàng. Giá trị định giá',
          },
        )}
        <br />
        {t(
          'Collateral will be the basis for determining the amount of the loan.',
          {
            vn: 'tài sản thế chấp sẽ là cơ sở xác định khoản tiền vay là ít hay nhiều.',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('Step 3: Choose a loan package, proceed with disbursement', {
            vn: 'Bước 3: Chọn gói vay, tiến hành giải ngân',
          })}
        </span>
        <br />
        {t(
          'If the application meets the loan conditions, the Bank will notify the credit granting and carry out the loan disbursement procedures. At this point, there will be 2 cases:',
          {
            vn: 'Nếu hồ sơ đáp ứng được các điều kiện vay vốn, Ngân hàng sẽ thông báo cấp tín dụng và tiến hành các thủ tục giải ngân khoản vay. Đến lúc này sẽ có 2 trường hợp xảy ra:',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('Completed the process of transferring real estate:', {
            vn: 'Đã hoàn thành thủ tục sang tên nhà đất:',
          })}
        </span>
        <br />
        {t(
          'The parties will sign a mortgage contract (notarized) and register the secured transaction at a competent state agency (local land registration office). The bank will keep the original certificate of ownership (red book, pink book…) before disbursing to customers.',
          {
            vn: 'Các bên sẽ ký hợp đồng thế chấp (có công chứng) và đăng ký giao dịch đảm bảo tại cơ quan nhà nước có thẩm quyền (văn phòng đăng ký đất đai của địa phương). Ngân hàng sẽ giữ lạ bản chính giấy chứng nhận quyền sở hữu (sổ đỏ, sổ hồng…) trước khi giải ngân cho khách hàng.',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('', { vn: 'Chưa hoàn thành thủ tục sang tên đất:' })}
        </span>
        <br />
        {t(
          'You and the seller together with the Bank will sign a tripartite agreement on the disbursement of the amount disbursed to the buyer. After completing the credit contract, the Bank will disburse the loan into the savings book/temporary locked account in the name of the seller, and block all this amount while the two parties are buying and selling. transfer procedure. The bank will release the temporarily locked account for the seller after the buyer signs the public mortgage contract, and registers the secured transaction according to regulations.',
          {
            vn: 'Quý khách và bên bán cùng với Ngân hàng sẽ tiến hành ký thoả thuận ba bên về việc giải ngân phong toả khoản tiền giải ngân cho bên mua. Sau khi hoàn thành hợp đồng tín dụng, Ngân hàng sẽ tiến hành giải ngân khoản vay vào sổ tích kiệm/tài khoản tạm khoá đứng tên của bên bán, và phong toả toàn bộ số tiền này trong khi hai bên mua và bán thực hiện thủ tục sang tên. Ngân hàng sẽ giải toả tài khoản tạm khoá cho bên bán sau khi bên mua ký hợp đồng thế chấp công chứ, và thực hiện đăng ký giao dịch đảm bảo theo quy định.',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('Step 4: Credit monitoring and contract liquidation:', {
            vn: 'Bước 4: Giám sát tín dụng và thanh lý hợp đồng:',
          })}
        </span>
        <br />
        {t(
          "During the entire loan period, the bank will regularly check the customer's loan use to see if it is used for the right purpose, and at the same time ensure that the customer is still able to pay the above debt. The loan process only ends when you pay off the principal and interest to the bank",
          {
            vn: 'Trong cả thời gian vay, ngân hàng sẽ thường xuyên kiểm tra tình hình sử dụng khoản vay của khách hàng xem có sử dụng đúng mục đích hay không, đồng thời đảm bảo khách hàng vẫn đủ khả năng trả khoản nợ trên. Quy trình vay tiền chỉ kết thúc khi bạn trả hết số nợ gốc và lãi cho ngân hàng',
          },
        )}
      </p>
    </div>
  );
};

export default ClientFaqHomeLoanProcess;
