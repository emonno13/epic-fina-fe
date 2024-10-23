import AlmaFooterAparmentIcon from './icons/alma-footer-apartment-icon';
import AlmaFooterEmailIcon from './icons/alma-footer-email-icon';
import AlmaFooterPhoneIcon from './icons/alma-footer-phone-icon';
import AlmaFooterPinIcon from './icons/alma-footer-pin-icon';

export const getFooterContactUsData = t => [
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

export const ALMA_REGISTRATION_TYPES = {
  VIP: 'VIP',
  VVIP: 'VVIP',
};

export const getAlmaRegistrationTypes = t => [
  {
    value: ALMA_REGISTRATION_TYPES.VIP,
    label: t('For VIP customers', { vn:'Dành cho khách hàng VIP' }),
  },
  {
    value: ALMA_REGISTRATION_TYPES.VVIP,
    label: t('For VVIP customers', { vn:'Dành cho khách hàng VVIP' }),
  },
];
