import { AnyObject } from '@components/shared/atom/type';
import { endpoints } from '@lib/networks/endpoints';
import { useTableSourceData } from '@schema-form/features/hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { REAL_ESTATE_TASK_FEATURE_ID } from '..';

export function useAssignedPartnerStaffs() {
  const [users, setUsers] = useState<AnyObject[]>([]);
  const dataSource = useTableSourceData(REAL_ESTATE_TASK_FEATURE_ID);
  const queryTaskIds = useMemo(
    () => dataSource?.map((task) => task.id),
    [dataSource],
  );

  useEffect(() => {
    if (isEmpty(queryTaskIds)) {
      setUsers([]);
      return;
    }

    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(
          '/tasks/assigned-partner-staffs',
        ),
        hiddenValues: {
          filter: {
            where: {
              id: {
                inq: queryTaskIds,
              },
            },
            fields: ['assignToPartnerStaffIds', 'id'],
          },
        },
        onGotSuccess: setUsers,
      },
    );
  }, [queryTaskIds]);

  return useMemo(() => users, [users]);
}
