import { RightOutlined, StarFilled } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import cls from 'classnames';
import { useState } from 'react';
import { CLIENT_PRODUCT_DETAIL_ROUTE } from '@components/features/client/product-detail/constants';
import { useHTranslation } from '@lib/i18n';
import { LanguageUtils } from '@lib/language-utils';
import { CounsellingRequestDealLoan } from '../product-detail/product-detail-loan/product-detail-loan-form/register-form';

import './home-loan-list-item.module.scss';

const HomeLoanListItemService = ({ label, value, unit }) => (
  <div className="home-loan-list-item__content__service__item">
    <div className="home-loan-list-item__content__service__item__label">
      {label}
    </div>
    <div className="home-loan-list-item__content__service__item__value">
      {value}
    </div>
    <div className="home-loan-list-item__content__service__item__unit">
      {unit}
    </div>
  </div>
);

const HomeLoanListItem = ({ loanData, className = '' }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { name, outstandingAdvantages, info, org, slug } = loanData;
  const { t } = useHTranslation('common');
  const orgImage = org?.image?.url || '';
  return (
    <div className={cls('home-loan-list-item', className)}>
      <div
        className="home-loan-list-item__header"
        style={{
          backgroundColor: org?.backgroundColor || undefined,
        }}
      >
        {orgImage && <img src={orgImage} />}
      </div>
      <div className="home-loan-list-item__content">
        <div className="home-loan-list-item__content__title">{name}</div>
        <div className="home-loan-list-item__content__advantage">
          {outstandingAdvantages && (
            <>
              <StarFilled className="home-loan-list-item__content__advantage__icon" />
              {outstandingAdvantages}
            </>
          )}
        </div>
        <div className="home-loan-list-item__content__service">
          <HomeLoanListItemService
            {...{
              label: t('Preferential rate', {
                en: 'Preferential rate',
                vn: 'Lãi suất',
              }),
              value: `${info?.preferentialRate || 0}%`,
              unit: t('Year', { en: 'Year', vn: 'Năm' }),
            }}
          />
          <Divider
            type="vertical"
            className="home-loan-list-item__content__service__divider"
          />
          <HomeLoanListItemService
            {...{
              label: t('Preferential time', {
                en: 'Preferential time',
                vn: 'Ưu đãi',
              }),
              value: info?.preferentialTime || 0,
              unit: t('Month', { en: 'Month', vn: 'Tháng' }),
            }}
          />
        </div>
        <div className="home-loan-list-item__content__request-button">
          <Button
            {...{
              onClick: () => setVisible(true),
            }}
          >
            {t('Request advice on this loan package', {
              en: 'Request advice on this loan package',
              vn: 'Yêu cầu tư vấn gói vay này',
            })}
          </Button>
        </div>
        <Button
          type="link"
          className="home-loan-list-item__content__detail-button"
          href={`/${LanguageUtils.getCurrentCountry()}/${CLIENT_PRODUCT_DETAIL_ROUTE.LOAN}/${slug}`}
          target={'_blank'}
        >
          {t('See detail', {
            en: 'See detail',
            vn: 'Xem chi tiết',
          })}
          <RightOutlined />
        </Button>
      </div>
      <CounsellingRequestDealLoan
        {...{
          loanData,
          setVisible,
          visible,
        }}
      />
    </div>
  );
};

export default HomeLoanListItem;
