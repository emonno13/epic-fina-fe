import { RouteUtils } from '../layout/router-contaner/utils';

export const MenuAdminUtils = {
  getAdminPossiblePaths: () => {
    return Object.values(RouteUtils.getAllAdminKeyAndPathsFromRoute());
  },
};