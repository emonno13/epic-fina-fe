import { useHTranslation } from '../../../../../lib/i18n';

export const PhoneCallDrawerHeader = () => {
  const { t } = useHTranslation('admin-common');

  return (
    <div className="phone-call-drawer-header">
      <b className="phone-call-drawer-header__title">
        {t('Phone', { vn: 'Điện thoại', en: 'Phone' })}
      </b>
    </div>
  );
};