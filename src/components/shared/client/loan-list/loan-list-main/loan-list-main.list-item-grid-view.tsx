import { StarFilled, CheckOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { useMemo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { CLIENT_PRODUCT_DETAIL_ROUTE } from '@components/features/client/product-detail/constants';
import { useHTranslation } from '@lib/i18n';
import { LanguageUtils } from '@lib/language-utils';
import ItemColView from '../../bond-loan-item/bond-loan-item.item-col-view';

const ClientLoanListMainListItemService = ({ label, value, unit }) => (
  <div className="client-loan-list-main-list-item-grid-view__content__service__item">
    <div className="client-loan-list-main-list-item-grid-view__content__service__item__label">
      {label}
    </div>
    <div className="client-loan-list-main-list-item-grid-view__content__service__item__value">
      {value}
    </div>
    <div className="client-loan-list-main-list-item-grid-view__content__service__item__unit">
      {unit}
    </div>
  </div>
);

const ClientLoanListMainListItemGridView = ({ loanData, onClick }) => {
  const {
    name,
    advantages: loanAdvantages,
    outstandingAdvantages,
    info,
    org,
    slug,
  } = loanData;
  const { t } = useHTranslation('common');
  const orgImage = org?.image?.url || '';

  const advantages = useMemo(() => {
    if (!loanAdvantages) {
      return [];
    }
    return loanAdvantages
      .split(/\n+/g)
      .map((x) => x ?? x.trim())
      .filter((x) => !!x);
  }, [loanAdvantages]);

  const content = (
    <div className="client-loan-list-main-list-item-grid-view__content__service">
      <ClientLoanListMainListItemService
        {...{
          label: t('Preferential rate', {
            en: 'Preferential rate',
            vn: 'Lãi suất',
          }),
          value: `${info?.preferentialRate}%`,
          unit: t('Year', { en: '(12 months)', vn: '(12 tháng)' }),
        }}
      />
      <Divider
        type="vertical"
        className="client-loan-list-main-list-item-grid-view__content__service__divider"
      />
      <ClientLoanListMainListItemService
        {...{
          label: t('Preferential time', {
            en: 'Preferential time',
            vn: 'Ưu đãi',
          }),
          value: info?.preferentialTime,
          unit: t('Month', { en: 'Month', vn: 'Tháng' }),
        }}
      />
    </div>
  );

  const uiDescription = (
    <Scrollbars style={{ width: '100%', height: 99, margin: '10px 0' }}>
      {outstandingAdvantages && (
        <div className="client-loan-list-main-list-item-list-view__content__outstanding-advantage">
          <StarFilled className="client-loan-list-main-list-item-list-view__content__outstanding-advantage__icon" />
          {outstandingAdvantages}
        </div>
      )}
      {Array.isArray(advantages) &&
        advantages.length > 0 &&
        advantages.map((advantage, index) => (
          <div
            key={`client-loan-list-main-advantage-${index}`}
            className="client-loan-list-main-list-item-list-view__content__advantage"
          >
            <CheckOutlined />
            <span className="client-loan-list-main-list-item-list-view__content__advantage__text">
              {advantage}
            </span>
          </div>
        ))}
    </Scrollbars>
  );

  return (
    <ItemColView
      screen={'loan'}
      showCheckBox={true}
      backgroundColor={org?.backgroundColor}
      orgImage={orgImage}
      slug={`/${LanguageUtils.getCurrentCountry()}/${CLIENT_PRODUCT_DETAIL_ROUTE.LOAN}/${slug}`}
      name={name}
      content={content}
      uiDescription={uiDescription}
      buttonText={t('Request advice on this loan package', {
        en: 'Request advice on this loan package',
        vn: 'Yêu cầu tư vấn',
      })}
      onClick={() => onClick(loanData)}
    />
  );
};

export default ClientLoanListMainListItemGridView;
