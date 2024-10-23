import { useHandleLoginSuccess } from '@lib/hooks/authentication';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { PageUtils } from '@schema-form/utils/page-utils';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginAuthorizePage = (props: any) => {
  const { profileResponse } = props;
  const { push } = useRouter();
  const { t } = useHTranslation('common');
  const handleLoginSuccess = useHandleLoginSuccess();

  const handleRedirect = (profileResponse) => {
    if (profileResponse?.accessToken) {
      handleLoginSuccess({
        loginResponse: profileResponse,
        onGotSuccess: () => push('/'),
      });
    } else {
      notification.error({
        message: t('Login failed, please try again!', {
          vn: 'Đăng nhập không thành công, vui lòng thử lại!',
        }),
      });
      push('/users/login');
    }
  };

  useEffect(() => {
    handleRedirect(profileResponse);
  }, [profileResponse]);

  return <></>;
};

export const getServerSideProps = async ({ locale, query }) => {
  const { token } = query;
  return {
    props: {
      ...(await PageUtils.getServerSideProps({
        locale,
        endpoint: endpoints.endpointWithApiDomain('/profile'),
        headers: {
          Authorization: `Bearer ${token}`,
        },
        dataNamespace: 'profileResponse',
      })),
    },
  };
};

export default LoginAuthorizePage;
