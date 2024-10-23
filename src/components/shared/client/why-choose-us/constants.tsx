import ClientWhyChooseUsExpertIcon from './icons/why-choose-us.expert-icon';
import ClientWhyChooseUsFreeIcon from './icons/why-choose-us.free-icon';
import ClientWhyChooseUsTeamIcon from './icons/why-choose-us.team-icon';
import ClientWhyChooseUsTrustIcon from './icons/why-choose-us.trust-icon';

export const getWhyChooseUsTopData = t => [
  {
    title: t('Totally free', { vn: 'Hoàn toàn miễn phí' }),
    icon: <ClientWhyChooseUsFreeIcon />,
  },
  {
    title: t('Prestige, convenience, many offers', { vn: 'Uy tín, tiện lợi nhiều ưu đãi' }),
    icon: <ClientWhyChooseUsTrustIcon />,
  },
  {
    title: t('Professional and dedicated team of consultants', { vn: 'Đội ngũ tư vấn viên chuyên nghiệp, tận tình' }),
    icon: <ClientWhyChooseUsTeamIcon />,
  },
  {
    title: t('Market-savvy analysts', { vn: 'Chuyên gia phân tích am hiểu thị trường' }),
    icon: <ClientWhyChooseUsExpertIcon />,
  },
];