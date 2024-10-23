import { useHTranslation } from '../../../../lib/i18n';
import { TableUtils } from '../../../../lib/table-utils';
import { ConverterUtils } from '../../../../lib/converter';

export const UsersGroupTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return ([
    TableUtils.createTableColumnConfig({
      title: t('Category Name'),
      dataIndex: 'name',
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Overview'),
      dataIndex: 'userIds',
      key: 'userIds',
      render: (userIds, document) => {
        return (
          <>
            <div>
              Total user: {document?.userIds?.length ?? 0}
            </div>
            <div>
              Total org: {document?.orgIds?.length ?? 0}
            </div>
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('CreateAt'),
      dataIndex: 'createAt',
      key: 'createAt',
      render: (userIds, document) => ConverterUtils.dateConverterToString(new Date(document?.createdAt), 'DD/MM/YYYY, HH:mm:ss'),
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ]);
};
