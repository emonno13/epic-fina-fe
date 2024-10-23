import { Button } from 'antd';
import { TYPE_FINA_PORTAL } from './fina-portal-context';
import { useFinaPortalContext } from './fina-portal-context';
import FinaPortalFormHeader from './fina-portal-form-header';
import { FinaLogo, IconCheckSuccess, IconHome } from './icons';

import './styles.module.scss';

const FinaPortalFormSuccess = () => {
  const { setShowForm, showForm } = useFinaPortalContext();
  const handleBackToHome = () => setShowForm(TYPE_FINA_PORTAL.HOME);

  if (showForm !== TYPE_FINA_PORTAL.SUCCESS) {
    return (<></>);
  }

  return (
    <div className="fina-portal-form fina-portal-success">
      <FinaPortalFormHeader {...{ setShowForm, content: <FinaLogo />, iconBack: <IconBackHome /> }}/>

      <div className="fina-portal-form-content fina-portal-success-content">
        <IconCheckSuccess />
        <h2 className="fina-portal-success-content-title">Đã gửi thông tin thành công</h2>
        <p className="fina-portal-success-content-desc">
					Cảm ơn bạn đã gửi thông tin đến Hệ thống của FINA. Chúng tôi sẽ phản hồi nhanh nhất đến Quý khách hàng. Nếu cần liên hệ tư vấn gấp vui lòng liên lạc số 
          <br/> Hotline: <b>08 5749 8668</b>
        </p>
      </div>

      <Button onClick={handleBackToHome} className="fina-portal-form-submit" block>
        <IconHome /> Trở lại trang chủ
      </Button>
    </div>
  );
};

export default FinaPortalFormSuccess;

const IconBackHome = () => {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="90" height="90" rx="45" fill="#FC7513"/>
      <path d="M65.4636 33.9948L45.6719 17.3281C45.484 17.1695 45.246 17.0825 45 17.0825C44.7541 17.0825 44.5161 17.1695 44.3281 17.3281L24.5365 33.9948C24.4205 34.0926 24.3273 34.2147 24.2635 34.3523C24.1996 34.49 24.1666 34.6399 24.1667 34.7916V60.8333C24.1667 61.3858 24.3862 61.9157 24.7769 62.3064C25.1676 62.6971 25.6975 62.9166 26.25 62.9166H38.75V49.375C38.75 49.0987 38.8598 48.8338 39.0551 48.6384C39.2505 48.4431 39.5154 48.3333 39.7917 48.3333H50.2084C50.4846 48.3333 50.7496 48.4431 50.9449 48.6384C51.1403 48.8338 51.25 49.0987 51.25 49.375V62.9166H63.75C64.3026 62.9166 64.8325 62.6971 65.2232 62.3064C65.6139 61.9157 65.8334 61.3858 65.8334 60.8333V34.7916C65.8335 34.6399 65.8004 34.49 65.7366 34.3523C65.6727 34.2147 65.5795 34.0926 65.4636 33.9948Z" fill="white"/>
    </svg>
  );
};