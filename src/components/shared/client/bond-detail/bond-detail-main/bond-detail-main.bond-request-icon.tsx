import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useState } from 'react';
import ClientBondTransactionForm from '../../bond-list/bond-list-main/bond-list-main.form-transaction';
import BondDetailRequestIcon from '../icon/bond-company';
import BondDetailRequestMobileIcon from '../icon/bond-company-mobile';

import './bond-list-wrapper.scss';

export const BondRequestIcon = ({ bondDetail }) => {
  const isMobile = useIsMobile();
  const { t } = useHTranslation('common');
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="client-product-detail-bond-content__footer-info">
      <div className="client-product-detail-bond-content__info-wrapper__icon">
        {!isMobile ? (
          <BondDetailRequestIcon />
        ) : (
          <BondDetailRequestMobileIcon />
        )}
      </div>

      <div className="client-product-detail-bond-content__footer-info__button">
        <p>
          {t('Don\'t Miss "Golden Opportunity"', {
            vn: 'Đừng bỏ lỡ “CƠ HỘI VÀNG”',
          })}
        </p>
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          {t('Sign up for a consultation now', { vn: ' Đăng ký tư vấn ngay' })}
        </button>
      </div>

      <ClientBondTransactionForm
        visible={visible}
        closeModal={() => setVisible(false)}
        bondData={bondDetail}
      />
    </div>
  );
};

export default BondRequestIcon;
