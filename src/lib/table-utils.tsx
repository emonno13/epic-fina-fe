import { EyeOutlined } from '@ant-design/icons';
import { HFormItemProps } from '@schema-form/h-types';
import { ColumnProps } from 'antd/lib/table';
import { RouteUtils } from '../components/shared/layout/router-contaner/utils';
import { EditIconSvg } from '../icons';
import {
  useCallTransferDocumentControl,
  useCloneDocumentControl,
  useDeleteDocumentControl,
  useEditDocumentControl,
  useEditEventMessageWorkflowControl,
} from '../schema-form/features/hooks/table-hooks';
import { ConverterUtils } from './converter';
import { useHTranslation } from './i18n';

export interface HColumnProps extends ColumnProps<any> {
  sortable?: boolean;
  converter?: Function;
  editable?: boolean;
  itemSchema?: ((f) => void) | HFormItemProps;
}

export const EditAndDeleteCell = ({
  document,
  hideDelete = (f) => false,
  deleteMessage,
  iconEdit = <EditIconSvg />,
}) => {
  const editControl = useEditDocumentControl(document, {}, iconEdit);
  const deleteDocumentControl = useDeleteDocumentControl(
    document,
    {},
    deleteMessage,
  );

  return (
    <div className="d-f-center">
      <div>{editControl()}</div>
      {!hideDelete(document) && (
        <div className="p-l-10" color="danger">
          {deleteDocumentControl()}
        </div>
      )}
    </div>
  );
};

const DeleteCell = ({ document, deleteMessage }) => {
  const deleteDocumentControl = useDeleteDocumentControl(
    document,
    {},
    deleteMessage,
  );

  return (
    <div className="d-f-center">
      <div className="p-l-10" color="danger">
        {deleteDocumentControl()}
      </div>
    </div>
  );
};

const CallTransferControl = ({ document, options }) => {
  options.params = {
    ...(options.params || {}),
    to: {
      type: 'internal',
      number: document.id,
      alias: document.id,
    },
  };

  const callTransferDocumentControl = useCallTransferDocumentControl(
    document,
    options,
  );

  return (
    <div className="d-f-center">
      <div className="p-l-10" color="danger">
        {callTransferDocumentControl}
      </div>
    </div>
  );
};

