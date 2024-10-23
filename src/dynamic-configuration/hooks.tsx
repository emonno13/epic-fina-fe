import { RootStateOrAny, useSelector } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import { COMMON_PERMISSIONS } from '@lib/permissions';
import { useFetchUser } from '@components/features/organizations/users/hooks';
import {
  useCurrentUser,
  useHasPermissions,
  usePermissions,
} from '../lib/providers/auth';
import { ADMIN_PERMISSIONS, ROLES_CODE } from '../constants/crm/task';

export function useDynamicConfigPosition(): any {
  return useSelector((state: RootStateOrAny) => {
    return state?.position.data;
  }, isEqual);
}

export function usePositionByCode(code: string): any {
  const positions: any = useDynamicConfigPosition();
  return positions?.find((position: any) => position?.code === code);
}

export function useDynamicConfigRoles(): any {
  return useSelector((state: RootStateOrAny) => {
    return state?.roles.data;
  }, isEqual);
}

export function useRoleByCode(code: string): any {
  const roles: any = useDynamicConfigRoles();
  return roles?.find((role: any) => role?.code === code);
}

export function useRoleById(id: string): any {
  const roles: any = useDynamicConfigRoles();
  return roles?.find((role: any) => role?.id === id);
}

export function useIsRealEstateSeller() {
  const realEstateSellerRole = useRoleByCode(ROLES_CODE.SALE_BDS);
  const currentUser = useCurrentUser();
  const userRecord = useFetchUser(currentUser.id, { fields: ['roleIds'] });
  if (!userRecord || isEmpty(userRecord)) {
    return false;
  }

  return userRecord.roleIds.includes(realEstateSellerRole?.id);
}

export function useCheckRoleFinaStaff(): any {
  let isDisplay = usePermissions([
    ADMIN_PERMISSIONS.SITE_OWNER,
    ADMIN_PERMISSIONS.SUPPER_ADMIN,
    ADMIN_PERMISSIONS.ADMIN,
  ]);
  const hasPermissions = useHasPermissions();
  const role = useRoleByCode(ROLES_CODE.FINA_STAFF);

  if (!isDisplay) {
    const permissions = role?.permissions;
    isDisplay = hasPermissions(permissions);
  }
  return isDisplay;
}

export function useHaveDownloadPermission(): boolean {
  const hasPermissions = useHasPermissions();
  return (
    hasPermissions([COMMON_PERMISSIONS.DOWNLOAD_ADVANCED]) ||
    hasPermissions([COMMON_PERMISSIONS.DOWNLOAD])
  );
}
