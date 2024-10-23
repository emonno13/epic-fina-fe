import ClientAbout40Icon from './icons/about.40-icon';
import ClientAboutEndowIcon from './icons/about.endow-icon';
import ClientAboutFreeIcon from './icons/about.free-icon';
import ClientAboutIndependentIcon from './icons/about.independent-icon';
import ClientAboutSaveTimeIcon from './icons/about.save-time-icon';
import ClientAboutTransparentIcon from './icons/about.transparent-icon';

export const getWhyUseFinaData = t => [
  {
    title: t('client_why_use_fina_save_time_title', { vn: 'Tiết kiệm thời gian', en: 'Save time' }),
    description: t('client_why_use_fina_save_time_desc', {
      vn: 'FINA giúp khách hàng hoàn thiện toàn bộ thủ tục giấy tờ, khách hàng chỉ việc lên ký hợp đồng vay với ngân hàng.',
      en: 'FINA helps customers complete all paperwork, customers only need to sign a loan contract with the bank.',
    }),
    icon: <ClientAboutSaveTimeIcon />,
  },
  {
    title: t('client_why_use_fina_endow_title', { vn: 'LÃI SUẤT ƯU ĐÃI', en: 'PREFERENTIAL INTEREST RATE' }),
    description: t('client_why_use_fina_endow_desc', {
      vn: 'FINA giúp bạn tiếp cận được những khoản vay với lãi suất thấp hơn thị trường từ phía ngân hàng.',
      en: 'FINA helps you access loans with lower-than-market interest rates from banks.',
    }),
    icon: <ClientAboutEndowIcon />,
  },
  {
    title: t('client_why_use_fina_independent_title', { vn: 'HOẠT ĐỘNG ĐỘC LẬP.', en: 'INDEPENDENT OPERATIONS.' }),
    description: t('client_why_use_fina_independent_desc', {
      vn: 'FINA không thuộc sở hữu của bất kì ngân hàng hay định chế tài chính nào. Với FINA, lợi ích khách hàng là trên hết.',
      en: 'FINA helps customers complete all paperwork, customers only need to sign a loan contract with the bank.',
    }),
    icon: <ClientAboutIndependentIcon />,
  },
  {
    title: t('client_why_use_fina_free_title', { vn: 'HOÀN TOÀN MIỄN PHÍ.', en: 'ALL FREE.' }),
    description: t('client_why_use_fina_free_desc', {
      vn: 'FINA sẽ tư vấn và hỗ trợ khách hàng hết mình cho đến khi khách hàng vay được, với mức phí là 0 đồng!',
      en: 'FINA will advise and support customers until the customer can borrow, with a fee of 0 VND!',
    }),
    icon: <ClientAboutFreeIcon />,
  },
  {
    title: t('client_why_use_fina_4.0_title', { vn: 'CÔNG NGHỆ 4.0.', en: 'TECHNOLOGY 4.0.' }),
    description: t('client_why_use_fina_4.0_desc', {
      vn: 'FINA giúp khách hàng dễ dàng tra cứu, so sánh đa dạng giải pháp tài chính và lựa chọn sản phẩm phù hợp nhất.',
      en: 'FINA helps customers easily look up and compare a variety of financial solutions and choose the most suitable product.',
    }),
    icon: <ClientAbout40Icon />,
  },
  {
    title: t('client_why_use_fina_transparent_title', { vn: 'THÔNG TIN MINH BẠCH.', en: 'TRANSPARENT INFORMATION.' }),
    description: t('client_why_use_fina_transparent_desc', {
      vn: 'FINA luôn cập nhập và công khai các khoản vay, gói dịch vụ đảm bảo thông tin khách hàng tiếp nhận luôn chính xác nhất!',
      en: 'FINA always updates and publicizes loans to ensure that the information received by our customers is always the most accurate!',
    }),
    icon: <ClientAboutTransparentIcon />,
  },
];

export const getLeaderData = t => [
  {
    image: '/assets/images/client_about_leader_1.png',
    name: 'Alex Pham, PhD',
    position: 'CEO',
    info: [
      t('Member of the Board of Directors and Advisory Board of Start-ups such as GoPavel, Cleverpal and Property Quants.', { vn: 'Thành viên Hội đồng Quản trị và Hội đồng Cố vấn của các Start-ups như GoPavel, Cleverpal và Property Quants.' }),
      t('Member of the Australian Real Estate Association (API).', { vn: 'Thành viên Hiệp hội Bất Động Sản Úc Châu (API).' }),
      t('Member of the Board of Directors of the Vietnam Entrepreneurs Association in Sydney (VEAS) and the Startup Help Club for Vietnamese Businesses in Australia (VBSC).', { vn: 'Thành viên Ban Quản Trị Hiệp hội Doanh nhân Việt Nam tại Sydney (VEAS) và Câu lạc bộ Trợ giúp Khởi nghiệp cho các Doanh nghiệp Việt Nam tại Úc (VBSC).' }),
      t('Consulting development and investment strategies for leading real estate companies and REITs in Australia and the world such as: Dexus, GPT, Lendlease, Stockland, Charter Hall, Black Stone.', { vn: 'Tư vấn chiến lược phát triển và đầu tư cho các công ty Bất Động Sản và các Quỹ đầu tư REIT hàng đầu của Úc và thế giới như: Dexus, GPT, Lendlease, Stockland, Charter Hall, Black Stone.' }),
      t('Lecturer in Real Estate Economics at Western Sydney University and Senior Researcher at Business Research Institute, University of Economics Ho Chi Minh City.', { vn: 'Giảng viên ngành Kinh tế Bất Động Sản tại Đại học Tây Sydney (Western Sydney University) và là Nghiên cứu viên cao cấp của Viện Nghiên cứu Kinh doanh, Đại học Kinh tế TP.HCM.' }),
    ],
  },
  {
    image: '/assets/images/client_about_leader_2.png',
    name: 'Tim Do CA, CFA',
    position: 'COO, CTO',
    info: [
      t('Managing Director at FFMC Real Estate Investment Fund in Australia.', { vn: 'Giám đốc Điều hành tại Quỹ đầu tư Bất Động Sản FFMC tại Úc.' }),
      t('Manager at KPMG\'s Digitalization and Innovation Department in Sydney, Australia.', { vn: 'Quản lý tại Bộ phận Công nghệ số hóa và Đổi mới sáng tạo của công ty KPMG tại Sydney, Úc.' }),
      t('Working experience in finance and auditing at KPMG Australia and at Vietcombank Vietnam Securities Company.', { vn: 'Kinh nghiệm làm việc trong lĩnh vực tài chính và kiểm toán tại KPMG Úc và tại Công ty Chứng khoán Ngân hàng Vietcombank Việt Nam.' }),
    ],
  },
];
