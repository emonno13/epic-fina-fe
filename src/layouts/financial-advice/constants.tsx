import {
  ClientFooterFbIcon,
  ClientFooterGmailIcon,
  ClientFooterYoutubeIcon,
  ClientFooterZaloIcon,
} from '@icons';
import AlmaFooterAparmentIcon from '../admin/lightly/client-alma/icons/alma-footer-apartment-icon';
import AlmaFooterEmailIcon from '../admin/lightly/client-alma/icons/alma-footer-email-icon';
import AlmaFooterPhoneIcon from '../admin/lightly/client-alma/icons/alma-footer-phone-icon';
import AlmaFooterPinIcon from '../admin/lightly/client-alma/icons/alma-footer-pin-icon';

export const getFooterFinancialAdviceData = (t) => [
  {
    icon: <AlmaFooterAparmentIcon />,
    text: <span>Công ty cổ phần Dịch vụ Tài chính Bất động sản Tulip</span>,
  },
  {
    icon: <AlmaFooterPhoneIcon />,
    text: <span>08 5749 8668</span>,
  },
  {
    icon: <AlmaFooterEmailIcon />,
    text: <span>support@fina.com.vn</span>,
  },
  {
    icon: <AlmaFooterPinIcon />,
    text: (
      <span>
        L17-11, Tầng 17, Toà nhà Vincom Center Đồng Khởi,
        <br />
        72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP.HCM
      </span>
    ),
  },
];

export const URL_SOCIAL_NETWORK = [
  {
    icon: <ClientFooterFbIcon />,
    url: 'https://www.facebook.com/finavietnam',
  },
  {
    icon: <ClientFooterZaloIcon />,
    url: 'https://zalo.me/937476885441449805',
  },
  {
    icon: <ClientFooterYoutubeIcon />,
    url: 'https://www.youtube.com/channel/UCdetskOW9FS3oZwBvEfKHyg',
  },
  {
    icon: <ClientFooterGmailIcon />,
    url: 'mailto:support@fina.com.vn',
  },
];
