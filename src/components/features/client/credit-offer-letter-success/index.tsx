import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { CheckCircleIcon } from 'icons/rsvgs/check-circle';
import { useRouter } from 'next/router';
import { creditOfferLetterSuccessLinks } from './constants';
import CreditOfferLetterSuccessCard from './credit-offer-letter-success-card';
import CreditOfferLetterLinkItem from './credit-offer-letter-success-link-item';

import './credit-offer-letter-success.module.scss';

const CreditOfferLetterSuccess = () => {
  const { t } = useHTranslation('common');
  const { push } = useRouter();
  return (
    <div className="credit-offer-letter-success">
      <CheckCircleIcon />
      <h2 className="credit-offer-letter-success__title">Thank you!</h2>
      <p className="credit-offer-letter-success__description">
        {t(
          'You have successfully created a loan application. Fina staff will contact you as soon as possible.',
          {
            vn: 'Bạn đã tạo hồ sơ vay thành công. Nhân viên Fina sẽ liên lạc với bạn trong thời gian sớm nhất.',
          },
        )}
      </p>
      <div className="credit-offer-letter-success__footer">
        <CreditOfferLetterSuccessCard
          {...{
            title: t('Contact us', { vn: 'Liên hệ với chúng tôi' }),
          }}
        >
          <div className="credit-offer-letter-success__links">
            {creditOfferLetterSuccessLinks.map((linkConfig, index) => (
              <CreditOfferLetterLinkItem
                key={`credit-offer-letter-success-${index}`}
                {...linkConfig}
              />
            ))}
          </div>
        </CreditOfferLetterSuccessCard>
        <CreditOfferLetterSuccessCard
          {...{
            title: t('Visit our website', { vn: 'Truy cập website chúng tôi' }),
          }}
        >
          <Button
            {...{
              type: 'primary',
              onClick: () => {
                push('/');
              },
            }}
          >
            {t('Home page', { vn: 'Trang chủ' })}
          </Button>
        </CreditOfferLetterSuccessCard>
      </div>
    </div>
  );
};

export default CreditOfferLetterSuccess;
