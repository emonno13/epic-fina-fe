import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import { useHTranslation } from '../../../../lib/i18n';

export const RoleTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Role name', { vn: 'Tên nhóm quyền' }),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
      width: '20%',
      render: (text) => <a>{text}</a>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Permission', { vn: 'Quyền' }),
      sortable: true,
      render: (_, document: any) => {
        return document?.permissions?.map((value, index) => {
          return (
            <Tag color="cyan" key={index} className={'m-b-10'}>
              {t(value)}
            </Tag>
          );
        });
      },
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
