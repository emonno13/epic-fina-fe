import {
  ClientToppedHeaderMailIcon,
  ClientToppedHeaderPhoneIcon,
  IconClock,
} from '@icons';

export const toppedHeaderContactInfo = [
  {
    icon: <IconClock />,
    text: '08h30 - 17h30, T2-t6.  T7, CN nghỉ',
    href: '',
    iconClassName: 'client-topped-header-contact-info__item__zalo-icon',
  },
  {
    icon: <ClientToppedHeaderPhoneIcon />,
    text: 'Hotline 24/7: 08 5749 8668',
    href: 'tel:0857498668',
    iconClassName: 'client-topped-header-contact-info__item__phone-icon',
  },
  {
    icon: <ClientToppedHeaderMailIcon />,
    text: 'support@fina.com.vn',
    href: 'mailto:support@fina.com.vn',
    iconClassName: 'client-topped-header-contact-info__item__mail-icon',
  },
];
