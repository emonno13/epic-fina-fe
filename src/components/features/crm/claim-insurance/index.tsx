import { useHTranslation } from '@lib/i18n';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { Tabs } from 'antd';
import { useState } from 'react';
import ClaimInsuranceDetails from './claim-insurance-detail';
import { TASK_CLAIM_INSURANCE_STATUS } from './contants';
import { ClaimInsuranceSchemaDetailTable } from './schema-detail/claim-insurance.schema-detail-table';

const { TabPane } = Tabs;

interface ClaimInsuranceProps {
  featureId?: string;
  type?: string;
}

export const ClaimInsurance = (props: ClaimInsuranceProps) => {
  const { t } = useHTranslation('common');
  const [activeKey, setActiveKey] = useState<string>('all');

  const listClaimTabsByStatus = [
    {
      title: t('All', { vn: 'Tất cả' }),
      value: undefined,
      key: 'all',
    },
    {
      title: t('Initialization', { vn: 'Khởi tạo' }),
      value: TASK_CLAIM_INSURANCE_STATUS.CREATED,
      key: TASK_CLAIM_INSURANCE_STATUS.CREATED,
    },
    {
      title: t('Collect information', { vn: 'Thu thập thông tin' }),
      value: TASK_CLAIM_INSURANCE_STATUS.ASSIGNED,
      key: TASK_CLAIM_INSURANCE_STATUS.ASSIGNED,
    },
    {
      title: t('Create a claim file indemnify', {
        vn: 'Tạo hồ sơ yêu cầu bồi thường',
      }),
      value: TASK_CLAIM_INSURANCE_STATUS.CONSULTED,
      key: TASK_CLAIM_INSURANCE_STATUS.CONSULTED,
    },
    {
      title: t('Done', { vn: 'Hoàn thành' }),
      value: TASK_CLAIM_INSURANCE_STATUS.DONE,
      key: TASK_CLAIM_INSURANCE_STATUS.DONE,
    },
  ];

  return (
    <Tabs
      className="tabs-custom-filter"
      activeKey={activeKey}
      onChange={setActiveKey}
    >
      {listClaimTabsByStatus.map((claimInsuranceElement) => (
        <TabPane
          tab={claimInsuranceElement.title}
          key={claimInsuranceElement.key}
        >
          {activeKey === claimInsuranceElement.key && (
            <InsuranceClaimComponent
              {...{
                status: claimInsuranceElement.value,
                ...props,
              }}
            />
          )}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default ClaimInsurance;

const InsuranceClaimComponent = (props) => {
  const { featureId, type, status } = props;

  const where = {
    type,
    status,
  };

  return (
    <div className="claim-insurance">
      <HFeature
        {...{
          featureId: featureId || 'tasks',
          nodeName: 'tasks',
          documentRelations: ['assignee', 'user', 'product', 'createdBy'],
        }}
      >
        <HSearchForm
          {...{
            withRelations: [
              'assignee',
              'user',
              'createdBy',
              {
                relation: 'product',
                scope: {
                  include: [
                    {
                      relation: 'productDetails',
                      scope: {
                        fields: {
                          id: true,
                          name: true,
                          slug: true,
                          productId: true,
                          orgId: true,
                          info: true,
                          status: true,
                          code: true,
                          advantages: true,
                        },
                        include: [{ relation: 'org' }],
                      },
                    },
                  ],
                },
              },
            ],
            hiddenValues: {
              filter: {
                where,
              },
            },
            resetIfSuccess: false,
          }}
        />
        <ClaimInsuranceDetails
          {...{
            type,
          }}
        />
        <HTable
          {...{
            schema: ClaimInsuranceSchemaDetailTable,
            scroll: { x: 'max-content' },
          }}
        />
      </HFeature>
    </div>
  );
};
