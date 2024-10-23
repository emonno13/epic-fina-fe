import { useHTranslation } from '@lib/i18n';

const PersonalInsuranceListEmpty = () => {
  const { t } = useHTranslation('mobile-home');
  return (
    <div className="personal-insurance-list-empty">
      <img src="/assets/images/personal-insurance-empty.png" />
      <div className="personal-insurance-list-not-empty__desc">
        {t('You dont have any insurances', {
          en: 'You dont have any insurances',
          vn: 'Bạn chưa có bảo hiểm',
        })}
      </div>
    </div>
  );
};

export default PersonalInsuranceListEmpty;
