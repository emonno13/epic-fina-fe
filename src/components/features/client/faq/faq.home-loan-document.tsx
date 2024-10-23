import { useHTranslation } from '@lib/i18n';

const ClientFaqHomeLoanDocument = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-faq-panel-wrap">
      <p>
        <span style={{ fontWeight: 'bold' }}>
          {t('Personal profile:', { vn: 'Hồ sơ nhân thân:' })}
        </span>
        <br />• {t('ID/Passport', { vn: 'CMND/CCCD/Hộ chiếu' })}
        <br />• {t('Household registration or KT3', { vn: 'Hộ khẩu hoặc KT3' })}
        <br />•{' '}
        {t('Certificate of marital status (Married or single..)', {
          vn: 'Giấy xác nhận tình trạng hôn nhân (Đã kết hôn hoặc độc thân..)',
        })}
        <br />•{' '}
        {t('Documents proving the purpose of using capital', {
          vn: 'Giấy tờ chứng minh mục đích sử dụng vốn',
        })}
        <br />•{' '}
        {t("Loan application form (according to the Bank's available form)", {
          vn: 'Giấy đề nghị vay vốn (theo mẫu sẵn của Ngân hàng)',
        })}
        <br />• {t('Sale contract', { vn: 'Hợp đồng mua bán' })}
        <br />•{' '}
        {t('Proof of payment of the times paid with own capital', {
          vn: 'Chứng từ nộp tiền các lần đã thanh toán với vốn tự có',
        })}
        <br />•{' '}
        {t(
          'Certificate of ownership & legal documents of the land to be purchased',
          {
            vn: 'Giấy chứng nhận quyền sở hữu & hồ sơ pháp lý của nhà đất dự định mua',
          },
        )}
        <br />
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {t('Profile of income source for debt repayment', {
            vn: 'Hồ sơ nguồn thu nhập trả nợ',
          })}
        </span>
        <br />•{' '}
        {t('For income from salary:', {
          vn: 'Đối với nguồn thu đến từ lương:',
        })}
        <br />-{' '}
        {t(
          'Expired labor contract or decision on admission (for civil servants without labor contract)',
          {
            vn: 'Hợp đồng lao động còn hạn hoặc Quyết định tiếp nhận (đối với công chức không có HĐLĐ)',
          },
        )}
        <br />-{' '}
        {t(
          'Salary statement (if receiving salary via Bank) or Salary slip or monthly salary sheet (signed by head of unit)',
          {
            vn: 'Sao kê khoản lương (nếu nhận lương qua Ngân hàng) hoặc Phiếu lĩnh lương hoặc Bảng lương hàng tháng (có chữ ký từ trưởng đơn vị)',
          },
        )}
        <br />
        <br />•{' '}
        {t('For income from property rental:', {
          vn: 'Đối với nguồn thu từ cho thuê tài sản:',
        })}
        <br />-{' '}
        {t('Rental agreement (photocopy)', {
          vn: 'Hợp đồng cho thuê (bản photo)',
        })}
        <br />-{' '}
        {t(
          'Proof of receipt of monthly rent (Watch book, money receipt or bank account statement..)',
          {
            vn: 'Giấy tờ chứng minh nhận được tiền thuê hàng tháng (Sổ sách theo dõi, biên nhận tiền hoặc sao kê tài khoản ngân hàng..)',
          },
        )}
        <br />-{' '}
        {t(
          'Proof of your ownership of the rental property (Vehicle registration, Red book...)',
          {
            vn: 'Giấy tờ chứng minh quyền sở hữu của bạn với tài sản cho thuê (Đăng ký xe, Sổ đỏ...)',
          },
        )}
        <br />
        <br />•{' '}
        {t('For income from business/household business:', {
          vn: 'Đối với nguồn thu từ kinh doanh/hộ kinh doanh:',
        })}
        <br />-{' '}
        {t(
          'Venue/stall rental contract (if the business location is owned by someone else)',
          {
            vn: 'Hợp đồng cho thuê địa điểm/sạp bán hàng (nếu địa điểm kinh doanh là của người khác)',
          },
        )}
        <br />-{' '}
        {t(
          'Business registration papers, license tax payment receipts, import/sales invoices (if any)...',
          {
            vn: 'Giấy tờ đăng ký kinh doanh, biên lai nộp thuế môn bài, các hoá đơn nhập/bán hàng (nếu có)...',
          },
        )}
        <br />
        <br />•{' '}
        {t('For income from business capital contribution to enterprises:', {
          vn: 'Đối với nguồn thu từ góp vốn kinh doanh vào các doanh nghiệp:',
        })}
        <br />-{' '}
        {t('Business registration certificate of the enterprise (photocopy)', {
          vn: 'Giấy đăng ký kinh doanh của doanh nghiệp (Bản photo)',
        })}
        <br />-{' '}
        {t(
          'Minutes of the meeting of the Board of Directors (For joint-stock companies) or the Board of members (For limited companies) on dividend/interest distribution',
          {
            vn: 'Biên bản họp hội đồng quản trị (Đối với công ty cổ phần) hoặc hội đồng thành viên (Đối với công ty TNHH) về việc chia cổ tức/lợi tức',
          },
        )}
        <br />-{' '}
        {t('Financial statements of the company (if any)', {
          vn: 'Báo cáo tài chình của công ty (nếu có)',
        })}
        <br />
      </p>
    </div>
  );
};

export default ClientFaqHomeLoanDocument;
