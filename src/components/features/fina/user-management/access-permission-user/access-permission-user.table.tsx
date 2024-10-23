import {
  CheckCircleFilled,
  EditFilled,
  ScheduleOutlined,
  StopFilled,
} from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { notification, Tag } from 'antd';
import { ACCESS_PERMISSION_TYPE } from '.';
import { ConverterUtils } from '../../../../../lib/converter';
import { TableUtils } from '../../../../../lib/table-utils';
import {
  useDeleteDocumentControl,
  useSetDocumentDetail,
} from '../../../../../schema-form/features/hooks/table-hooks';
import { FiledViewer } from '../../../../shared/common/configuration/field-viewer';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import { ClickableOpacity } from '../../../../shared/utils/clickable-opacity';
import { PreViewUser } from '../../deals/deals-component-common/preview-user';
import {
  REQUEST_ACCESS_MAPPING_STATUS,
  REQUEST_ACCESS_USER_COLOR_MAPPING,
  REQUEST_ACCESS_USER_STATUSES,
} from './constan';

export const AccessPermissionUserTableSchema = (featureId) => {
  const { t } = useHTranslation('admin-common');
  const setDocumentDetail = useSetDocumentDetail(featureId);
  const deleteDocumentControl = useDeleteDocumentControl(
    undefined,
    undefined,
    'Bạn có muốn hủy yêu cầu',
  );
  return [
    {
      title: t('Customer', { vn: 'Khách hàng' }),
      dataIndex: 'id',
      key: 'id',
      width: '400px',
      render: (_, record) => {
        const showModal = () => {
          window.open(
            `${location.hostname}/vn/admin/fina-staff/customers?documentId=${record?.customer?.id}`,
            '_blank',
            'toolbar=yes,scrollbars=yes,resizable=yes,top=150,left=200,width=500,height=400',
          );
        };
        return (
          <>
            <div className={'m-b-10'}>
              <b>Họ tên</b>:{' '}
              <a href={'javascript:void(0)'} onClick={showModal}>
                {ConverterUtils.getFullNameUser(record?.customer)}
              </a>
            </div>
            <FiledViewer
              {...{
                label: t('user manager', { vn: 'Nhân viên quản lý' }),
                value: <PreViewUser {...{ user: record?.user }} />,
              }}
            />
          </>
        );
      },
    },
    {
      title: t('Sender', { vn: 'Người gửi yêu cầu' }),
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => {
        return (
          <PreViewUser
            user={record.sender}
            userTitle={t('sender', { vn: 'Người gửi' })}
          />
        );
      },
    },
    {
      title: t('Content'),
      dataIndex: 'requestContent',
      key: 'requestContent',
      render: (_, record) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Request Content', { vn: 'Lời nhắn người yêu cầu' }),
                value: record.requestContent,
                labelClassName: 'm-b-0i',
              }}
            />
            {record.approvedContent && (
              <ItemViewer
                {...{
                  label: t('Approved Content', {
                    vn: 'Lời nhắn người phê duyệt',
                  }),
                  value: record.approvedContent,
                  labelClassName: 'm-b-0i',
                }}
              />
            )}
            {record.approve && (
              <ItemViewer
                {...{
                  label: t('Approver', { vn: 'Người phê duyệt' }),
                  value: ConverterUtils.showUserConverter(record.approve),
                  labelClassName: 'm-b-0i',
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: t('Status', { vn: 'Trạng thái' }),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <Tag color={REQUEST_ACCESS_USER_COLOR_MAPPING[record.status]}>
            {t(REQUEST_ACCESS_MAPPING_STATUS[record.status])}
          </Tag>
        );
      },
    },
    TableUtils.createColumnCreatedAt(),
    {
      title: t('Action', { vn: 'Hành động' }),
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => {
        const onAccessPermissionUser = (status, type) => {
          setDocumentDetail({ ...record, status, type });
        };
        const onResendAccessPermissionUser = async (status) => {
          await FormUtils.submitForm(
            {
              status,
            },
            {
              nodeName: `request-access-user/resend/${record.id}`,
              method: 'put',
              showSuccessMessage: false,
              onGotSuccess: () => {
                notification.info({
                  message: t('Resend request access user', {
                    vn: 'Gửi lại yêu cầu xin cấp quyền',
                  }),
                  description: t('Authorization request sent again.', {
                    vn: 'Đã gửi lại yêu cầu xin cấp quyền',
                  }),
                });
              },
            },
          );
        };
        return (
          <div className="d-f-center">
            <ClickableOpacity
              {...{
                className: 'm-t-10 m-l-5 m-r-5',
                onClick: () => onAccessPermissionUser(record.status, 'viewer'),
              }}
            >
              <EditFilled title={'Xem chi tiết'} />
            </ClickableOpacity>
            {featureId === ACCESS_PERMISSION_TYPE.MY_REQUEST &&
              record.status !== REQUEST_ACCESS_USER_STATUSES.APPROVE && (
                <>
                  <ClickableOpacity
                    {...{
                      className: 'm-t-10 m-l-5 m-r-5',
                      onClick: () =>
                        onResendAccessPermissionUser(record.status),
                    }}
                  >
                    <ScheduleOutlined
                      title={
                        record.status === REQUEST_ACCESS_USER_STATUSES.REJECT
                          ? 'Gửi lại'
                          : 'Nhắc lại'
                      }
                    />
                  </ClickableOpacity>
                  {deleteDocumentControl(record, {})}
                </>
              )}
            {(record.status === REQUEST_ACCESS_USER_STATUSES.WAIT_PROCESSING ||
              record.status === REQUEST_ACCESS_USER_STATUSES.RESEND) &&
              featureId === ACCESS_PERMISSION_TYPE.REQUEST_PROCESSED && (
                <>
                  <ClickableOpacity
                    {...{
                      className: 'm-t-10 m-l-5 m-r-5',
                      onClick: () =>
                        onAccessPermissionUser('approve', 'submit'),
                    }}
                  >
                    <CheckCircleFilled title={'Chấp thuật'} />
                  </ClickableOpacity>
                  <ClickableOpacity
                    {...{
                      className: 'm-t-10 m-l-5 m-r-5',
                      onClick: () => onAccessPermissionUser('reject', 'submit'),
                    }}
                  >
                    <StopFilled title={'Từ chối'} />
                  </ClickableOpacity>
                </>
              )}
          </div>
        );
      },
    },
  ];
};
