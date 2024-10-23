import React, { useState } from 'react';
import FileSaver from 'file-saver';

import { Typography, Divider, notification } from 'antd';
import Image from 'next/image';
import { useHTranslation } from '@lib/i18n';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { CommentUtils } from '@lib/utils/comment';

const CopyIcon = () => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M18.0485 20H7.18744C5.86625 20 4.79162 18.9487 4.79162 17.6562V7.03125C4.79162 5.73877 5.86625 4.6875 7.18744 4.6875H18.0485C19.3696 4.6875 20.4443 5.73877 20.4443 7.03125V17.6562C20.4443 18.9487 19.3696 20 18.0485 20ZM7.18744 6.25C6.74708 6.25 6.38883 6.60046 6.38883 7.03125V17.6562C6.38883 18.087 6.74708 18.4375 7.18744 18.4375H18.0485C18.4888 18.4375 18.8471 18.087 18.8471 17.6562V7.03125C18.8471 6.60046 18.4888 6.25 18.0485 6.25H7.18744ZM3.19442 13.75H2.39581C1.95546 13.75 1.59721 13.3995 1.59721 12.9688V2.34375C1.59721 1.91296 1.95546 1.5625 2.39581 1.5625H13.2568C13.6972 1.5625 14.0554 1.91296 14.0554 2.34375V3.08594H15.6526V2.34375C15.6526 1.05127 14.578 0 13.2568 0H2.39581C1.07462 0 0 1.05127 0 2.34375V12.9688C0 14.2612 1.07462 15.3125 2.39581 15.3125H3.19442V13.75Z"
        fill="#064DD6"
      />
    </svg>
  );
};

const WarningIcon = () => {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
        fill="#FFCA28"
      />
      <path
        d="M7.53824 8.85154C7.54158 9.10441 7.74752 9.30764 8.00041 9.30764C8.2533 9.30764 8.45923 9.10441 8.46258 8.85154L8.51976 4.52627C8.52359 4.23675 8.28995 4 8.00041 4C7.71086 4 7.47722 4.23675 7.48105 4.52627L7.53824 8.85154ZM8.00041 12C8.38052 12 8.66707 11.7247 8.66707 11.3723C8.66707 11.0145 8.38052 10.7447 8.00041 10.7447C7.62614 10.7447 7.33374 11.0145 7.33374 11.3723C7.33374 11.7247 7.62614 12 8.00041 12Z"
        fill="black"
      />
    </svg>
  );
};

