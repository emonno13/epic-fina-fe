import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useMemo, useState } from 'react';
import { TERMS_OF_USER_CODE } from './constants';

export const useTermsOfUserFina = () => {
  const [terms, setTerms] = useState<string>('');

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain(
          `/configurations/public/${TERMS_OF_USER_CODE}`,
        ),
        onGotError: () => {
          setTerms('');
        },
        onGotSuccess: (response) => {
          setTerms(response?.value || '');
        },
      },
    );
  }, [terms]);

  return useMemo(() => terms, [terms]);
};
