import { Popover, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import React from 'react';
import { useHTranslation } from '../../../../lib/i18n';
import { TableUtils } from '../../../../lib/table-utils';
import { ConverterUtils } from '../../../../lib/converter';
import { TASK_STATUSES_COLOR_MAPPING } from '../../../../constants/crm/task';
import { mappingStatusOfTask } from '../tasks/utils';
import { ViewTimeUpdate } from '../../../shared/view-time-update';
import { PRODUCT_TYPES } from '../tasks/constans';
import { ExpandNoteSvg } from '../../../../icons';
import { useEditDocumentControl } from '../../../../schema-form/features/hooks';

export const TaskAssignTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return ([
    TableUtils.createTableColumnConfig({
      title: t('User'),
      dataIndex: 'user',
      sortable: true,
      key: 'user',
      render: (user) => <div>{ConverterUtils.getFullNameUser(user)}</div>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Source'),
      dataIndex: 'source',
      key: 'source',
      ellipsis: true,
      render: (source, document) => {
        return (
          <>
            <b>Phân
              loại: </b> {PRODUCT_TYPES(t)?.find(item => item?.value === document?.task.productType)?.label || '_'}
          </>
        );
      },
    }),
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (status, doc) => {
        return (
          <>
            <Tag color={TASK_STATUSES_COLOR_MAPPING[status]}>
              {mappingStatusOfTask({ t, status, statusAssign: doc?.statusAssign || '' })}
            </Tag>
            <ViewTimeUpdate createdAt={doc?.createdAt} updatedAt={doc?.updatedAt}/>
          </>
        );
      },
    },
    TableUtils.createTableColumnConfig({
      title: t('Note'),
      dataIndex: 'note',
      key: 'note',
      width: 200,
      render: (status, doc) => (
        doc?.task.note && (
          <div className="table-note-task">
            <p>{doc?.task.note}</p>
            <Popover content={<div className="note-content">{doc?.task.note}</div>}
              overlayClassName="popover-custom-line popover-note">
              <ExpandNoteSvg className="cursor-pointer"/>
            </Popover>
          </div>
        )
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Thời gian chia sẻ',
      dataIndex: 'createdAt',
      width: '300px',
      key: 'createdAt',
      render: createdAt => ConverterUtils.fullDatetimeConverter(createdAt),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Xác nhận',
      width: 100,
      fixed: 'right',
      render: (source, document) => {
        const editControl = useEditDocumentControl();
        if (document.status !== 'waited') return <></>;
        return (
          <div className="d-f-center">
            <div>
              {editControl(document, undefined, <EyeOutlined/>)}
            </div>
          </div>
        );
      },
    }),
  ]);
};
