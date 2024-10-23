import { useHTranslation } from '@lib/i18n';
import BankComponent from './banks';
import CheckIcon from './icon/check';
import StarIcon from './icon/star';

import './loan-by-product.module.scss';

const LoanByProduct = (props: any) => {
  const { t } = useHTranslation('common');
  const { data } = props?.data;

  if (!data) return <></>;

  return (
    <div className="loan-by-product-container">
      <div className="banner">
        <div className="warp-container">
          <p className="banner__title">{data?.name}</p>
          {data?.outstandingAdvantages && (
            <div className="banner__des">
              <StarIcon />{' '}
              <div className="banner__label">{data?.outstandingAdvantages}</div>
            </div>
          )}
          {data?.advantages && (
            <div className="banner__des">
              <StarIcon />{' '}
              <div className="banner__label">{data?.advantages}</div>
            </div>
          )}
        </div>
      </div>

      <div className="warp-content describe">
        <p className="describe__title">{t('Description', { vn: 'Mô tả' })}:</p>
        <p className="describe__value">{data?.description}</p>
      </div>

      <div className="warp-content" style={{ padding: '80px 0' }}>
        <p className="warp-content__title">
          {t('Description', { vn: 'Các gói ưu đãi' })}
        </p>
        <BankComponent banks={data?.productDetails} />
      </div>

      <div className="warp-content privacy">
        <p className="warp-content__title">
          {t('Description', { vn: 'Quyền lợi cộng tác viên' })}
        </p>
        <div className="privacy__des item-center">
          <CheckIcon />{' '}
          <span className="privacy__label">
            Hoa hồng từ 1 đến 3% giá trị mỗi lần giải ngân
          </span>
        </div>
        <div className="privacy__des item-center">
          <CheckIcon />{' '}
          <span className="privacy__label">
            Hoa hồng dành cho việc giới thiệu khách vào hệ thống
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoanByProduct;