const DowndLoadIcon = () => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group">
        <g id="Group_2">
          <g id="Group_3">
            <g id="Group_4">
              <g id="Group_5">
                <path
                  id="Vector"
                  d="M27.2222 35H7.77775C5.70037 35 3.74722 34.191 2.2781 32.7218C0.809041 31.2529 0 29.2997 0 27.2222V25.2777C0 24.2037 0.870512 23.3331 1.94446 23.3331C3.0184 23.3331 3.88891 24.2037 3.88891 25.2777V27.2222C3.88891 28.2609 4.29347 29.2375 5.02786 29.9719C5.76245 30.7065 6.739 31.1111 7.77775 31.1111H27.2222C28.2609 31.1111 29.2374 30.7065 29.9719 29.9719C30.7065 29.2373 31.1111 28.2608 31.1111 27.2222V25.2777C31.1111 24.2037 31.9816 23.3331 33.0555 23.3331C34.1294 23.3331 35 24.2037 35 25.2777V27.2222C35 29.2996 34.191 31.2526 32.7218 32.7218C31.2527 34.191 29.2996 35 27.2222 35ZM17.5 27.2221C17.231 27.2221 16.9749 27.1675 16.7419 27.0688C16.5246 26.977 16.3203 26.8436 16.1416 26.6691C16.1416 26.669 16.1416 26.6689 16.1415 26.6689C16.1402 26.6677 16.1389 26.6664 16.1376 26.6651C16.1373 26.6649 16.1369 26.6644 16.1365 26.664C16.1354 26.6631 16.1345 26.6621 16.1335 26.6611C16.1328 26.6604 16.1322 26.6598 16.1315 26.6591C16.1308 26.6584 16.1299 26.6575 16.1293 26.657C16.128 26.6556 16.1265 26.6541 16.1251 26.6528L8.3473 18.8749C7.58798 18.1156 7.58798 16.8844 8.3473 16.125C9.10662 15.3657 10.3379 15.3656 11.0972 16.125L15.5556 20.5834V1.94446C15.5555 0.870512 16.426 0 17.5 0C18.5739 0 19.4445 0.870512 19.4445 1.94446V20.5833L23.9028 16.125C24.6621 15.3657 25.8934 15.3657 26.6527 16.125C27.412 16.8843 27.412 18.1156 26.6527 18.8749L18.8749 26.6526C18.8735 26.654 18.872 26.6555 18.8707 26.6568C18.8699 26.6575 18.8691 26.6584 18.8685 26.659C18.8678 26.6597 18.8672 26.6602 18.8665 26.6609C18.8656 26.662 18.8645 26.663 18.8635 26.6639C18.8632 26.6642 18.8627 26.6647 18.8624 26.665C18.8612 26.6663 18.8599 26.6676 18.8586 26.6688C18.8585 26.6688 18.8585 26.6689 18.8584 26.6689C18.837 26.6898 18.8154 26.71 18.7932 26.7297C18.6304 26.8749 18.4491 26.9882 18.2573 27.069C18.2566 27.0693 18.2561 27.0696 18.2554 27.0698C18.2547 27.0701 18.2541 27.0705 18.2533 27.0707C18.0216 27.1683 17.7671 27.2221 17.5 27.2221V27.2221Z"
                  fill="#4E5A65"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const BILLING_PAYMENT_OPTIONS = [
  {
    label: 'FINAPAY',
    value: 1,
    content: (
      <div>
        <Image
          src={'/assets/images/FinaPay-logo.png'}
          alt="FinaPay"
          width={106}
          height={26}
        />
      </div>
    ),
  },
  {
    label: 'PAYME',
    value: 2,
    content: (
      <div>
        <Image
          src={'/assets/images/PayMe-logo.png'}
          alt="PayMe"
          width={106}
          height={26}
        />
      </div>
    ),
  },
  {
    label: 'BANKING',
    value: 3,
    content: (
      <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
        <Typography.Text>Chuyển khoản Ngân Hàng</Typography.Text>
      </div>
    ),
  },
];

