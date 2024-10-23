import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useState } from 'react';

export const useFetchCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<any>({});

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.generateNodeEndpoint('/me'),
        onGotSuccess: setCurrentUser,
      },
    );
  }, []);

  return currentUser;
};
