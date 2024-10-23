import { useHTranslation } from '../../../../../lib/i18n';
import { TableUtils } from '../../../../../lib/table-utils';

export const GuaranteeHospitalDetailSchemaTable = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createEditDocumentWithField({
      fieldName: 'code',
      title: 'Code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      key: 'name',
      dataIndex: 'name',
      width: 300,
    }),
    TableUtils.createColumnCreatedAt(),
    // TableUtils.createColumnCreatedBy(),
  ];
};
