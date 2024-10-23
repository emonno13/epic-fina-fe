import { fundActions } from '@components/features/profiles/transaction-management/components/constants';
import { FormatterUtils } from '@lib/formatter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Row } from 'antd';
import { IconsStatisticsDashboard } from 'icons';
import { IconInvestmentReturns } from 'icons/rsvgs/icon-investment-returns';
import { IconTransaction } from 'icons/rsvgs/icon-transaction';
import { useEffect, useState } from 'react';
import {
  IconCurrentIncome,
  IconFinaCoin,
} from '../earnings-commissions/constants';

import './styles.module.scss';

export const IconUp = () => {
  return (
    <svg
      width="9"
      height="18"
      viewBox="0 0 9 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 6.71484L4.5 0.269531L0 6.71484H2.25844V17.457H6.71228V6.71484H9Z"
        fill="#2A9F47"
      />
    </svg>
  );
};

export const relations = [
  {
    relation: 'user',
    scope: {
      include: [{ relation: 'org' }],
    },
  },
  'transactionDetail',
  {
    relation: 'transaction',
    scope: {
      include: [
        { relation: 'partner' },
        {
          relation: 'product',
          scope: {
            include: [{ relation: 'org' }],
          },
        },
      ],
    },
  },
];

const calcMoney = (values) => {
  return values?.reduce(
    (totalPrice, product: any) =>
      totalPrice + (product?.navCurrent ?? 0) * (product?.holdingVolume ?? 0),
    0,
  );
};

const calcMoneyInvested = (values) => {
  return values?.reduce(
    (totalPrice, product: any) =>
      totalPrice + (product?.navInvested ?? 0) * (product?.holdingVolume ?? 0),
    0,
  );
};

const ProfileDashboardStatistics = () => {
  const { t } = useHTranslation('common');
  const currentUser = useCurrentUser();
  const isMobile = useIsMobile();
  const [transactionsBuy, setTransactionsBuy] = useState(0);
  const [transactionsSell, setTransactionsSell] = useState(0);
  const [totalForControl, setTotalForControl] = useState(0);
  const [asset, setAsset] = useState([]);

  const fetchTransactions = async (type, setTransactions) => {
    await FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain('/users/transactions'),
        method: 'get',
        hiddenValues: { filter: { where: { type } } },
        onGotSuccess: (res) => setTransactions(res?.total),
      },
    );
  };

  const fetchCurrentIncome = () => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain('/commissions'),
        method: 'get',
        withRelations: relations,
        hiddenFields: { type: 'spend', userId: currentUser.id },
        isSearchForm: true,
        onGotSuccess: (res) =>
          setTotalForControl(res?.metadata?.totalForControl?.toFixed(0) || 0),
      },
    );
  };

  const fetchAsset = () => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(
          '/users/asset-management-product',
        ),
        method: 'GET',
        onGotSuccess: (res) => setAsset(res || []),
      },
    );
  };

  useEffect(() => {
    fetchTransactions(fundActions.SELL, setTransactionsSell);
    fetchTransactions(fundActions.BUY, setTransactionsBuy);
    fetchCurrentIncome();
    fetchAsset();
  }, []);

  const totalAmount = calcMoney(asset);
  const totalAmountInvested = calcMoneyInvested(asset);
  const totalProfit = Math.round(totalAmount - totalAmountInvested);

  const dataStatistic = [
    {
      icon: <IconCurrentIncome />,
      label: t('profile.currentIncome'),
      value: (
        <span>
          {FormatterUtils.formatAmount(totalForControl, '')}
          <sup>đ</sup>
        </span>
      ),
    },
    {
      icon: <IconFinaCoin />,
      label: 'FinaXu',
      value: (
        <span>
          0<sub>xu</sub>
        </span>
      ),
    },
    {
      icon: <IconInvestmentReturns />,
      label: t('profile.investmentReturns'),
      value: (
        <span
          className={`profit ${totalProfit >= 0 ? 'profit-up' : 'profit-down'}`}
        >
          {FormatterUtils.formatAmount(totalProfit, '')}
          <sup>đ</sup> &nbsp;
          <IconUp />
        </span>
      ),
    },
    {
      icon: <IconTransaction />,
      label: t('profile.transactions'),
      value: (
        <span className="transaction">
          <span>
            {transactionsBuy} <sub>{t('profile.buy')}</sub>
          </span>
          <span>
            {transactionsSell} <sub>{t('profile.sell')}</sub>
          </span>
        </span>
      ),
    },
  ];

  return (
    <div className="profile-dashboard-statistics">
      <div className="profile-dashboard-statistics-left">
        <div className="profile-dashboard-statistics-left-content">
          <h2>
            {t('profile.welcome')} <span>{t('profile.toFina')}</span>
          </h2>
          <div className="profile-dashboard-statistics-left-content-desc">
            {t('profile.manageAllInvest')}
          </div>
        </div>
        <IconsStatisticsDashboard />
      </div>

      <div className="profile-dashboard-statistics-right">
        <Row gutter={isMobile ? [12, 12] : [16, 16]}>
          {dataStatistic?.map((item, index) => (
            <Col span={12} key={index}>
              <div className="profile-dashboard-statistics-item">
                <span className="profile-dashboard-statistics-item-icon">
                  {item?.icon}
                </span>
                <div className="profile-dashboard-statistics-item-content">
                  <div className="profile-dashboard-statistics-item-content-label">
                    {item?.label}
                  </div>
                  <div className="profile-dashboard-statistics-item-content-value">
                    {item?.value}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProfileDashboardStatistics;
