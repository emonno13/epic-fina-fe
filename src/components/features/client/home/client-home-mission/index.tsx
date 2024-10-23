import { useHTranslation } from '@lib/i18n';

const ClientHomeMission = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-home-mission">
      <div className="max-w-1100 client-home-mission__wrapper m-auto">
        <div className="client-home-mission__content">
          <p className="client-home-mission__content__info">
            {t('client_home_mission_info', {
              en: "FINA's mission is to provide comprehensive financial services to help all Vietnamese people access the most diverse financial resources, address the unique needs of each individual and gradually improve improve the quality of life, create a sustainable and happy home.",
              vn: 'Sứ mệnh của FINA là cung cấp các dịch vụ tài chính toàn diện nhằm giúp tất cả người dân Việt Nam được tiếp cận với những những nguồn tài chính đa dạng nhất, giải quyết được nhu cầu riêng biệt của từng cá nhân và từng bước nâng cao chất lượng cuộc sống, tạo dựng mái ấm vững bền, hạnh phúc.',
            })}
          </p>
          <h3 className="client-home-mission__content__ceo-name">
            Alex Pham, PhD
          </h3>
          <p className="client-home-mission__content__position">CEO</p>
        </div>
        <div className="client-home-mission__image">
          <i />
        </div>
      </div>
    </div>
  );
};

export default ClientHomeMission;
