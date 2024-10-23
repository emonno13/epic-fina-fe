import { Tag, Popover } from 'antd';
import { isEmpty } from 'lodash';
import { TASK_STATUSES_COLOR_MAPPING } from 'constants/crm/task';
import { AnyObject } from '@components/shared/atom/type';
import { UserAvatar } from '@components/shared/common/h-avatar';
import { ViewCustomer } from '@components/shared/view-customer';
import { ViewTimeUpdate } from '@components/shared/view-time-update';
import { useIsRealEstateSeller } from 'dynamic-configuration/hooks';
import { ExpandNoteSvg } from 'icons';
import { CallPhoneFcssSDKConvert } from '@lib/fccs-sdk-convert';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { useTaskAction } from '../../search-result-table-schema';
import { mappingStatusOfTask } from '../../utils';
import { useAssignedPartnerStaffs } from '../hook/partner-assign';
import { PartnerStaffs } from '../components/partner-staffs';

export function useRealEstateTaskSchemaTable() {
  const { t } = useHTranslation('admin-common');
  const isRealEstateSeller = useIsRealEstateSeller();
  const taskAction = useTaskAction();
  const assignedPartnerStaffs = useAssignedPartnerStaffs();

  const renderAssignPartner = () => {
    if (isRealEstateSeller) {
      return [];
    }

    return [
      TableUtils.createTableColumnConfig({
        title: t('Assigned partner staffs', { vn: 'Đối tác' }),
        key: 'assignedPartnerStaffs',
        width: 250,
        render: (record, item) => {
          const partnerStaffs = assignedPartnerStaffs.filter((user) =>
            record?.assignToPartnerStaffIds?.includes(user.id),
          );
          const partner = item?.assignToPartner;

          return (
            <>
              {/*Đối tác: {partner?.code || '_'} <br/>*/}
              Nhân viên:{' '}
              {isEmpty(partnerStaffs) ? (
                <PartnerStaffs users={partnerStaffs} />
              ) : (
                '_'
              )}
            </>
          );
        },
      }),
      // TableUtils.createTableColumnConfig({
      //   title: t('Assigned partner', { vn: 'Đối tác' }),
      //   key: 'assignedPartner',
      //   width: 150,
      //   render: (record) => {
      //     const partner = record?.assignToPartner;
      //     if (isEmpty(partner)) {
      //       return '--';
      //     }

      //     return partner.code;
      //   },
      // }),
    ];
  };

  return (params: {
    setIsVisibleUserUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedUserUpdate?: React.Dispatch<React.SetStateAction<AnyObject>>;
  }) => {
    const { setIsVisibleUserUpdate, setSelectedUserUpdate } = params;

    return [
      TableUtils.createTableColumnConfig({
        title: t('Code'),
        dataIndex: 'code',
        key: 'code',
        width: 100,
      }),
      TableUtils.createTableColumnConfig({
        title: t('Customer'),
        dataIndex: 'user',
        key: 'user',
        responsive: ['md'],
        width: 150,
        render: (user, record) => {
          return (
            <>
              <ViewCustomer
                onClick={() => {
                  setIsVisibleUserUpdate?.(true);
                  setSelectedUserUpdate?.(user);
                }}
                user={user}
                document={record}
              />
              <CallPhoneFcssSDKConvert
                phones={user?.tels}
                userInfo={user}
                belongToId={record?.id}
              />
            </>
          );
        },
      }),
      ...renderAssignPartner(),
      TableUtils.createTableColumnConfig({
        title: t('Staff'),
        dataIndex: 'assignee',
        key: 'assignee',
        width: 100,
        ellipsis: true,
        responsive: ['md'],
        render: (assignee) => {
          if (!assignee) {
            return '_';
            // return <Avatar size={40} icon={<UserOutlined />} />;
          }
          return (
            <div className="wrapper-assign">
              <UserAvatar {...{ user: assignee }} />
            </div>
          );
        },
      }),
      {
        title: t('Status'),
        dataIndex: 'status',
        key: 'status',
        width: 180,
        ellipsis: true,
        responsive: ['md'],
        render: (status, doc) => {
          return (
            <>
              <Tag color={TASK_STATUSES_COLOR_MAPPING[status]}>
                {mappingStatusOfTask({
                  t,
                  status,
                  statusAssign: doc?.statusAssign || '',
                })}
              </Tag>
              <ViewTimeUpdate
                createdAt={doc?.createdAt}
                updatedAt={doc?.updatedAt}
              />
            </>
          );
        },
      },
      TableUtils.createTableColumnConfig({
        title: t('Note'),
        dataIndex: 'note',
        key: 'note',
        width: 200,
        render: (note) =>
          note && (
            <div className="table-note-task">
              <p>{note}</p>
              <Popover
                content={<div className="note-content">{note}</div>}
                overlayClassName="popover-custom-line popover-note"
              >
                <ExpandNoteSvg className="cursor-pointer" />
              </Popover>
            </div>
          ),
      }),
      taskAction,
    ];
  };
}
