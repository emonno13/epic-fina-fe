import { useStringee } from '@components/shared/stringee/utils/hooks';
import { ADMIN_PERMISSIONS } from '@constants/crm/task';
import { useMeliSocket } from '@schema-form/ws/hooks';
import Cookies from 'js-cookie';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'underscore';
import {
  connectMeliSocket,
  disconnectMeliSocket,
  setPermission,
} from '../../store/actions';
import { ADMIN_AND_SUPER_ADMIN_PERMISSIONS } from '../permissions';

type IAuthContext = {
  isAuthenticated: boolean;
  currentUser: any;
  token?: string;
  stringeeToken?: string;
  stringeeTokenApi?: string;
  stringeeAgent: any;
  userPermissions?: string[];
  currentOrganization: object;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setStringeeToken: React.Dispatch<React.SetStateAction<string>>;
  setStringeeTokenApi: React.Dispatch<React.SetStateAction<string>>;
  setCurrentOrganization: React.Dispatch<React.SetStateAction<object>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<object>>;
  setStringeeAgent: React.Dispatch<React.SetStateAction<object>>;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserPermissions: React.Dispatch<React.SetStateAction<string[]>>;
};

const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  token: undefined,
  stringeeToken: undefined,
  stringeeTokenApi: undefined,
  userPermissions: [],
  currentUser: {},
  stringeeAgent: {},
  currentOrganization: {},
  setCurrentOrganization: () => {},
  setToken: () => {},
  setStringeeToken: () => {},
  setStringeeTokenApi: () => {},
  setCurrentUser: () => {},
  setStringeeAgent: () => {},
  setAuthenticated: () => {},
  setUserPermissions: () => {},
});

/**
 * The initial value of `isAuthenticated` comes from the `authenticated`
 * prop which gets set by _app. We store that value in state and ignore
 * the prop from then on. The value can be changed by calling the
 * `setAuthenticated()` method in the context.
 */
export const AuthProvider = ({
  children,
  user = {},
  organization = {},
  authenticated = false,
  ...props
}: {
  children: ReactNode;
  user: object;
  stringeeToken: string;
  stringeeTokenApi: string;
  stringeeAgent: object;
  token: string;
  organization: object;
  authenticated: boolean;
}) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setAuthenticated] =
    React.useState<boolean>(authenticated);
  const [currentUser, setCurrentUser] = React.useState<any>(user);
  const [currentOrganization, setCurrentOrganization] =
    React.useState<object>(organization);
  const [token, setToken] = React.useState<string>(props.token);
  const [stringeeToken, setStringeeToken] = React.useState<string>(
    props.stringeeToken,
  );
  const [stringeeTokenApi, setStringeeTokenApi] = React.useState<string>(
    props.stringeeTokenApi,
  );
  const [stringeeAgent, setStringeeAgent] = React.useState<object>(
    props.stringeeAgent,
  );
  const socket = useMeliSocket();

  const userPermissions = useSelector((state: RootStateOrAny) => {
    return state?.common?.permissions;
  }, isEqual);
  const setUserPermissions = (permissions: any) => {
    dispatch(setPermission({ permissions: permissions }));
  };

  useEffect(() => {
    if (!currentUser?.id) {
      dispatch(disconnectMeliSocket());
      return;
    }

    if (!socket?.id) {
      dispatch(connectMeliSocket({ currentUser }));
    }
  }, [currentUser?.id, socket?.id]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        currentUser,
        setCurrentUser,
        userPermissions,
        setUserPermissions,
        currentOrganization,
        setCurrentOrganization,
        stringeeTokenApi,
        setStringeeTokenApi,
        setToken,
        token,
        stringeeToken,
        setStringeeToken,
        stringeeAgent,
        setStringeeAgent,
      }}
    >
      <CheckConnectStringee />
      {children}
    </AuthContext.Provider>
  );
};

const CheckConnectStringee = () => {
  const { isConnected } = useStringee();
  const { setStringeeToken } = useAuth();
  useEffect(() => {
    const stringeeToken = Cookies.get('stringeeToken');
    if (isConnected && stringeeToken) {
      setStringeeToken(stringeeToken);
    }
  }, [isConnected]);
  return <></>;
};

export function useAuth(): IAuthContext {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useIsAuthenticated(): boolean {
  const context = useAuth();
  return context.isAuthenticated;
}

export function useRefferalLink(defaultUser?: any) {
  const currentUserProfile = useCurrentUser();
  const user = defaultUser || currentUserProfile;
  const refferalLink = useMemo(
    () => `${location.origin}/users/signup?refCode=${user?.refCode}`,
    [user],
  );
  return refferalLink;
}

export function useCurrentUser(): any {
  const context = useAuth();
  return context.currentUser;
}

export function usePermission(permissionCode = ''): boolean {
  const { userPermissions } = useAuth();

  if (!permissionCode) {
    return false;
  }

  return (userPermissions || []).includes(permissionCode.trim());
}

export function validPermissions(
  checkingPermissions: string[] = [],
  userPermissions: string[] = [],
  checkAllPermissions = false,
): boolean {
  if (checkingPermissions.length === 0 || userPermissions.length === 0) {
    return false;
  }

  if (checkAllPermissions) {
    return checkingPermissions.every(
      (p) =>
        Object.values(ADMIN_PERMISSIONS).includes(p) ||
        userPermissions.includes(p),
    );
  }

  for (let i = 0; i < checkingPermissions.length; i++) {
    if (userPermissions?.includes(checkingPermissions[i])) {
      return true;
    }
  }

  return false;
}

export function usePermissions(permissionCodes: string[] = []): boolean {
  const { userPermissions = [] } = useAuth();
  return validPermissions(permissionCodes, userPermissions);
}

export function useStringeeToken(): string | undefined {
  const { stringeeToken } = useAuth();
  return stringeeToken;
}

export function useIsAdminOrSuperAdmin(): boolean {
  return usePermissions(ADMIN_AND_SUPER_ADMIN_PERMISSIONS);
}

export function validAllPermissions(
  checkingPermissions: string[] = [],
  userPermissions: string[] = [],
): boolean {
  if (checkingPermissions.length === 0 || userPermissions.length === 0) {
    return false;
  }
  return checkingPermissions.every((el) => userPermissions.includes(el));
}

export function useHasPermissions() {
  const { userPermissions = [] } = useAuth();
  const isAdmin = useMemo(() => {
    return userPermissions.some((el) =>
      [
        ADMIN_PERMISSIONS.SITE_OWNER,
        ADMIN_PERMISSIONS.SUPPER_ADMIN,
        ADMIN_PERMISSIONS.ADMIN,
      ].includes(el),
    );
  }, [userPermissions]);

  return (permissionCodes: string[] = []): boolean => {
    return isAdmin || validAllPermissions(permissionCodes, userPermissions);
  };
}
