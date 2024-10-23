import { Button, Result, Typography } from 'antd';
import { TYPE_FINA_PORTAL } from './fina-portal-context';
import { useFinaPortalContext } from './fina-portal-context';
import FinaPortalFormHeader from './fina-portal-form-header';
import { IconHome } from './icons';

import './styles.module.scss';
const { Text } = Typography;

const FinaPortalBorrowerIntroduction = () => {
  const { setShowForm, showForm } = useFinaPortalContext();

  if (showForm !== TYPE_FINA_PORTAL.BORROWER_INTRODUCTION) {
    return (<></>);
  }

  return (
    <div className="fina-portal-form">
      <FinaPortalFormHeader {...{ setShowForm, content: 'Tra cứu thông tin' }}/>
      {/*<FinaPortalHomeForm {...{ setShowForm, showForm, formPhone: true }} />*/}
      <Result
        status="403"
        title={<Text className="fina-portal-text">Comming soon</Text>}
        extra={
          <Button onClick={()=> setShowForm(TYPE_FINA_PORTAL.HOME)} className="fina-portal-form-submit" block>
            <IconHome /> Trở lại trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default FinaPortalBorrowerIntroduction;
