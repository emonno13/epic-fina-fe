import { useEffect, useMemo, useState } from 'react';

import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { PRIVACY_POLICY_CODE } from './constants';

export const usePrivacyPolicyFina = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState<string>('');

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain(
          `/configurations/public/${PRIVACY_POLICY_CODE}`,
        ),
        onGotError: () => {
          setPrivacyPolicy('');
        },
        onGotSuccess: (response) => {
          setPrivacyPolicy(response?.value || '');
        },
      },
    );
  }, []);

  return useMemo(() => privacyPolicy, [privacyPolicy]);
};
