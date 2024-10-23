import { useMobile } from '@components/features/mobile-app/hooks/login-drawer-hooks';
import { MOBILE_TASK_TYPE } from '@components/features/mobile-app/mobile-create-task/constants';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useHTranslation } from '@lib/i18n';
import { FINANCE_MENU_DATA } from '../../../constants';
import ProductsMenuContentLinks from '../products-menu-content-links';

const ProductsMenuContentFinance = () => {
  const { t } = useHTranslation('mobile');
  const { setCreateTaskVisible, setTaskExtraValues } = useMobile();

  const openCreateTask = () => {
    setCreateTaskVisible(true);
    setTaskExtraValues({
      type: MOBILE_TASK_TYPE.WANT_TO_BUY,
      subject: t('Create counselling request', {
        en: 'Create counselling request',
        vn: 'Tạo yêu cầu tư vấn',
      }),
    });
  };
  const handleRedirect = async (path) => {
    await RouteUtils.redirect(path);
  };

  return (
    <ProductsMenuContentLinks
      data={FINANCE_MENU_DATA({ t, openCreateTask, handleRedirect })}
    />
  );
};

export default ProductsMenuContentFinance;
