import React, { useEffect, useState } from 'react';
import { DetailSchemaForm } from './detail-schema-form';
import { RoleTableSchema } from './search-result-table-schema';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels/drawer';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { FormUtils } from '../../../../schema-form/utils/form-utils';

export default React.memo(() => {
  const [dataSourcePermission, setDataSourcePermission] = useState([]);
  const getPermission = async () => {
    const res = await FormUtils.submitForm({
      filter: {
        limit: 200,
        skip: 0,
        order: [
          'typePermission asc',
          'code asc',
        ],
      }, page: 1,
    }, {
      nodeName: 'permissions',
      method: 'get',
    });
    setDataSourcePermission(res?.data);
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <HFeature
      {...{
        featureId: 'role',
        nodeName: 'roles',
      }}>
      <HSearchFormWithCreateButton/>
      <HDocumentDrawerPanel>
        <HFeatureForm {...{
          schema: DetailSchemaForm,
          transport: {
            dataSourcePermission,
          },
        }}/>
      </HDocumentDrawerPanel>
      <HTable schema={RoleTableSchema}/>
    </HFeature>
  );
});