/* eslint-disable @next/next/no-img-element */
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import SocialButton from '.';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    const response = await FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain('/auth/thirdparty/google'),
      },
    );

    if (response?.redirectUrl) {
      location.href = response.redirectUrl;
    }
  };

  return (
    <SocialButton onClick={handleGoogleLogin}>
      <img src="/assets/images/google.png" />
    </SocialButton>
  );
};

export default GoogleLoginButton;
