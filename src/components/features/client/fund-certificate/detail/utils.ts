import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';

export const checkRegisteredOnMio = async () => {
  const response = await FormUtils.submitForm(
    {},
    {
      endpoint: endpoints.endpointWithApiDomain(
        '/users/check-investor-existed-on-mio',
      ),
    },
  );
  return response;
};
