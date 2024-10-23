import { ADMIN_PERMISSIONS } from './constant';
import { usePermissions } from '../../../lib/providers/auth';

interface WithPermissionProps {
  permissions?: string[],
  children: any
}

export const WithPermission = (props: WithPermissionProps) => {
  const { permissions = [], children } = props;

  permissions.push(ADMIN_PERMISSIONS.SITE_OWNER, ADMIN_PERMISSIONS.SUPPER_ADMIN, ADMIN_PERMISSIONS.ADMIN);

  const allowed = usePermissions(permissions);

  if (!allowed) {
    return null;
  }
  return children;
};
