import { useHTranslation } from '@lib/i18n';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { Tabs } from 'antd';
import { useState } from 'react';
import { DealClaimInsuranceDetails } from './detail';
import { ClaimInsuranceSchemaDetailTable } from './schema-detail/claim-insurance.schema-detail-table';
import { DEAL_CLAIM_INSURANCE_STATUSES } from './utils';

export const listDealClaimByStatus = (t) => [
  {
    title: t('All', { vn: 'Tất cả' }),
    value: undefined,
    key: 'all',
    color: '#1890ff',
  },
  {
    title: t('Initialization', { vn: 'Khởi tạo' }),
    value: DEAL_CLAIM_INSURANCE_STATUSES.WAIT_PROCESSING,
    key: DEAL_CLAIM_INSURANCE_STATUSES.WAIT_PROCESSING,
    color: '#1890ff',
  },
  {
    title: t('Processing records', { vn: 'Xử lý hồ sơ' }),
    value: DEAL_CLAIM_INSURANCE_STATUSES.MOVE_TO_PARTNER,
    key: DEAL_CLAIM_INSURANCE_STATUSES.MOVE_TO_PARTNER,
    color: '#ffc53d',
  },
  {
    title: t('Waiting for partner approval', { vn: 'Chờ đối tác phê duyệt' }),
    value: DEAL_CLAIM_INSURANCE_STATUSES.PARTNER_CONFIRM,
    key: DEAL_CLAIM_INSURANCE_STATUSES.PARTNER_CONFIRM,
    color: '#73d13d',
  },
  {
    title: t('Get customer hard copy', { vn: 'Nhận bản cứng khách hàng' }),
    value: DEAL_CLAIM_INSURANCE_STATUSES.DOCUMENT_CONFIRM,
    key: DEAL_CLAIM_INSURANCE_STATUSES.DOCUMENT_CONFIRM,
    color: '#ff4d4f',
  },
  {
    title: t('Move document to partne', {
      vn: 'Gửi bản cứng hồ sơ cho đối tác',
    }),
    value: DEAL_CLAIM_INSURANCE_STATUSES.MOVE_DOCUMENT_TO_PARTNER,
    key: DEAL_CLAIM_INSURANCE_STATUSES.MOVE_DOCUMENT_TO_PARTNER,
    color: '#ff4d4f',
  },
  {
    title: t('Cancel by partner', { vn: 'Đối tác từ chối' }),
    value: DEAL_CLAIM_INSURANCE_STATUSES.CANCELLED_BY_PARTNER,
    key: DEAL_CLAIM_INSURANCE_STATUSES.CANCELLED_BY_PARTNER,
    color: '#ff4d4f',
  },
  {
    title: t('Disbursement in progress', { vn: 'Đang giải ngân' }),
    value: DEAL_CLAIM_INSURANCE_STATUSES.DISBURSING,
    key: DEAL_CLAIM_INSURANCE_STATUSES.DISBURSING,
    color: '#ff4d4f',
  },
  {
    title: t('Disbursed', { vn: 'Đã giải ngân' }),
    value: DEAL_CLAIM_INSURANCE_STATUSES.DISBURSED,
    key: DEAL_CLAIM_INSURANCE_STATUSES.DISBURSED,
    color: '#ff4d4f',
  },
];

const { TabPane } = Tabs;

export const DealClaimInsurance = (props) => {
  const { t } = useHTranslation('common');
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);

  return (
    <Tabs
      className="tabs-custom-filter"
      activeKey={activeKey}
      onChange={setActiveKey}
    >
      {listDealClaimByStatus(t)?.map((dealClaimElement) => (
        <TabPane tab={dealClaimElement.title} key={dealClaimElement.key}>
          {activeKey === dealClaimElement.value && (
            <DealClaimInsuranceComponent
              {...{
                status: dealClaimElement.value,
                ...props,
              }}
            />
          )}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default DealClaimInsurance;

const DealClaimInsuranceComponent = (props) => {
  const { status } = props;

  const modelFilters = {
    filter: {
      where: {
        type: 'claim_insurance',
        status,
      },
      include: [
        { relation: 'user' },
        {
          relation: 'task',
          scope: {
            include: [
              { relation: 'assignee' },
              { relation: 'product' },
              { relation: 'createdBy' },
            ],
          },
        },
      ],
    },
  };

  return (
    <HFeature
      {...{
        featureId: 'deals',
        nodeName: 'deals',
        documentRelations: ['assignee', 'user', 'task', 'product', 'category'],
      }}
    >
      <HSearchForm hiddenValues={modelFilters} resetIfSuccess={false} />
      <DealClaimInsuranceDetails
        {...{
          type: 'claim_insurance',
        }}
      />
      <HTable
        {...{
          schema: ClaimInsuranceSchemaDetailTable,
          scroll: { x: 'max-content' },
        }}
      />
    </HFeature>
  );
};
