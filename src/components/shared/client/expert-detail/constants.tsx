import { ExpertDetailGlobeIcon } from './icons/expert-detail.globe-icon';
import { ExpertDetailPhoneIcon } from './icons/expert-detail.phone-icon';
import { ExpertDetailPinIcon } from './icons/expert-detail.pin-icon';

export const ExclusiveRealEstateData = ({ address, url, tel }) => {
  return [
    {
      icon: <ExpertDetailPinIcon />,
      content: address,
    },
    {
      icon: <ExpertDetailGlobeIcon />,
      content: <a href="https://fina.com.vn">fina.com.vn</a>,
    },
    {
      icon: <ExpertDetailPhoneIcon />,
      content: tel,
    },
  ];
};

export const MarketInChargeData = [
  {
    location: 'Tp Hồ Chí Minh, Quận 1',
  },
  {
    location: 'Tp Hồ Chí Minh, Quận 2',
  },
  {
    location: 'Tp Hồ Chí Minh, Quận 3',
  },
];

export const RatesData = {
  total: 300,
  data: [
    {
      rate: 5,
      count: 200,
    },
    {
      rate: 4,
      count: 25,
    },
    {
      rate: 3,
      count: 25,
    },
    {
      rate: 2,
      count: 0,
    },
    {
      rate: 1,
      count: 50,
    },
  ],
};

export const FakeReviewsData = [
  {
    user: {
      avatar: 'https://cdn.fina.com.vn/production/avatar/3f37cc48-b58f-4e7d-a0b2-96a4a6d8c31d.jpg',
      fullName: 'Nguyễn Văn Trường',
    },
    rate: 5,
    image: {
      url: 'https://www.w3schools.com/howto/img_forest.jpg',
    },
    product: {
      category: { name: 'Sản phẩm vay' },
    },
    content: 'Nulla molestie volutpat nunc, eget finibus ipsum vulputate eu. Praesent sagittis, ni...',
    createdAt: '12/10/2021',
  },
  {
    user: {
      avatar: 'https://cdn.fina.com.vn/production/avatar/3f37cc48-b58f-4e7d-a0b2-96a4a6d8c31d.jpg',
      fullName: 'Nguyễn Văn Trường',
    },
    rate: 5,
    image: {
      url: 'https://www.w3schools.com/howto/img_forest.jpg',
    },
    product: {
      category: { name: 'Sản phẩm vay' },
    },
    content: 'Nulla molestie volutpat nunc, eget finibus ipsum vulputate eu. Praesent sagittis, ni...',
    createdAt: '12/10/2021',
  },
  {
    user: {
      avatar: 'https://cdn.fina.com.vn/production/avatar/3f37cc48-b58f-4e7d-a0b2-96a4a6d8c31d.jpg',
      fullName: 'Nguyễn Văn Trường',
    },
    rate: 5,
    image: {
      url: 'https://www.w3schools.com/howto/img_forest.jpg',
    },
    product: {
      category: { name: 'Sản phẩm vay' },
    },
    content: 'Nulla molestie volutpat nunc, eget finibus ipsum vulputate eu. Praesent sagittis, ni...',
    createdAt: '12/10/2021',
  },
  {
    user: {
      avatar: 'https://cdn.fina.com.vn/production/avatar/3f37cc48-b58f-4e7d-a0b2-96a4a6d8c31d.jpg',
      fullName: 'Nguyễn Văn Trường',
    },
    rate: 5,
    image: {
      url: 'https://www.w3schools.com/howto/img_forest.jpg',
    },
    product: {
      category: { name: 'Sản phẩm vay' },
    },
    content: 'Nulla molestie volutpat nunc, eget finibus ipsum vulputate eu. Praesent sagittis, ni...',
    createdAt: '12/10/2021',
  },
  {
    user: {
      avatar: 'https://cdn.fina.com.vn/production/avatar/3f37cc48-b58f-4e7d-a0b2-96a4a6d8c31d.jpg',
      fullName: 'Nguyễn Văn Trường',
    },
    rate: 5,
    image: {
      url: 'https://www.w3schools.com/howto/img_forest.jpg',
    },
    product: {
      category: { name: 'Sản phẩm vay' },
    },
    content: 'Nulla molestie volutpat nunc, eget finibus ipsum vulputate eu. Praesent sagittis, ni...',
    createdAt: '12/10/2021',
  },
];

export const USER_RATINGS_TYPES = {
  LOAN: 'loan',
  INSURANCE: 'insurance',
  REAL_ESTATE: 'real_estate',
};

export const ExpertDetailProductTypeOptions = t => [
  {
    value: '',
    label: t('All', { vn: 'Tất cả' }),
  },
  {
    value: USER_RATINGS_TYPES.LOAN,
    label: t('Loan', { vn: 'Vay' }),
  },
  {
    value: USER_RATINGS_TYPES.INSURANCE,
    label: t('Insurance', { vn: 'Bảo hiểm' }),
  },
  {
    value: USER_RATINGS_TYPES.REAL_ESTATE,
    label: t('Real estate', { vn: 'Bất động sản' }),
  },
];

export const ExpertDetailOrderOptions = t => [
  {
    value: 'createdAt DESC',
    label: t('Lastest', { vn: 'Mới nhất' }),
  },
  {
    value: 'createdAt ASC',
    label: t('Oldest', { vn: 'Cũ nhất' }),
  },
];

export const ExpertDetailRateOptions = t => [
  {
    value: '',
    label: t('All star', { vn: 'Tất cả sao' }),
  },
  {
    value: 5,
    label: t('5 star', { vn: '5 sao' }),
  },
  {
    value: 4,
    label: t('4 star', { vn: '4 sao' }),
  },
  {
    value: 3,
    label: t('3 star', { vn: '3 sao' }),
  },
  {
    value: 2,
    label: t('2 star', { vn: '2 sao' }),
  },
  {
    value: 1,
    label: t('1 star', { vn: '1 sao' }),
  },
];
