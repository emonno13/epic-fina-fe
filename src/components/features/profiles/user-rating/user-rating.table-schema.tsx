import { HUserRating } from '@components/shared/common/h-user-rating';
import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';

export const UserRatingTableSchema = (props?: any) => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t(''),
      sortable: true,
      render: (_, document: any) => {
        return (
          <div>
            <HUserRating {...{ sender: document?.sender, rating: document }} />
          </div>
        );
      },
    }),
  ];
};
