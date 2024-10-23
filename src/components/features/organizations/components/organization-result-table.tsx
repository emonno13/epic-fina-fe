import { useDispatch } from 'react-redux';

import { useSetDataSource, useTableSourceData } from '../../../../schema-form/features/hooks/table-hooks';
import { HTable } from '../../../../schema-form/features';
import { OrgTableSchema } from '../org-search-result-table-schema';
import { endpoints } from '../../../../lib/networks/endpoints';
import { FormDataUtils } from '../../../../lib/networks/http/form-data-utils';
import { callApi } from '../../../../schema-form/common/actions';

export const OrganizationResultTable = () => {
  const dispatch = useDispatch();
  const setDataSource = useSetDataSource();
  const dataSource = useTableSourceData();

  return (
    <HTable {...{
      schema: OrgTableSchema,
      expandable: {
        onExpand: (expanded, record) => {
          if (!expanded) {
            return;
          }

          const handleSuccess = (res) => {
            record.children = res?.data;
            setDataSource([...dataSource, {}]);
          };

          const params = {
            filter: {
              where: {
                parentOrgId: record.id || record._id,
              },
              include: [{ relation: 'children' }],
            },
          };

          const endpoint = endpoints.endpointWithApiDomain(`/organizations?${FormDataUtils.convertObjectToUri(params)}`);

          dispatch(callApi({ method: 'get', params, endpoint, callback: handleSuccess }));
        },
      },
    }}/>
  );
};