export const BillingPaymentInsurance = ({ totalAmount }) => {
  const { t } = useHTranslation('common');
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [step, setStep] = useState(1);

  const handleCopy = () => {
    CommentUtils.copyToClipboard(
      window.location.href,
      t('Successfully copied href to clipboard', { vn: 'Đã copy link' }),
    );
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    notification.success({ message: 'Copied!' });
  };

  return (
    <>
      {step === 1 && (
        <div>
          <h2 className="buying-insurance-modal-title">
            Chọn phương thức thanh toán
          </h2>
          <div
            className="cus-radio"
            onChange={(event) => {
              setPaymentMethod(Number((event as any).target.value));
            }}
          >
            {BILLING_PAYMENT_OPTIONS.map((item, idx) => {
              return (
                <label
                  htmlFor={`r-${idx}`}
                  key={idx}
                  className={paymentMethod === item.value ? 'checked' : ''}
                >
                  {item.content}
                  <input
                    id={`r-${idx}`}
                    type="radio"
                    name="payment-radio"
                    checked={paymentMethod === item.value}
                    value={item?.value}
                  />
                </label>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="buying-insurance-modal__billing-payment-step-2">
          <div className="qr-code-container">
            <h2 className="title">Thanh toán nhanh qua QR Code</h2>
            <div className="instruction-title">Hướng dẫn chuyển khoảng</div>
            <div className="qr-code-payment-instruction-img-container">
              <div className="qr-code-box">
                <Image
                  id="qr-code"
                  src={'/assets/images/Fina-Payment-QR-Code.png'}
                  alt="PayMe"
                  layout="fixed"
                  width={102}
                  height={102}
                />
              </div>
              <div className="img-download-container">
                <HButton
                  className="download-icon-btn"
                  type="text"
                  icon={<DowndLoadIcon />}
                  onClick={() => {
                    if ((document as any).getElementById('qr-code').src) {
                      FileSaver.saveAs(
                        (document as any).getElementById('qr-code').src ||
                          'null_url',
                        'image.jpg',
                      );
                    } else {
                      notification.error({
                        message: 'Can not download the image',
                      });
                    }
                  }}
                />
                <Typography.Text>Tải về ảnh QR</Typography.Text>
              </div>
            </div>
            <div className="text-info">
              <WarningIcon />
              <Typography.Text>
                Một số Ngân hàng chưa hỗ trợ quét mã QR
              </Typography.Text>
            </div>
            <div className="text-info">
              <WarningIcon />
              <Typography.Text>
                Vui lòng đối chiếu lại thông tin trước khi chuyển khoảng
              </Typography.Text>
            </div>
          </div>

          <h2 className="banking-option-title">
            Hoặc chuyển khoảng qua tài khoản ngân hàng
          </h2>

          <div className="banking-info-container">
            <div className="detail-container">
              <div className="content">
                <p className="title">Ngân hàng</p>
                <p className="name">Standard Chartered</p>
              </div>
              <HButton
                className="download-icon-btn"
                type="text"
                icon={<CopyIcon />}
                onClick={() => copyText('Standard Chartered')}
              />
            </div>
            <Divider className="divider" />
            <div className="detail-container">
              <div className="content">
                <p className="title">Số tài khoản</p>
                <p className="name">123123123123123</p>
              </div>
              <HButton
                className="download-icon-btn"
                type="text"
                icon={<CopyIcon />}
                onClick={() => copyText('123123123123123')}
              />
            </div>
            <Divider className="divider" />
            <div className="detail-container">
              <div className="content">
                <p className="title">Tài khoản</p>
                <p className="name">
                  Công ty cổ phần Dịch vụ Tài chính Bất động sản Tulip
                </p>
              </div>
              <HButton
                className="download-icon-btn"
                type="text"
                icon={<CopyIcon />}
                onClick={() =>
                  copyText(
                    'Công ty cổ phần Dịch vụ Tài chính Bất động sản Tulip',
                  )
                }
              />
            </div>
            <Divider className="divider" />
            <div className="detail-container">
              <div className="content">
                <p className="title">Tên chi nhánh</p>
                <p className="name">TP.HCM</p>
              </div>
              <HButton
                className="download-icon-btn"
                type="text"
                icon={<CopyIcon />}
                onClick={() => copyText('TP.HCM')}
              />
            </div>
            <Divider className="divider" />
            <div className="text-info">
              <WarningIcon />
              <Typography.Text>
                Vui lòng đối chiếu lại thông tin trước khi chuyển khoảng
              </Typography.Text>
            </div>
          </div>
        </div>
      )}

      <div className="buying-insurance-modal-result-total">
        <span>Tổng tiền:</span>
        <span className="money">{totalAmount?.label}</span>
      </div>

      <div className="buying-insurance-modal-actions">
        <HButton type="ghost" onClick={() => handleCopy()}>
          Chia sẻ
        </HButton>
        <HButton
          type="primary"
          onClick={() => {
            if (step === 1) setStep(2);
            if (step === 2) console.log('do something');
          }}
        >
          {step === 1 ? 'Mua bảo hiểm' : 'Tiếp tục'}
        </HButton>
      </div>
    </>
  );
};

export default BillingPaymentInsurance;
