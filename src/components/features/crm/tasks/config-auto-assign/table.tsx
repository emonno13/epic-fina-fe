import moment from 'moment';
import { PreViewUser } from '@components/features/fina/deals/deals-component-common/preview-user';
import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

export const TableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      dataIndex: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, transactionDetail) => {
        return (
          <ItemViewer
            {...{
              label: '',
              value:
                moment(transactionDetail?.createdAt).format('DD/MM/YYYY') ?? '',
              labelClassName: 'm-b-10',
            }}
          />
        );
      },
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};

export const TableUserSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      dataIndex: 'user',
      key: 'user',
      render: (user, column) => {
        return <PreViewUser user={user} />;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('setting', { vn: 'Cài đặt' }),
      dataIndex: 'maxTask',
      render: (user, column) => {
        return (
          <>
            <div>
              {t('Tối đa')}: {column?.maxTask || '_'} YCTV
            </div>
            <div>
              {t('Tối đa trong ngày')}: {column.maxTaskInDay || '_'} YCTV
            </div>
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Curent', { vn: 'Hiện tại' }),
      dataIndex: 'maxTask',
      render: (user, column) => {
        return (
          <>
            <div>
              {t('All', { vn: 'Tất cả' })}: {column?.totalTaskCurrent || '_'}{' '}
              YCTV
            </div>
            <div>
              {t('Today', { vn: 'Hôm nay' })}: {column.totalTaskToday || '_'}{' '}
              YCTV
            </div>
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Thứ tự ưu tiên'),
      dataIndex: 'numberIndex',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
