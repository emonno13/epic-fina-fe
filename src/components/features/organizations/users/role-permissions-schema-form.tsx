import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import React, { useEffect, useState } from 'react';
import { HSubForm } from '../../../../schema-form/h-form';
import { FormUtils } from '../../../../schema-form/utils/form-utils';
import {
  createPermissionsSelectionElement,
  createRoleSelectionElement,
} from '../../../shared/common-form-elements/select';
import { PermissionViewer } from '../roles/permissions';

export const RolePermissionDetailSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const [dataSourcePermission, setDataSourcePermission] = useState([]);
  const getPermission = async () => {
    const res = await FormUtils.submitForm(
      {
        filter: {
          limit: 200,
          skip: 0,
          order: ['typePermission asc', 'code asc'],
        },
        page: 1,
      },
      {
        nodeName: 'permissions',
        method: 'get',
      },
    );
    setDataSourcePermission(res?.data);
  };

  useEffect(() => {
    getPermission();
  }, []);
  return [
    createRoleSelectionElement(),
    createPermissionsSelectionElement(),
    createSchemaItem({
      Component: React.Fragment,
      componentProps: {
        children: (
          <HSubForm
            schema={() => [
              ...PermissionViewer({ transport: { dataSourcePermission } }),
            ]}
          />
        ),
      },
    }),
  ];
};
