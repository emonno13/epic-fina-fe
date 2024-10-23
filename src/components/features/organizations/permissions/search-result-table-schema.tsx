import {
  generatePermission,
  TYPE_PERMISSION,
} from '@components/shared/accessibility/constant';
import { TableUtils } from '@lib/table-utils';
import { ConvertUtils } from '@lib/utils/convert';
import { Tag } from 'antd';
import { useHTranslation } from '../../../../lib/i18n';

export const PermissionTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      dataIndex: 'code',
      sortable: true,
      render: (_, document: any) => {
        return (
          <a>{ConvertUtils.replaceWhiteSpaceAndUpperString(document?.name)}</a>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Permission', { vn: 'Quyền' }),
      sortable: true,
      render: (_, document: any) => {
        if (document?.typePermission === TYPE_PERMISSION.SYS_PERMISSION) {
          return (
            <Tag color="cyan" className={'m-b-10'}>
              {t(document?.name)}
            </Tag>
          );
        }
        const permissions = generatePermission(document?.code);
        const keyPermissions = Object.keys(generatePermission(document?.code));
        return keyPermissions?.map((key, index) => {
          return (
            <Tag color="cyan" key={index} className={'m-b-10'}>
              {t(permissions[key])}
            </Tag>
          );
        });
      },
    }),
    TableUtils.createEditColumn(t('Edit')),
  ];
};
