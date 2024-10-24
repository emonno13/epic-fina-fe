import { useForm } from 'antd/lib/form/Form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { connectToStringeeServer } from '@components/shared/stringee/actions';
import { handleLogin } from '@components/shared/user/utils';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth, useCurrentUser } from '@lib/providers/auth';
import { AuthenticationUtils } from '@lib/utils/authentication-utils';
import { callApi } from '@schema-form/common/actions';
import { useMeliSocket } from '@schema-form/ws/hooks';
import { disconnectMeliSocket, setPermission } from '@store/actions';

export const useHandleLogout = () => {
  const {
    setAuthenticated,
    setCurrentUser,
    setToken,
    setUserPermissions,
    currentUser,
  } = useAuth();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const socket = useMeliSocket();

  return async (redirectUrl = '/') => {
    if (currentUser?.id && socket) {
      dispatch(disconnectMeliSocket());
    }
    setAuthenticated(false);
    setCurrentUser({});
    setToken('');
    setUserPermissions([]);
    AuthenticationUtils.resetCookies();
    dispatch(setPermission({ permissions: [] }));
    await push(redirectUrl);
  };
};

export const useHandleLoginSuccess = () => {
  const useAuthObject = useAuth();
  const { setStringeeTokenApi, setStringeeToken, setStringeeAgent } =
    useAuthObject;

  const { query, push } = useRouter();
  const dispatch = useDispatch();
  const [form] = useForm();
  const currentUser = useCurrentUser();

  const onLoginStringeeSuccess = (response) => {
    if (!response) {
      return;
    }

    const { stringeeToken, stringeeTokenApi, stringeeAgent } = response || {};

    setStringeeToken(stringeeToken);
    setStringeeTokenApi(stringeeTokenApi);
    setStringeeAgent(stringeeAgent);

    Cookies.set('stringeeToken', stringeeToken);
    Cookies.set('stringeeAgent', JSON.stringify(stringeeAgent));
    Cookies.set('stringeeTokenApi', stringeeTokenApi);

    if (stringeeToken) {
      setTimeout(() => {
        dispatch(
          connectToStringeeServer({
            stringeeToken,
            stringeeAgent,
            setStringeeToken,
            currentUser,
          }),
        );
      }, 100);
    }
  };

  const loginToStringee = (userId) => {
    const endpoint = endpoints.endpointWithApiDomain(
      `/stringee-agents/${userId}/token`,
    );
    dispatch(
      callApi({ method: 'get', endpoint, callback: onLoginStringeeSuccess }),
    );
  };

  const onLoginSuccess = async (response, onGotSuccess) => {
    const { user, permissions = [] } = response || {};

    handleLogin({
      response,
      useAuthObject,
      callback: () => {
        const redirectUrl: any = query?.prePage || query.redirect || '/';

        dispatch(setPermission({ permissions }));
        user?.isAgent && user?.id && loginToStringee(user.id);

        if (onGotSuccess) {
          onGotSuccess({
            response,
            formValues: form.getFieldsValue(),
          });

          return;
        }

        push(redirectUrl);
      },
    });
  };

  return async ({
    loginResponse,
    onGotSuccess,
  }: {
    loginResponse: any;
    onGotSuccess?: any;
  }) => {
    await onLoginSuccess(loginResponse, onGotSuccess);
  };
};
