import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ClientHomeCollaboratorIcon,
  ClientHomeLoginIcon,
  ClientHomePersonalIcon,
  IconAccountProfile,
  IconProfileDashboard,
  IconSettingProfile,
  IconTransactionProfile,
  IconWealthProfile,
} from '@icons';
import { TFunction } from 'next-i18next';
import EmailIcon from './icons/client-footer.email-icon';
import PhoneIcon from './icons/client-footer.phone-icon';
import PinIcon from './icons/client-footer.pin-icon';

export const getFooterMenus = (t) => [
  {
    title: t('House loan', { en: 'House loan', vn: 'Vay mua nhà' }),
    href: '/danh-sach-san-pham-vay',
    subMenu: [
      {
        title: t('House loan', { en: 'House loan', vn: 'Vay mua nhà' }),
        href: '/danh-sach-san-pham-vay',
      },
      {
        title: t('Certificated house loan', {
          en: 'Certificated house loan',
          vn: 'Vay mua nhà có sổ',
        }),
        href: '/danh-sach-san-pham-vay',
      },
    ],
  },
  {
    title: t('Real estate', { en: 'Real estate', vn: 'Bất động sản' }),
    href: '/danh-sach-bat-dong-san',
    subMenu: [
      {
        title: t('Project real estate', {
          en: 'Project real estate',
          vn: 'Bất động sản dự án',
        }),
        href: '/danh-sach-bat-dong-san',
      },
      {
        title: t('Certificated real estate', {
          en: 'Certificated real estate',
          vn: 'Bất động sản có sổ',
        }),
        href: '/danh-sach-bat-dong-san',
      },
      {
        title: t('Liquidated real estate', {
          en: 'Liquidated real estate',
          vn: 'Bất động sản thanh lý',
        }),
      },
    ],
  },
  {
    title: t('Insurance', { en: 'Insurance', vn: 'Bảo hiểm' }),
    href: '/danh-sach-bao-hiem',
    subMenu: [
      {
        title: t('Real estate insurance', {
          en: 'Real estate insurance',
          vn: 'Bảo hiểm bất động sản',
        }),
        href: '/danh-sach-bao-hiem',
      },
      {
        title: t('Human insurance', {
          en: 'Human insurance',
          vn: 'Bảo hiểm con người',
        }),
        href: '/danh-sach-bao-hiem',
      },
      {
        title: t('Other insurance', {
          en: 'Other insurance',
          vn: 'Bảo hiểm khác',
        }),
        href: '/danh-sach-bao-hiem',
      },
    ],
  },
  {
    title: t('News', { en: 'News', vn: 'Tin tức' }),
    href: '/tin-tuc',
    subMenu: [
      {
        title: t('Knowledge', { en: 'Knowledge', vn: 'Kiến thức' }),
        href: '/tin-tuc',
      },
      { title: t('News', { en: 'News', vn: 'Tin tức' }), href: '/tin-tuc' },
      { title: t('Blog', { en: 'Blog', vn: 'Blog' }), href: '/tin-tuc' },
    ],
  },
];

export const getFooterInfo = (t) => [
  { title: t('About us', { en: 'About us', vn: 'Về chúng tôi' }) },
  { title: t('FAQ', { en: 'FAQ', vn: 'Hỏi đáp' }) },
  { title: t('Collaborator', { en: 'Collaborator', vn: 'Cộng tác viên' }) },
  {
    title: t('Privacy policy', {
      en: 'Privacy policy',
      vn: 'Chính sách bảo mật',
    }),
  },
  { title: t('Contact us', { en: 'Contact us', vn: 'Liên hệ chúng tôi' }) },
];

export const getMobileDropdown = (t) => [
  {
    title: t('Login', { en: 'Login', vn: 'Đăng nhập' }),
    href: '/users/login?redirect=/vn',
    icon: <ClientHomeLoginIcon />,
  },
  {
    title: t('Register collaborator', {
      en: 'Register collaborator',
      vn: 'Đăng ký TK cá nhân',
    }),
    href: '/users/signup',
    icon: <ClientHomePersonalIcon />,
  },
  {
    title: t('Register collaborator', {
      en: 'Register collaborator',
      vn: 'Đăng ký cộng tác viên',
    }),
    href: '/users/signup',
    icon: <ClientHomeCollaboratorIcon />,
  },
];

