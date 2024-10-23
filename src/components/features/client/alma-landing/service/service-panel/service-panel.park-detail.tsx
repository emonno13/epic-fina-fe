import { useHTranslation } from '@lib/i18n';

const AlmaServicePanelParkDetail = () => {
  const { t } = useHTranslation('common');
  return (
    <div>
      <p>
        <span>{t('Entertainment', { vn: 'Giải trí' })}</span> -{' '}
        {t('on site', { vn: 'trong khuôn viên' })}
      </p>
      <ul>
        <li>{t('Sport area', { vn: 'Khu thể thao' })}</li>
        <li>{t('Outdoor tennis court', { vn: 'Sân quần vợt ngoài trời' })}</li>
        <li>{t('Steam room sauna', { vn: 'Phòng tắm hơi sauna' })}</li>
        <li>{t('Sauna', { vn: 'Phòng tắm hơi' })}</li>
        <li>
          {t('Tennis court on site', { vn: 'Sân quần vợt trong khuôn viên' })}
        </li>
        <li>
          {t('On-site basketball court', {
            vn: 'Sân bóng rổ trong khuôn viên',
          })}
        </li>
        <li>
          {t('Mini golf course on site', {
            vn: 'Sân golf mini trong khuôn viên',
          })}
        </li>
        <li>
          {t('Kayaking on site', { vn: 'Chèo thuyền kayak trong khuôn viên' })}
        </li>
        <li>{t('On-site playground', { vn: 'Sân chơi trong khuôn viên' })}</li>
        <li>
          {t('Volleyball on campus', { vn: 'Bóng chuyền trong khuôn viên' })}
        </li>
        <li>
          {t('Yoga class/instruction on campus', {
            vn: 'Lớp/hướng dẫn tập yoga trong khuôn viên',
          })}
        </li>
        <li>
          {t('Free water park entry', { vn: 'Vào công viên nước miễn phí' })}
        </li>
      </ul>
    </div>
  );
};

export default AlmaServicePanelParkDetail;
