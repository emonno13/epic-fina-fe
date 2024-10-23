import { CheckOutlined, EyeOutlined, StopOutlined } from '@ant-design/icons';
import { ViewCustomer } from '@components/shared/view-customer';
import { Tag, Tooltip } from 'antd';
import { TASK_STATUSES_COLOR_MAPPING } from '../../../../../../constants/crm/task';
import { ConverterUtils } from '../../../../../../lib/converter';
import { useHTranslation } from '../../../../../../lib/i18n';
import { useHasPermissions } from '../../../../../../lib/providers/auth';
import {
  EditAndDeleteCell,
  TableUtils,
} from '../../../../../../lib/table-utils';
import { useEditDocumentControl } from '../../../../../../schema-form/features/hooks';
import { FiledViewer } from '../../../../../shared/common/configuration/field-viewer';
import { ClickableOpacity } from '../../../../../shared/utils/clickable-opacity';
import { PreViewUser } from '../../../../fina/deals/deals-component-common/preview-user';
import { mappingStatusOfTask } from '../../utils';
import {
  mappingStatusOfRequestBackStatusOfTask,
  STATUS_REQUEST_BACK_STATUS_OF_TASK,
  useRequestBackStatusOfTaskTabs,
} from '../utils';

export const RequestBackStatusOfTaskTableSchemaDetail = (
  key,
  setVisible,
  setRequestId,
  setStatus,
) => {
  const { t } = useHTranslation('admin-common');
  const tabsConfig = useRequestBackStatusOfTaskTabs();
  const hasPermissions = useHasPermissions();
  const haveBackTaskStatusPermission = hasPermissions([
    tabsConfig.ADMIN.permission,
  ]);
  const editControl = useEditDocumentControl();

  return [
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const mappingStatus = mappingStatusOfRequestBackStatusOfTask(status);
        return (
          <Tag color={mappingStatus?.color || ''}>
            {mappingStatus?.label || ''}
          </Tag>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Task counselling', { vn: 'Yêu cầu tư vấn' }),
      width: 350,
      render: (document) => {
        return (
          <>
            <FiledViewer
              label={'code'}
              value={document?.task?.code || ''}
              widthLabel={'25%'}
            />

            <FiledViewer
              label={t('Status')}
              value={
                <Tag
                  color={TASK_STATUSES_COLOR_MAPPING[document?.statusOfTask]}
                >
                  {mappingStatusOfTask({
                    t,
                    status: document?.statusOfTask,
                    statusAssign: document?.statusAssignOfTask,
                  })}
                </Tag>
              }
              widthLabel={'25%'}
            />

            <FiledViewer
              label={t('Message', { vn: 'Tin nhắn' })}
              value={
                <Tooltip title={document?.requestMsg}>
                  <div
                    style={{
                      whiteSpace: 'nowrap',
                      width: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {document?.requestMsg || ''}
                  </div>
                </Tooltip>
              }
              widthLabel={'25%'}
            />

            <FiledViewer
              label={t('Customer')}
              value={
                <ViewCustomer user={document?.task?.user} document={document} />
              }
              widthLabel={'25%'}
            />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created by', { vn: 'Tạo bởi' }),
      render: (document) => <PreViewUser user={document?.createdBy} />,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Updated by', { vn: 'Cập nhật bởi' }),
      render: (document) => <PreViewUser user={document?.updatedBy} />,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Response message', { vn: 'Tin nhắn phản hồi' }),
      dataIndex: 'responseMsg',
      key: 'responseMsg',
      render: (responseMsg) => (
        <div
          style={{
            whiteSpace: 'nowrap',
            width: 200,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {responseMsg}
        </div>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created at', { vn: 'Thời gian tạo' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => ConverterUtils.fullDatetimeConverter(createdAt),
    }),
    TableUtils.createTableColumnConfig({
      title: t('action'),
      width: 100,
      render: (document) => {
        return (
          <div className={'d-f-center'}>
            {key === tabsConfig.ADMIN.key &&
              haveBackTaskStatusPermission &&
              document?.status ===
                STATUS_REQUEST_BACK_STATUS_OF_TASK.WAIT_PROCESSING && (
                <div className={'d-f-center m-r-10'}>
                  <ClickableOpacity
                    className={'m-r-10'}
                    onClick={() => {
                      setRequestId(document.id);
                      setVisible(true);
                      setStatus(STATUS_REQUEST_BACK_STATUS_OF_TASK.APPROVE);
                    }}
                    tooltip={t('Approve', { vn: 'Chấp nhận' })}
                  >
                    <CheckOutlined />
                  </ClickableOpacity>

                  <ClickableOpacity
                    onClick={() => {
                      setRequestId(document.id);
                      setVisible(true);
                      setStatus(STATUS_REQUEST_BACK_STATUS_OF_TASK.REJECT);
                    }}
                    tooltip={t('Reject', { vn: 'Từ chối' })}
                  >
                    <StopOutlined />
                  </ClickableOpacity>
                </div>
              )}

            {document?.status !==
              STATUS_REQUEST_BACK_STATUS_OF_TASK.WAIT_PROCESSING && (
              <ClickableOpacity className={'m-r-10'}>
                <Tooltip title={t('View detail', { vn: 'Xem chi tiết' })}>
                  {editControl(document, {}, <EyeOutlined />)}
                </Tooltip>
              </ClickableOpacity>
            )}

            {key === tabsConfig.OWN.key &&
              document?.status ===
                STATUS_REQUEST_BACK_STATUS_OF_TASK.WAIT_PROCESSING && (
                <EditAndDeleteCell deleteMessage={''} document={document} />
              )}
          </div>
        );
      },
    }),
  ];
};
