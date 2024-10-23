import { useHTranslation } from '@lib/i18n';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { IconBack } from './icons/icon-back';
import { IconLinkAffiliate } from './icons/icon-link-affiliate';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Detail = ({ back, partner, currentUser, openModal }) => {
  const { t } = useHTranslation('admin-common');
  const [numPages, setNumPages] = useState<number>();
  const onSuccess = (sample?: any) => {
    setNumPages(1);
  };

  console.log('currentUser', currentUser);

  return (
    <div className="profile-affiliate-detail">
      <div className="profile-affiliate-detail-title">
        <div
          onClick={() => {
            back();
          }}
        >
          <IconBack />
        </div>
        <h2>{t(partner?.name, { vn: partner?.name })}</h2>
      </div>
      <div className="profile-affiliate-detail-info">
        <div className="profile-affiliate-detail-info-user">
          <img src={partner?.icon} alt="" width={115} height={115} />
          <div>
            <div className="item">
              <div className="title">Chủ tài khoản</div>
              <div className="value">{currentUser?.fullName}</div>
            </div>
            <div className="item">
              <div className="title">Mã tài khoản</div>
              <div className="value">{currentUser?.investmentNumber}</div>
            </div>
            <div className="item">
              <div className="title">Ngày đăng ký</div>
              <div className="value">{'_'}</div>
            </div>
            <div className="item">
              <div className="title">Số lượng giao dịch</div>
              <div className="value"></div>
            </div>
          </div>
        </div>

        <button
          className="profile-affiliate-detail-info-button"
          onClick={() => {
            openModal();
          }}
        >
          <IconLinkAffiliate /> <span>Huỷ liên kết</span>
        </button>
      </div>

      <div className="profile-affiliate-detail-contract">
        <div className="profile-affiliate-detail-contract-title">
          Hợp đồng giao dịch
        </div>

        <div className="profile-affiliate-detail-contract-body">
          <Document
            file={currentUser?.contractFileUrlMio}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              onSuccess();
            }}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default Detail;
