import { TYPE_PERMISSION } from '@components/shared/accessibility/constant';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Row } from 'antd';
import { GroupCheckAll } from '.';
import { HFormProps } from '../../../../../schema-form/h-types';

export const PermissionTableSchema = (
  props: HFormProps,
  groupRowPermissionModel: any,
) => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: 'Name',
      dataIndex: 'code',
      sortable: true,
      render: (_, document: any) => {
        if (document?.typePermission === TYPE_PERMISSION.MODEL_PERMISSION) {
          return (
            <Row align="middle">
              <GroupCheckAll
                keyName={document?.code}
                groupPermissionModelBykey={
                  groupRowPermissionModel[document?.code]
                }
                showByType="row"
              />
            </Row>
          );
        }
        return <a className={'m-l-20'}>{t(document?.name).toUpperCase()}</a>;
      },
    }),
  ];
};
