import { Button } from 'antd';
import { useMobile } from '@components/features/mobile-app/hooks/login-drawer-hooks';
import { useHTranslation } from '@lib/i18n';

const PersonalInsuranceListNotAuthen = () => {
  const { t } = useHTranslation('mobile-home');
  const { setLoginDrawerVisible } = useMobile();
  return (
    <div className="personal-insurance-list-not-authen">
      <div className="personal-insurance-list-not-authen__content">
        <img src="/assets/images/personal-insurance-not-authen.png" />
        <div className="personal-insurance-list-not-authen__content__desc">
          {t('You are not logined', {
            en: 'You are not logined',
            vn: 'Bạn chưa đăng nhập',
          })}
        </div>
        <Button
          {...{
            type: 'primary',
            onClick: () => {
              setLoginDrawerVisible(true);
            },
          }}
        >
          {t('Login now', { en: 'Login now', vn: 'Đăng nhập ngay' })}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInsuranceListNotAuthen;
