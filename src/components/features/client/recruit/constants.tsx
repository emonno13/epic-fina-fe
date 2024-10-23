import MissionIcon from './icons/mission-ion';
import VisionIcon from './icons/vision-icon';

export const getContentMissionAndVisionData = (t) => [
  {
    title: t('Vision', { en: 'Vision', vn: 'Tầm nhìn' }),
    des: t('Vision content',
      {
        en: 'Become a leading "technological unicorn" in the field of Finance - Insurance - Investment, accompanying Vietnamese people on the path of building a home.',
        vn: 'Trở thành “kỳ lân công nghệ” đi đầu trong lĩnh vực Tài chính - Bảo hiểm - Đầu tư, đồng hành cùng người Việt trên con đường tạo dựng mái ấm.',
      }),
    Icon: VisionIcon,
    key: 'vision',
  },
  {
    title: t('mission', { en: 'Mission', vn: 'Sứ mệnh' }),
    des: t('Vision content',
      {
        en: 'Providing financial & health solutions, acting as a bridge between customers and partners, making home ownership and health care simpler, faster and more accessible.',
        vn: 'Cung cấp giải pháp tài chính & sức khỏe, là cầu nối giữa khách hàng và đối tác, giúp việc sở hữu nhà cửa, bảo vệ sức khỏe trở nên đơn giản, nhanh gọn và dễ tiếp cận hơn.',
      }),
    Icon: MissionIcon,
    key: 'mission',
  },
];
