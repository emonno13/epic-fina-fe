import { Tag } from 'antd';

import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';

import { TableUtils } from '@lib/table-utils';
import {
  useDeleteDocumentControl,
  useEditDocumentControl,
} from '../../../../../schema-form/features/hooks';
import {
  EVENT_TYPES_COLOR_MAPPING,
  EVENT_TYPES_LABEL_MAPPING,
} from './constant';

export const useEventAction = () => {
  const editControl = useEditDocumentControl();
  const deleteDocumentControl = useDeleteDocumentControl();

  return {
    title: 'Hành động',
    key: 'action',
    width: 120,
    render: (document) => {
      return (
        <div className="d-f-center">
          <div>{editControl(document)}</div>
          {!document?.eventMessageWorkflows && (
            <div className="p-l-10" color="danger">
              {deleteDocumentControl(document)}
            </div>
          )}
        </div>
      );
    },
  };
};

export const EventTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Code', { en: 'Code', vn: 'Mã Code' }),
      dataIndex: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      dataIndex: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Start time', { en: 'Start time', vn: 'Ngày bắt đầu' }),
      dataIndex: 'startTime',
      key: 'startTime',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('End time', { en: 'End time', vn: 'Ngày kết thúc' }),
      dataIndex: 'endTime',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      render: (type: string) => (
        <Tag color={EVENT_TYPES_COLOR_MAPPING[type]}>
          {EVENT_TYPES_LABEL_MAPPING[type]}
        </Tag>
      ),
    }),
    TableUtils.createColumnCreatedAt(),
    TableUtils.createColumnCreatedBy(),
    useEventAction(),
  ];
};
