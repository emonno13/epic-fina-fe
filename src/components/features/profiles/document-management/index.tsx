import React, { useEffect, useState } from 'react';
import { Tabs, Tag } from 'antd';
import { isEmpty } from 'underscore';
import { FormUtils } from '../../../../schema-form/utils/form-utils';
import { endpoints } from '../../../../lib/networks/endpoints';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';
import { useHTranslation } from '../../../../lib/i18n';
import { ConverterUtils } from '../../../../lib/converter';
import { TASK_STATUSES_COLOR_MAPPING } from '../../../../constants/crm/task';
import { mappingStatusOfTask } from '../../crm/tasks/utils';
import { DEAL_STATUS } from '../../fina/deals/utils';
import { mappingLabelClaimInsurance } from '../../crm/claim-insurance/utils';
import { listDealClaimByStatus } from '../../crm/deal-claim-insurance';
import {
  getStepByDealInsuranceStatus,
} from '../../cms/register-insurance/health-insurance/health-insurance-staff-schema-detail';
import { HTable } from '../../../../schema-form/features';
import { TableUtils } from '../../../../lib/table-utils';

const { TabPane } = Tabs;

export const RECORD_TYPE = {
  TASK_COUNSELLING: 'TASK_COUNSELLING',
  INSURANCE_CLAIM: 'INSURANCE_CLAIM',
  DEAL_LOAN: 'DEAL_LOAN',
  DEAL_INSURANCE: 'DEAL_INSURANCE',
  DEAL_INSURANCE_CLAIM: 'DEAL_INSURANCE_CLAIM',
};

const DocumentManagement = ({ userId: defaultUserId = '' }) => {
  const documentDetail = useDocumentDetail();
  const userId = defaultUserId || documentDetail?.id;
  const [userWithDocumentManagement, setUserWithDocumentManagement] = useState<any>({});
  const { t } = useHTranslation('admin-common');

  const { taskCounsellings, insuranceClaims, dealLoans, dealInsurances, dealInsuranceClaims } = userWithDocumentManagement;
  const records = [
    {
      label: t('Task counselling', { vn: 'Yêu cầu tư vấn' }),
      value: taskCounsellings,
      type: RECORD_TYPE.TASK_COUNSELLING,
    },
    {
      label: t('Insurance claim', { vn: 'Yêu cầu BTBH' }),
      value: insuranceClaims,
      type: RECORD_TYPE.INSURANCE_CLAIM,
    },
    {
      label: t('Deal loan', { vn: 'Hồ sơ vay' }),
      value: dealLoans,
      type: RECORD_TYPE.DEAL_LOAN,
    },
    {
      label: t('Deal insurance', { vn: 'Hồ sơ bảo hiểm' }),
      value: dealInsurances,
      type: RECORD_TYPE.DEAL_INSURANCE,
    },
    {
      label: t('Deal insurance claim', { vn: 'Hồ sơ BTBH' }),
      value: dealInsuranceClaims,
      type: RECORD_TYPE.DEAL_INSURANCE_CLAIM,
    },
  ];

  useEffect(() => {
    if (!userId) {
      setUserWithDocumentManagement({});
      return;
    }

    FormUtils.submitForm({}, {
      method: 'get',
      endpoint: endpoints.endpointWithApiDomain(`/users/sharing-views/${userId}`),
      onGotSuccess: setUserWithDocumentManagement,
    });
  }, [userId]);

  return (
    <Tabs className={'m-t-20'}>
      {records.map((item, index) => (
        <TabPane key={`record-${index}`} tab={`${item?.label}(${item?.value?.length || 0})`}>
          <TableAboutRecordOfUser dataSource={isEmpty(item?.value) ? [] : item?.value} type={item?.type} />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default DocumentManagement;

const TableAboutRecordOfUser = ({ dataSource = [], type }) => {
  const { t } = useHTranslation('admin-common');
  const generateStatus = (type, record) => {
    switch (type) {
      case RECORD_TYPE.TASK_COUNSELLING:
        return (
          <Tag color={TASK_STATUSES_COLOR_MAPPING[record.status]}>
            {mappingStatusOfTask({ t, status: record.status, statusAssign: record.statusAssign })}
          </Tag>
        );
      case RECORD_TYPE.DEAL_LOAN:
        return (
          <Tag color={DEAL_STATUS[record.status].color}>
            {t(DEAL_STATUS[record.status].name)}
          </Tag>
        );
      case RECORD_TYPE.INSURANCE_CLAIM:
        return mappingLabelClaimInsurance(record.status);
      case RECORD_TYPE.DEAL_INSURANCE_CLAIM: {
        const status = listDealClaimByStatus(t).find(item => item.value === record.status);
        return (
          <Tag color={status?.color}>
            {status?.title}
          </Tag>
        );
      }
      case RECORD_TYPE.DEAL_INSURANCE:
        return (
          <Tag color={getStepByDealInsuranceStatus[record.status].color}>
            {getStepByDealInsuranceStatus[record.status].name}
          </Tag>
        );
      default:
        return '';
    }
  };
  return (
    <HTable
      dataSource={dataSource}
      pagination={{
        total: dataSource.length,
      }}
      schema={[
        TableUtils.createTableColumnConfig({
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
        }),
        TableUtils.createTableColumnConfig({
          title: t('Staff'),
          dataIndex: 'assignee',
          key: 'assignee',
          render: ConverterUtils.getFullNameUser,
        }),
        TableUtils.createTableColumnConfig({
          title: t('Status'),
          render: (record) => generateStatus(type, record),
        }),
      ]} />
  );
};
