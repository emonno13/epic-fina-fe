import { Tag } from 'antd';
import { useTranslation } from 'next-i18next';

import { EyeOutlined, FormOutlined } from '@ant-design/icons';
import {
  TASK_PRIORITY_COLOR_MAPPING,
  TASK_PRIORITY_LABEL_MAPPING,
  TASK_STATUSES_LABEL_MAPPING,
  TASK_TYPES,
  TASK_TYPES_COLOR_MAPPING,
  TASK_TYPES_LABEL_MAPPING,
} from '../../../../../constants/crm/task';

import { ConverterUtils } from '../../../../../lib/converter';
import { TableUtils } from '../../../../../lib/table-utils';
import { useDeleteDocumentControl } from '../../../../../schema-form/features/hooks';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import { Link } from '../../../../shared/link';
import { PreViewUser } from '../../../fina/deals/deals-component-common/preview-user';
import { DEAL_DOCUMENT_ID_NAME } from '../../../fina/deals/loans';

import '@styles/_default_responsive.scss';

export const DashboardTaskTrackingTableSchema = (props) => {
  const { t } = useTranslation('admin-common');
  const deleteDocumentControl = useDeleteDocumentControl();
  const { featureId } = props;
  const tableItemShouldAppend: any[] = [];

  if (featureId === 'dashboardTaskInProgressTracking') {
    tableItemShouldAppend.push(
      TableUtils.createTableColumnConfig({
        title: t('Staff Fina'),
        dataIndex: 'assignee',
        sortable: true,
        key: 'assignee',
        responsive: ['md'],
        render: (assignee) => {
          return <PreViewUser user={assignee} />;
        },
      }),
    );
  } else {
    tableItemShouldAppend.push({
      title: t('Priority'),
      dataIndex: 'priority',
      key: 'priority',
      responsive: ['md'],
      render: (priority) => (
        <Tag color={TASK_PRIORITY_COLOR_MAPPING[priority]}>
          {t(TASK_PRIORITY_LABEL_MAPPING[priority])}
        </Tag>
      ),
    });
  }

  return [
    TableUtils.createTableColumnConfig({
      title: t('Customer'),
      dataIndex: 'user',
      sortable: true,
      key: 'user',
      render: (_, document: any) => {
        const metadata: any = document.metadata || {};
        const detailLink = `/admin/deals/loans?${DEAL_DOCUMENT_ID_NAME}=${metadata.dealId}`;
        return (
          <div className={'common-responsive'}>
            <div className="d-f-center common-responsive__mobile-action">
              {document.type === TASK_TYPES.DEAL_PROCESSING_TASK && (
                <Link href={detailLink}>
                  <EyeOutlined />
                </Link>
              )}
              <div className="d-f-center m-r-5 m-l-5">
                <Link href={`/admin/tasks/task?documentId=${document.id}`}>
                  <FormOutlined />
                </Link>
              </div>
            </div>
            <PreViewUser user={document?.user} />
            <div className={'common-responsive__mobile'}>
              <ItemViewer
                {...{
                  label: t('Type'),
                  value: (
                    <Tag color={TASK_TYPES_COLOR_MAPPING[document?.type]}>
                      {t(TASK_TYPES_LABEL_MAPPING[document?.type])}
                    </Tag>
                  ),
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('Deadline'),
                  value: ConverterUtils.fullDatetimeConverter(document?.endAt),
                  labelClassName: 'm-b-0i',
                }}
              />
              {featureId === 'dashboardTaskInProgressTracking' ? (
                <ItemViewer
                  {...{
                    label: t('Staff Fina'),
                    value: <PreViewUser user={document?.assignee} />,
                    labelClassName: 'm-b-0i',
                  }}
                />
              ) : (
                <ItemViewer
                  {...{
                    label: t('Priority'),
                    value: (
                      <Tag
                        color={TASK_PRIORITY_COLOR_MAPPING[document?.priority]}
                      >
                        {t(TASK_PRIORITY_LABEL_MAPPING[document?.priority])}
                      </Tag>
                    ),
                    labelClassName: 'm-b-0i',
                  }}
                />
              )}
            </div>
          </div>
        );
      },
    }),
    ...tableItemShouldAppend,
    {
      title: t('Type'),
      dataIndex: 'type',
      key: 'type',
      responsive: ['md'],
      render: (type) => (
        <Tag color={TASK_TYPES_COLOR_MAPPING[type]}>
          {t(TASK_TYPES_LABEL_MAPPING[type])}
        </Tag>
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      responsive: ['md'],
      render: (status) => <Tag>{t(TASK_STATUSES_LABEL_MAPPING[status])}</Tag>,
    },
    TableUtils.createTableColumnConfig({
      title: t('Deadline'),
      dataIndex: 'endAt',
      responsive: ['md'],
      sortable: true,
      render: ConverterUtils.fullDatetimeConverter,
    }),
    {
      title: t('Action'),
      dataIndex: 'action',
      responsive: ['md'],
      width: 100,
      render: (_, document) => {
        if (document.type === TASK_TYPES.DEAL_PROCESSING_TASK) {
          const metadata: any = document.metadata || {};
          const detailLink = `/admin/deals/loans?${DEAL_DOCUMENT_ID_NAME}=${metadata.dealId}`;
          return (
            <div className="d-f-center">
              <Link href={detailLink}>
                <EyeOutlined />
              </Link>
            </div>
          );
        }
        return (
          <div className="d-f-center">
            <div className="d-f-center">
              <Link href={`/admin/tasks/task?documentId=${document.id}`}>
                <FormOutlined />
              </Link>
            </div>
            <div className="p-l-10" color="danger">
              {deleteDocumentControl(document)}
            </div>
          </div>
        );
      },
    },
  ];
};
