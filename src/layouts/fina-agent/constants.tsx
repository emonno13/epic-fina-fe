import AlmaFooterAparmentIcon from '../admin/lightly/client-alma/icons/alma-footer-apartment-icon';
import AlmaFooterPhoneIcon from '../admin/lightly/client-alma/icons/alma-footer-phone-icon';
import AlmaFooterEmailIcon from '../admin/lightly/client-alma/icons/alma-footer-email-icon';
import AlmaFooterPinIcon from '../admin/lightly/client-alma/icons/alma-footer-pin-icon';


export const getFooterFinaAgentData = t => [
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

