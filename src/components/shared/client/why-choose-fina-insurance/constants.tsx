import ClientWhyChooseFinaInsuranceApproachIcon from './icons/why-choose-fina-insurance.approach-icon';
import ClientWhyChooseFinaInsuranceListenIcon from './icons/why-choose-fina-insurance.listen-icon';
import ClientWhyChooseFinaInsurancePartnerIcon from './icons/why-choose-fina-insurance.partner-icon';
import ClientWhyChooseFinaInsuranceTeamIcon from './icons/why-choose-fina-insurance.team-icon';

export const getWhyChooseFinaInsurance = t => [
  {
    icon: <ClientWhyChooseFinaInsuranceListenIcon />,
    title: t('Listen to be different', { vn: 'Lắng nghe để khác biệt' }),
    description: t('FINA always listens to the needs of customers and the market to provide unique and diverse Real Estate products.', { vn: 'FINA luôn lắng nghe phản hồi từ nhu cầu của Khách hàng và Thị trường để cung cấp những sản phẩm về Bất Động sản độc đáo và đa dạng.' }),
  },
  {
    icon: <ClientWhyChooseFinaInsuranceApproachIcon />,
    title: t('Easy access', { vn: 'Tiếp cận dễ dàng' }),
    description: t('FINA always understands to be able to offer the simplest approach to customers in every product process.', { vn: 'FINA luôn thấu hiểu để có thể đưa ra những phương án tiếp cận đơn giản nhất tới Khách hàng trong mọi quy trình của sản phẩm.' }),
  },
  {
    icon: <ClientWhyChooseFinaInsurancePartnerIcon />,
    title: t('Strong partner', { vn: 'Đối tác vững mạnh' }),
    description: t('Proud to be a potential partner of major banks across the country, FINA will always strive to improve to become a reliable brand.', { vn: 'Tự hào là đối tác tiềm năng của các Ngân hàng lớn trên toàn quốc, FINA sẽ luôn cố gắng hoàn thiện để trở thành thương hiệu đáng tin cậy.' }),
  },
  {
    icon: <ClientWhyChooseFinaInsuranceTeamIcon />,
    title: t('Dedicated team', { vn: 'Đội ngũ tận tâm' }),
    description: t('Every feedback from Customers is the most valuable thing FINA receives, so we always act to the best of our ability.', { vn: 'Mỗi phản hồi từ phía Khách hàng đều là những điều quý báu nhất FINA nhận được, vì vậy chúng tôi luôn hành động theo hết khả năng của mình.' }),
  },
];