export const getFooterContactUsData = (t) => [
  {
    icon: () => (
      <FontAwesomeIcon
        icon={faBuilding}
        style={{ color: '#FC7513', fontSize: 16 }}
      />
    ),
    text: <span>Công ty cổ phần Dịch vụ Tài chính Bất động sản Tulip</span>,
  },
  {
    icon: PhoneIcon,
    text: <span>08 5749 8668</span>,
  },
  {
    icon: EmailIcon,
    text: <span>support@fina.com.vn</span>,
  },
  {
    icon: PinIcon,
    text: (
      <span>
        L17-11, Tầng 17, Toà nhà Vincom Center Đồng Khởi,
        <br />
        72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP.HCM
      </span>
    ),
  },
];

export const getFooterLoanLinks = (t) => [
  {
    href: '/danh-sach-san-pham-vay',
    label: t('Certificated house loan', {
      en: 'Certificated house loan',
      vn: 'Vay mua nhà có sổ',
    }),
  },
  {
    href: '/danh-sach-san-pham-vay',
    label: t('Project home loan', {
      en: 'Project home loan',
      vn: 'Vay mua nhà dự án',
    }),
  },
];

export const PROFILE_MENUS: any = (t: TFunction) => [
  {
    name: t('Dashboard', { vn: 'Dashboard' }),
    href: '/profile/dashboard',
    key: 'dashboard',
    icon: <IconProfileDashboard />,
  },
  {
    name: t('Transaction management', { vn: 'Quản lý giao dịch' }),
    href: '/profile/transaction-management',
    key: 'transaction-management',
    icon: <IconTransactionProfile />,
    children: [
      {
        name: t('List of transactions', { vn: 'Danh sách giao dịch' }),
        href: '/profile/transaction-management/transactions',
        icon: <IconAccountProfile />,
      },
      {
        name: t('Records management', { vn: 'Quản lý hồ sơ' }),
        href: '/profile/transaction-management/records',
        icon: <IconAccountProfile />,
      },
    ],
  },
  {
    name: t('Asset management', { vn: 'Quản lý tài sản' }),
    href: '/profile/asset-management',
    key: 'asset-management',
    icon: <IconWealthProfile />,
  },
  {
    name: t('Account management', { vn: 'Quản lý tài khoản' }),
    href: '/profile/account-management',
    key: 'account-management',
    icon: <IconAccountProfile />,
    children: [
      {
        name: t('Account information', { vn: 'Thông tin tài khoản' }),
        href: '/profile/account-management/account-information',
        icon: <IconAccountProfile />,
      },
      {
        name: t('Affiliate account', { vn: 'Tài khoản liên kết' }),
        href: '/profile/account-management/affiliate-account',
        icon: <IconAccountProfile />,
      },
      {
        name: t('My network', { vn: 'Mạng lưới của tôi' }),
        href: '/profile/account-management/my-network',
        icon: <IconAccountProfile />,
      },
      {
        name: t('CTV contract', { vn: 'Hợp đồng CTV' }),
        href: '/profile/account-management/collaborator-contract',
        icon: <IconAccountProfile />,
      },
      {
        name: t('My document', { vn: 'Tài liệu của tôi' }),
        href: '/profile/account-management/my-document',
        icon: <IconAccountProfile />,
      },
      {
        name: t('Earnings/Commissions', { vn: 'Thu nhập/ Hoa hồng' }),
        href: '/profile/account-management/earnings-commissions',
        icon: <IconAccountProfile />,
      },
      {
        name: t('Advanced surveys', { vn: 'Khảo sát nâng cao' }),
        href: '/profile/account-management/advanced-surveys',
        icon: <IconAccountProfile />,
      },
    ],
  },
  {
    name: t('Setting', { vn: 'Cài đặt' }),
    href: '/profile/setting',
    key: 'setting',
    icon: <IconSettingProfile />,
    children: [
      {
        name: t('Notifications', { vn: 'Thông báo' }),
        href: '/profile/setting/notification',
        icon: <IconSettingProfile />,
      },
      {
        name: t('Change Password', { vn: 'Đổi mật khẩu' }),
        href: '/profile/setting/change-password',
        icon: <IconSettingProfile />,
      },
      {
        name: t('Language', { vn: 'Ngôn ngữ' }),
        href: '/profile/setting/language',
        icon: <IconSettingProfile />,
      },
      // {
      //   name: t('Log out', { vn: 'Đăng xuất' }),
      //   href: '/profile/setting/logout',
      //   icon: <IconSettingProfile />,
      // },
    ],
  },
];
