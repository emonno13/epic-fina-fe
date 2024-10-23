import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useState } from 'react';

export interface IKyc {
  mioInfo?: {
    phone?: string;
    email?: string;
  };
}

export const kycStatus = {
  IN_PROCESS: 'inProcess',
  SUCCESSFUL: 'successful',
  FAILURE: 'failure',
};

export const useAccountInfoHadKycWithMio = () => {
  const currentUser = useCurrentUser();
  const [kycData, setKycData] = useState<IKyc>();

  useEffect(() => {
    if (!currentUser?.id) return;
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain('/kycs'),
        hiddenValues: {
          where: {
            userId: currentUser.id,
            status: kycStatus.SUCCESSFUL,
          },
          fields: ['id', 'mioInfo'],
        },
        onGotSuccess: (response: { data: IKyc[] }) => {
          response?.data?.[0] && setKycData(response.data[0]);
        },
        onGotError: () => setKycData(undefined),
      },
    );
  }, [currentUser]);

  return kycData;
};
