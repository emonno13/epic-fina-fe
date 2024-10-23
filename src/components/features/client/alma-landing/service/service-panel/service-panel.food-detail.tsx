import { useHTranslation } from '@lib/i18n';

const AlmaServicePanelFoodDetail = () => {
  const { t } = useHTranslation('common');
  return (
    <div>
      <p>
        <span>Alma Garden</span> -{' '}
        {t(
          'This buffet restaurant specializes in local and international cuisine and serves breakfast and dinner.',
          {
            vn: 'nhà hàng buffet này chuyên về món địa phương và quốc tế và phục vụ bữa sáng và bữa tối.',
          },
        )}
      </p>
      <p>
        <span>La Casa</span> -{' '}
        {t(
          'This restaurant specializes in Italian cuisine and serves dinner only.',
          { vn: 'nhà hàng này chuyên về món Ý và chỉ phục vụ bữa tối.' },
        )}
      </p>
      <p>
        <span>Asiana</span> -{' '}
        {t(
          'This restaurant specializes in Japanese cuisine and serves dinner only.',
          { vn: 'nhà hàng này chuyên về món Nhật Bản và chỉ phục vụ bữa tối.' },
        )}
      </p>
      <p>
        <span>Alma Food Court</span> -{' '}
        {t(
          'This restaurant specializes in local and international cuisine and serves breakfast, lunch, and dinner.',
          {
            vn: 'nhà hàng này chuyên về món địa phương và quốc tế và phục vụ bữa sáng, bữa trưa và bữa tối.',
          },
        )}
      </p>
      <p>
        <span>Atlantis</span> -{' '}
        {t(
          'This beachfront seafood restaurant specializes in seafood and serves lunch and dinner.',
          {
            vn: 'nhà hàng hải sản nhìn ra bãi biển chuyên về hải sản và phục vụ bữa trưa và bữa tối.',
          },
        )}
      </p>
    </div>
  );
};

export default AlmaServicePanelFoodDetail;
