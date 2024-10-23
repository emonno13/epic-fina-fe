import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@lib/utils/mobile';
import { useClientDocumentDetail } from '@schema-form/client-features/hooks/client-feature-hook';
import { useEffect, useState } from 'react';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';
import CreditOfferLetterContainer from '../credit-offer-letter-container';

import './credit-offer-letter-next-step.module.scss';

const CreditOfferLetterNextStep = () => {
  const taskData = useClientDocumentDetail();
  const { user = {}, contentLetter = {} } = taskData;
  const { documents = [] } = contentLetter;
  const { emails, tels } = user;
  const [origin, setOrigin] = useState<any>('');
  useEffect(() => {
    window.addEventListener('load', () => {
      setOrigin(window ? window.location.origin : 'fina.com.vn');
    });
  }, []);

  return (
    <div id="next-step">
      <CreditOfferLetterContainer className="small">
        <CreditOfferLetterBodyContainer title="Các bước tiếp theo">
          <div className="credit-offer-letter-next-step">
            <div className="credit-offer-letter-next-step__flow">
              <div className="credit-offer-letter-next-step__flow__step">
                <p>
                  <strong>Bước 1:</strong> Chuẩn bị một số hồ sơ:
                </p>
                <ul>
                  {documents.map((document, index) => (
                    <li key={`${document}-${index}`}>{document}</li>
                  ))}
                </ul>
              </div>
              <div className="credit-offer-letter-next-step__flow__step">
                <p>
                  <strong>Bước 2:</strong> Làm việc trực tiếp với Nhân viên
                  FINA/Nhân viên Ngân Hàng. Quý khách vui lòng sắp xếp thời gian
                  để làm việc cùng các nhân sự trực tiếp xử lý hồ sơ cho quý
                  khách.
                </p>
              </div>
              <div className="credit-offer-letter-next-step__flow__step">
                <p>
                  <strong>Bước 3:</strong> Theo dõi hồ sơ
                </p>
              </div>
            </div>
            <p>
              Để theo dõi tiến độ hồ sơ anh chị đăng nhập tại website{' '}
              <a href="/users/login">https://fina.com.vn/dang-nhap</a>
              <br />
              hoặc qua tải App FINA tại
            </p>
            <div className="download-images">
              <a
                {...{
                  target: '_blank',
                  rel: 'noopener',
                  href: GOOGLE_PLAY_LINK,
                }}
              >
                <img src="/assets/images/alternate-download-on-google-play.png" />
              </a>
              <a
                {...{
                  target: '_blank',
                  rel: 'noopener',
                  href: APP_STORE_LINK,
                }}
              >
                <img src="/assets/images/alternate-download-on-app-store.png" />
              </a>
            </div>
            <p>hoặc scan QR Code dưới đây:</p>
            <img
              width="120"
              height="120"
              src="/assets/images/app-links-qr-image.jpeg"
            />
            <div className="user-account">
              <p>
                <span>User đăng nhập:</span>{' '}
                {tels?.[0]?.tel || emails?.[0]?.email || ''}
              </p>
              <p>
                <span>Pass:</span> đã cấp. Trường hợp quên mật khẩu, vui lòng
                click vào{' '}
                <a
                  href={`${origin}/users/forgot-password`}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  đây
                </a>
              </p>
            </div>
          </div>
        </CreditOfferLetterBodyContainer>
      </CreditOfferLetterContainer>
      <div className="credit-offer-letter-next-step-image">
        <img
          className="credit-offer-letter-next-step__footer"
          src="/assets/images/credit-offer-letter-next-step-footer.png"
        />
      </div>
    </div>
  );
};

export default CreditOfferLetterNextStep;
