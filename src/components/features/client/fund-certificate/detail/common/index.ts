import { useHTranslation } from '@lib/i18n';
import { notification } from 'antd';

export const useNoProgramSelectNotification = () => {
  const { t } = useHTranslation('admin');

  return () =>
    notification.warning({
      message: t('Notification', { vn: 'Thông báo' }),
      description: t('Please select program of product', {
        vn: 'Quý khách chưa chọn chương trình',
      }),
    });
};
