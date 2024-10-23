import SocialButton from './social-button';
import { FormUtils } from '../../../schema-form/utils/form-utils';
import { endpoints } from '../../../lib/networks/endpoints';

const FacebookLoginButton = () => {
  const handleGoogleLogin = async () => {
    const response = await FormUtils.submitForm({}, {
      method: 'get',
      endpoint: endpoints.endpointWithApiDomain('/auth/thirdparty/facebook'),
    });

    if (response?.redirectUrl) {
      location.href = response.redirectUrl;
    }
  };

  return (
    <SocialButton onClick={handleGoogleLogin}>
      <img src="/assets/images/fb.png" />
    </SocialButton>
  );
};

export default FacebookLoginButton;