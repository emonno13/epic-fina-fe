import {
  ClientFooterFbIcon,
  ClientFooterInstagramIcon,
  ClientFooterYoutubeIcon,
  ClientFooterZaloIcon,
} from '@icons';
import ClientFooterLogo from '../icons/client-footer.logo';

const URL_SOCIAL_NETWORK = [
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
    icon: <ClientFooterInstagramIcon />,
    url: 'https://www.instagram.com/fina_taichinh/',
  },
];
const ClientFooterLogoBox = () => {
  return (
    <div className="client-footer-logo-box">
      <a href="#home" className="client-footer-logo-box__logo">
        <span className="client-footer-logo-box__logo__icon">
          <ClientFooterLogo />
        </span>
        <span className="client-footer-logo-box__logo__txt">
          Cùng bạn <br /> tạo dựng mái ấm
        </span>
      </a>

      <div className="client-footer-logo-box-social-network">
        {URL_SOCIAL_NETWORK?.map((social) => (
          <a
            href={social?.url}
            target="_blank"
            rel="noreferrer"
            key={social?.url}
          >
            {social?.icon}
          </a>
        ))}
      </div>

      <div className="client-footer-logo-box__copy-right">
        © 2020 Bản quyền thuộc về Công ty Cổ Phần Dịch Vụ Tài Chính Bất Động
        Sản TULIP
      </div>
    </div>
  );
};

export default ClientFooterLogoBox;
