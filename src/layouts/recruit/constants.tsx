export const getMenuData = (t) => [
  {
    label: t('Home', { en: 'Home', vn: 'Trang chủ' }),
    key: 'home',
    path: '/',
  },
  {
    label: t('About us', { en: 'About us', vn: 'Về chúng tôi' }),
    key: 'aboutUs',
    path: '/tuyen-dung/ve-chung-toi',

  },
  {
    label: t('Jobs', { en: 'Jobs', vn: 'Cơ hội nghề nghiệp' }),
    key: 'jobs',
    path: '/tuyen-dung/co-hoi-nghe-nghiep',

  },
  {
    label: t('Contact', { en: 'Contact', vn: 'Liên hệ' }),
    key: 'contact',
    path: '/tuyen-dung/lien-he',

  },
];
