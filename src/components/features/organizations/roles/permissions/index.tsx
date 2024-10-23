import {
  generatePermission,
  TYPE_PERMISSION,
} from '@components/shared/accessibility/constant';
import { useHTranslation } from '@lib/i18n';
import { HColumnProps, TableUtils } from '@lib/table-utils';
import { HSubForm } from '@schema-form/h-form';
import Checkbox from 'antd/lib/checkbox';
import Table from 'antd/lib/table/Table';
import { useMemo } from 'react';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../schema-form/h-types';
import { CheckBoxTooltip, CommonPermissions } from './common';
import { PermissionTableSchema } from './permission-table-schema';

export const PermissionViewer = (props: HFormProps): HFormItemProps[] => {
  const { transport } = props;
  return [
    createSchemaItem({
      Component: PermissionTable,
      name: 'permissions',
      componentProps: {
        dataSourcePermission: transport?.dataSourcePermission,
      },
    }),
  ];
};

export const PermissionTable = (props) => {
  const { dataSourcePermission, columns } = useMemo(() => {
    return renderTableCheckBox(props);
  }, [props]);

  return (
    <Checkbox.Group style={{ width: '100%' }} {...props}>
      <Table
        {...{
          dataSource: dataSourcePermission,
          columns,
          pagination: false,
          size: 'small',
        }}
      />
    </Checkbox.Group>
  );
};

const renderTableCheckBox = (props) => {
  const dataSourcePermission = props?.dataSourcePermission
    ? [...props?.dataSourcePermission]
    : [];
  const { t } = useHTranslation('admin-common');
  const colPermissionModel = {};
  const rowPermissionModel = {};
  dataSourcePermission?.map((document) => {
    const permissions = generatePermission(document?.code);
    const keyPermissions = Object.keys(permissions);
    if (document?.typePermission === TYPE_PERMISSION.MODEL_PERMISSION) {
      keyPermissions?.map((key) => {
        const permissionValue = permissions[key];
        colPermissionModel[key] = colPermissionModel[key]
          ? [...colPermissionModel[key], permissionValue]
          : [permissionValue];
        rowPermissionModel[document?.code] = rowPermissionModel[document?.code]
          ? [...rowPermissionModel[document?.code], permissionValue]
          : [permissionValue];
        document[key] = (
          <CheckBoxTooltip
            {...{
              titleTooltip: t(permissionValue),
              value: permissionValue,
              key,
            }}
          />
        );
      });
    }
    if (document?.typePermission === TYPE_PERMISSION.SYS_PERMISSION) {
      document[keyPermissions[0]] = (
        <CheckBoxTooltip
          {...{
            titleTooltip: t(document?.name),
            value: document?.name,
            key: document?.name,
          }}
        />
      );
    }
  });
  const columns: HColumnProps[] = generateColumns(
    props,
    colPermissionModel,
    rowPermissionModel,
  );
  return { dataSourcePermission, columns };
};

const generateColumns = (
  hformProps,
  colPermissionModel,
  rowPermissionModel,
) => {
  const permissions = generatePermission('');
  const keyPermissions = Object.keys(permissions);
  const columns: HColumnProps[] = [];
  columns.push(...PermissionTableSchema(hformProps, rowPermissionModel));
  keyPermissions?.map((key) => {
    columns.push(
      TableUtils.createTableColumnConfig({
        title: (
          <GroupCheckAll
            {...{
              keyName: key,
              groupPermissionModelBykey: colPermissionModel[key],
            }}
          />
        ),
        dataIndex: key,
        align: 'center',
        render: (children, document) => {
          const colSpan =
            document?.typePermission === TYPE_PERMISSION.SYS_PERMISSION &&
            children
              ? keyPermissions.length
              : 1;
          return {
            children: children,
            props: {
              colSpan: children ? colSpan : 0,
            },
          };
        },
      }),
    );
  });
  return columns;
};

interface GroupCheckAllProps {
  keyName: any;
  groupPermissionModelBykey: any[];
  showByType?: 'row' | 'col';
}

export const GroupCheckAll = ({
  keyName,
  groupPermissionModelBykey,
  showByType = 'col',
}: GroupCheckAllProps) => {
  const { t } = useHTranslation('admin-common');
  return (
    <>
      {showByType === 'col' && t(keyName)}
      <HSubForm
        {...{
          schema: () => [
            createSchemaItem({
              Component: ({ value, onChange }) => {
                const { indeterminate, checkAll } = useMemo(() => {
                  return CommonPermissions.checkHasValueInlist(
                    value,
                    groupPermissionModelBykey,
                  );
                }, [groupPermissionModelBykey, value]);

                const handleOnClick = () => {
                  let newPermissionList: any[] = [];
                  if (checkAll) {
                    newPermissionList = value?.filter(
                      (item) => !groupPermissionModelBykey.includes(item),
                    );
                  } else {
                    newPermissionList = [
                      ...new Set([
                        ...(value || []),
                        ...(groupPermissionModelBykey || []),
                      ]),
                    ];
                  }
                  onChange(newPermissionList);
                };

                return (
                  <Checkbox.Group
                    key={`check_all_${keyName}`}
                    value={checkAll ? [`check_${keyName}`] : []}
                    className="m-b-0"
                  >
                    <Checkbox
                      indeterminate={indeterminate}
                      onClick={handleOnClick}
                      value={`check_${keyName}`}
                      style={{ marginLeft: 16 }}
                      className="m-b-0"
                    >
                      {showByType === 'row' && (
                        <a>{t(keyName).toUpperCase()}</a>
                      )}
                    </Checkbox>
                  </Checkbox.Group>
                );
              },
              name: 'permissions',
              className: 'm-b-0',
            }),
          ],
        }}
      />
    </>
  );
};
