import { endpoints } from '@lib/networks/endpoints';
import { ConvertUtils } from '@lib/utils/convert';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useState } from 'react';

export function getProfileHref(fullName: string, id: string) {
  const currentDomain = location.origin;
  return `${currentDomain}/lien-he/${ConvertUtils.slugify(fullName)}-${id}`;
}

export function useFetchRoles(filter?: any, fields = ['id', 'name']) {
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain('/roles'),
        hiddenValues: {
          filter: {
            fields,
            ...filter,
          },
        },
        onGotSuccess: (response) => {
          setRoles(response?.data || []);
        },
      },
    );
  }, []);

  return roles;
}
