import { HQRCode } from '../../../shared/qr-code';

import '../alma-landing/alma-landing.module.scss';
import './client-checkin-page.scss';

const ClientHTPearlQRCodeCheckin = () => {
  return (
    <div className="client-alma-landing client-checkin-page">
      <HQRCode url={'https://fina.com.vn/htpearl-checkin'} />
    </div>
  );
};

export default ClientHTPearlQRCodeCheckin;
