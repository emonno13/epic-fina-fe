import { useHTranslation } from '@lib/i18n';
import { MOBILE_MANAGEMENT_LIST } from './constants';
import MobileManagementItem from './management-item';

import './mobile-management.module.scss';

const MobileManagement = () => {
  const { t } = useHTranslation('mobile');
  return (
    <div>
      {MOBILE_MANAGEMENT_LIST(t).map((item, index) => {
        return (
          <MobileManagementItem key={`mobile-management-${index}`} {...item} />
        );
      })}
    </div>
  );
};

export default MobileManagement;
