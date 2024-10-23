import { useHTranslation } from '@lib/i18n';

const AlmaServicePanelSpaDetail = () => {
  const { t } = useHTranslation('common');
  return (
    <div>
      <p>
        <span>Le Spa</span>{' '}
        {t(
          'There are 13 treatment rooms, including rooms for couples. Services include deep-tissue massages, hot stone massages, Swedish massages, and Thai massages. The spa offers a variety of treatment therapies, including aromatherapy. The spa is equipped with a sauna and a steam room.',
          {
            vn: 'có 13 phòng trị liệu, gồm phòng cho các cặp đôi. Các dịch vụ gồm massage mô sâu, massage đá nóng, massage Thụy Điển và massage Thái. Spa cung cấp nhiều liệu pháp điều trị, gồm liệu pháp hương thơm. Spa được trang bị phòng tắm hơi và phòng xông hơi.',
          },
        )}
      </p>
    </div>
  );
};

export default AlmaServicePanelSpaDetail;