export const TableUtils = {
  getLoopbackSortOrderFromAntOrder: (
    orderDirection?: 'descend' | 'ascend' | any,
  ) => {
    if (!orderDirection) {
      return 'asc';
    }
    switch (orderDirection.toLowerCase()) {
      case 'descend':
        return 'desc';
      default:
        return 'asc';
    }
  },
  getAntSortOrder: (columnProps: HColumnProps) => {
    const sorter = RouteUtils.getSorterFromUrl();
    if (sorter.columnKey !== columnProps.key || !sorter.order) {
      return;
    }
    switch (sorter.order.toLowerCase()) {
      case 'desc':
        return 'descend';
      default:
        return 'ascend';
    }
  },
  createColumnCreatedAt: () => {
    const { t } = useHTranslation('admin-common');
    return TableUtils.createTableColumnConfig({
      title: t('Created At', { vn: 'Thời gian tạo' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      sortable: true,
      converter: ConverterUtils.dateConverter,
    });
  },
  createColumnUpdatedAt: () => {
    const { t } = useHTranslation('admin-common');
    return TableUtils.createTableColumnConfig({
      title: t('Updated At', { vn: 'Thời gian cập nhật' }),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sortable: true,
      responsive: ['md'],
      converter: ConverterUtils.dateConverter,
    });
  },
  createColumnCreatedBy: () => {
    const { t } = useHTranslation('admin-common');
    return TableUtils.createTableColumnConfig({
      title: t('Created By', { vn: 'Tạo bởi' }),
      dataIndex: 'createdBy',
      key: 'createdBy',
      sortable: true,
      converter: ConverterUtils.showUserConverter,
    });
  },
  createColumnUpdateBy: () => {
    const { t } = useHTranslation('admin-common');
    return TableUtils.createTableColumnConfig({
      title: t('Updated By', { vn: 'Cập nhật bỏi' }),
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      sortable: true,
      converter: ConverterUtils.showUserConverter,
    });
  },
  createTableColumnConfig: (columnProps: HColumnProps) => {
    const objectConfigs = Object.assign({}, columnProps);
    if (!columnProps.sortable) {
      return objectConfigs;
    }
    if (!objectConfigs.sortOrder) {
      objectConfigs.sortOrder = TableUtils.getAntSortOrder(columnProps);
    }
    if (!objectConfigs.sorter) {
      objectConfigs.sorter = (doc1, doc2) => doc1.age - doc2.age;
    }
    if (!columnProps.render && columnProps.converter) {
      objectConfigs.render = (value) =>
        columnProps.converter && columnProps.converter(value);
    }
    return objectConfigs;
  },
  createEditAndDeleteControlColumn: (
    title = 'Action',
    options: any = { rendering: true },
    deleteMessage = '',
  ) => {
    const { t } = useHTranslation('admin-common');
    const { hideDelete = (f) => false, iconEdit } = options;
    return {
      title: t(title),
      dataIndex: 'action',
      width: 100,
      responsive: ['md'],
      fixed: 'right',
      render: (_, document) => {
        return (
          <EditAndDeleteCell
            {...{
              document,
              hideDelete,
              deleteMessage,
              iconEdit,
            }}
          />
        );
      },
    };
  },
  createCloneEditAndDeleteControlColumn: (title = 'Action') => {
    const { t } = useHTranslation('admin-common');
    const editControl = useEditDocumentControl();
    const deleteDocumentControl = useDeleteDocumentControl();
    return {
      title: t(title),
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_, document) => {
        const cloneControl = useCloneDocumentControl(document);
        return (
          <div className="d-f-center">
            <div>{cloneControl}</div>
            <div className="p-l-10">{editControl(document)}</div>
            <div className="p-l-10" color="danger">
              {deleteDocumentControl(document)}
            </div>
          </div>
        );
      },
    };
  },
  createDeleteControlColumn: (
    title = 'Action',
    options: any = {},
    deleteMessage = '',
  ) => {
    const { t } = useHTranslation('admin-common');
    return {
      title: t(title),
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_, document) => {
        return <DeleteCell {...{ document, deleteMessage }} />;
      },
    };
  },
  createCallTransferControlColumn: (title = 'Action', options: any = {}) => {
    return {
      title,
      dataIndex: 'action',
      width: 30,
      render: (_, document) => {
        return (
          <CallTransferControl
            {...{
              document,
              options,
            }}
          />
        );
      },
    };
  },
  createEditColumn: (title = 'Action') => {
    const { t } = useHTranslation('admin-common');
    const editControl = useEditDocumentControl();
    return {
      title: t(title),
      width: 100,
      fixed: 'right',
      render: (document) => (
        <div className="d-f-center">
          <div>{editControl(document, undefined, <EyeOutlined />)}</div>
        </div>
      ),
    };
  },
  createEditEventMessageWorkflowColumn: (title = 'Action') => {
    const { t } = useHTranslation('admin-common');
    const editControl = useEditEventMessageWorkflowControl();
    return TableUtils.createTableColumnConfig({
      title: t('Code', { vn: 'Code' }),
      dataIndex: 'code',
      key: 'code',
      sortable: true,
      render: (_, document) => {
        return <div>{editControl(document)}</div>;
      },
    });
  },
  createEditDocumentWithField: ({ fieldName = '', title = 'Action' }) => {
    const { t } = useHTranslation('admin-common');
    return TableUtils.createTableColumnConfig({
      title: t(title),
      dataIndex: fieldName,
      key: fieldName,
      sortable: true,
      render: (value, document) => {
        const editControl = useEditDocumentControl(
          document,
          {},
          <a>{value}</a>,
        );
        return <div>{editControl()}</div>;
      },
    });
  },
  isEditing: (document) => {
    const metaData = document?.metaData;
    if (!document?.id || !metaData?.editingKey) return false;
    return document.id === metaData.editingKey;
  },
  createColumnOrg: () => {
    const { t } = useHTranslation('admin-common');
    return TableUtils.createTableColumnConfig({
      title: t('Organization'),
      dataIndex: 'org',
      key: 'org',
      sortable: true,
      converter: ConverterUtils.showOrgConverter,
    });
  },
};
