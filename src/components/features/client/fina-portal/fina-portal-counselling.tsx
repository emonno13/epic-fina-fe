import { TYPE_FINA_PORTAL } from './fina-portal-context';
import { useFinaPortalContext } from './fina-portal-context';
import FinaPortalFormHeader from './fina-portal-form-header';
import FinaPortalHomeForm from './fina-portal-home-form';

import './styles.module.scss';

const FinaPortalCounselling = () => {
  const { setShowForm, showForm } = useFinaPortalContext();

  if (showForm !==  TYPE_FINA_PORTAL.COUNSELLING) {
    return (<></>);
  }

  return (
    <div className="fina-portal-form">
      <FinaPortalFormHeader {...{ setShowForm, content: 'Tôi muốn tư vấn' }}/>
      <FinaPortalHomeForm {...{ setShowForm, showForm }} />
    </div>
  );
};

export default FinaPortalCounselling;
