import {
  AlignLeftOutlined,
  BankOutlined,
  ShareAltOutlined,
  WarningTwoTone,
} from '@ant-design/icons';
import { HComment } from '@components/shared/common-form-elements/h-comment';
import { LabelItem } from '@components/shared/common/h-label/h-label-title';
import { endpoints } from '@lib/networks/endpoints';
import { useSetTransactionsOfDeal } from '@schema-form/features/hooks/document-detail-hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Tabs } from 'antd';
import { ORGANIZATION_TYPES, USER_TYPES } from 'types/organization';
import { ManagerLoanWithBank } from './edit-bank-loan';
import { ProgressView } from './view-progress';

import '../deal-loan-detail.module.scss';

const { TabPane } = Tabs;

export const TabLabel = ({ Icon, label = '', twoToneColor = '' }) => (
  <>
    <Icon {...{ twoToneColor }} /> {label}{' '}
  </>
);

export const generateTabPanelByBank = ({ t, currentUser, document }) => {
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const isStaffBank = currentUser.type === USER_TYPES.teller;
  if (!document?.dealDetails?.length) {
    return null;
  }
  return document?.dealDetails?.map((dealDetail) => {
    const { dealId, id, partner } = dealDetail;
    const setTransactionsOfDeal = useSetTransactionsOfDeal();
    FormUtils.submitForm(
      {
        dealId,
        dealDetailId: id,
      },
      {
        endpoint: endpoints.endpointWithApiDomain('/transactions'),
        method: 'get',
        hiddenValues: {
          filter: {
            where: {
              objectId: dealId,
              'metaData.dealDetailId': id,
            },
            include: [{ relation: 'transactionDetails' }],
          },
        },
        onGotSuccess: (response) => {
          setTransactionsOfDeal({
            featureId: `transactions-${id}`,
            data: response?.data?.[0],
          });
        },
      },
    );
    return (
      <TabPane
        key={id}
        {...{
          tab: (
            <span
              style={{
                backgroundColor: partner?.backgroundColor || '#f0f0f0',
                padding: '2px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              {dealDetail?.partner?.image?.url ? (
                <img height={19} src={partner?.image?.url} />
              ) : (
                <span style={{ minHeight: 19 }}>Bank</span>
              )}
            </span>
          ),
          closable: false,
          className: 'deal-detail-with-bank',
        }}
      >
        <ManagerLoanWithBank {...{ dealDetail }} />
        {(isOrgStaff || isStaffBank) && (
          <>
            <ProgressView
              {...{ objectId: id, objectType: ORGANIZATION_TYPES.BANK }}
            />
            <LabelItem
              label={t('Note')}
              firstIcon={<AlignLeftOutlined />}
              titleTooltip={t('Note')}
            />
            <HComment {...{ className: 'm-t-10', documentId: id }} />
          </>
        )}
      </TabPane>
    );
  });
};

export const iconTabLabel = (subStatus, isCheckSharingWithBank) => {
  if (subStatus === 'reject') {
    return WarningTwoTone;
  } else if (isCheckSharingWithBank) {
    return ShareAltOutlined;
  }
  return BankOutlined;
};
