import { CommissionAdvanceFormSchema } from '@components/features/fina/commission/management/commission-advance-form-schema';
import { ConverterUtils } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useCurrentUser } from '@lib/providers/auth';
import { HFeature, HTable } from '@schema-form/features';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Row } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import {
  IconArrowRight,
  IconChecked,
  IconCurrentIncome,
  IconFinaCoin,
  IconPaid,
  IconUnChecked,
} from './constants';
import ProfileEarningsCommissionsAll from './list-all';
import { MyCommissionSearchResultTableSchema } from './my-commission-search-result-table-schema';

import './styles.module.scss';

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

export const SREENS = {
  home: 'home',
  allTransactions: 'all-transactions',
  finaXu: 'fina-xu',
};

const ProfileEarningsCommissions = () => {
  const isMobile = useIsMobile();
  const currentUser = useCurrentUser();
  const [totalNotForControl, setTotalNotForControl] = useState(0);
  const [totalForControl, setTotalForControl] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [screen, setScreen] = useState(SREENS.home);

  const dataStatistic = [
    {
      icon: <IconChecked />,
      label: 'Đã đối soát',
      value: FormatterUtils.formatAmount(totalForControl, ''),
    },
    {
      icon: <IconUnChecked />,
      label: 'Chưa đối soát',
      value: FormatterUtils.formatAmount(totalNotForControl, ''),
    },
    {
      icon: <IconPaid />,
      label: 'Đã thanh toán',
      value: FormatterUtils.formatAmount(totalPaid, ''),
    },
  ];

  const handleDataReadyToSubmit = (data) => {
    if (data?.from) {
      data.createdAt = FormUtils.getQueryBetweenDays(
        data?.from,
        data?.to || moment().add(1, 'days').format('YYYY/MM/DD'),
      );
      delete data.from;
      delete data.to;
    }
  };

  const onGotSearchResult = (searchResult) => {
    const { metadata } = searchResult;
    setTotalNotForControl(metadata?.totalNotForControl?.toFixed(0) || 0);
    setTotalForControl(metadata?.totalForControl?.toFixed(0) || 0);
    setTotalPaid(metadata?.totalPaid?.toFixed(0) || 0);
  };

  if (screen === SREENS.allTransactions) {
    return <ProfileEarningsCommissionsAll setScreen={setScreen} />;
  }

  return (
    <div className="profile-earnings-commissions">
      <div className="profile-el-wrapper">
        <h2 className="profile-information-title">Thu nhập - Hoa hồng</h2>

        <div className="profile-earnings-commissions-top">
          <div className="profile-earnings-commissions-top-left">
            <div className="profile-earnings-commissions-top-current-income">
              <div
                className="profile-earnings-commissions-top-label"
                onClick={() => {
                  setScreen(SREENS.allTransactions);
                }}
              >
                <IconCurrentIncome />
                <span>Thu nhập hiện tại</span>
                <IconArrowRight />
              </div>

              <div className="profile-earnings-commissions-top-value">
                {FormatterUtils.formatAmount(totalNotForControl, '')}
                <sup>đ</sup>
              </div>
            </div>

            <div className="profile-earnings-commissions-top-fina-coin">
              <div className="profile-earnings-commissions-top-label">
                <IconFinaCoin />
                <span>FinaXu</span>
                <IconArrowRight />
              </div>

              <div className="profile-earnings-commissions-top-value">
                0<sub>xu</sub>
              </div>
            </div>
          </div>

          <div className="profile-earnings-commissions-top-right">
            <Row gutter={isMobile ? [20, 20] : [40, 40]}>
              {dataStatistic?.map((el, i) => (
                <Col span={8} key={i}>
                  <div className="profile-earnings-commissions-top-right-item">
                    {el?.icon}
                    <h3 className="profile-earnings-commissions-top-right-item-label">
                      {el?.label}
                    </h3>
                    <h2 className="profile-earnings-commissions-top-right-item-value">
                      {ConverterUtils.formatNumber(el?.value)}
                      <sup>đ</sup>
                    </h2>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>

      <HFeature
        {...{
          featureId: 'commissions',
          documentIdName: 'commissionId',
          nodeName: 'commissions',
          documentRelations: relations,
        }}
      >
        <HSearchFormWithCreateButton
          {...{
            withRelations: relations,
            hiddenFields: {
              type: 'spend',
              userId: currentUser.id,
            },
            hiddenCreateButton: true,
            advancedSchema: () =>
              CommissionAdvanceFormSchema({ type: '', applyFor: 'spend' }),
            onDataReadyToSubmit: handleDataReadyToSubmit,
            onGotSuccess: onGotSearchResult,
            resetIfSuccess: false,
            className: 'h-search-portal-custom',
            classNameAdvancedTabSchema:
              'profile-earnings-commissions-advanced-search',
          }}
        />

        <HTable
          schema={MyCommissionSearchResultTableSchema}
          scroll={isMobile ? { x: 'max-content' } : {}}
        />
      </HFeature>
    </div>
  );
};

export default ProfileEarningsCommissions;
