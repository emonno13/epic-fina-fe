import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

export const PreferentialReviewsTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Title'),
      dataIndex: 'createdAt',
      render: (value, item) => {
        return (
          <span>
            Tháng {item?.month} - {item?.year}
          </span>
        );
      },
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
