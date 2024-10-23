import { TYPE_FINA_PORTAL } from './fina-portal-context';
import { IconBack } from './icons';

import './styles.module.scss';

const FinaPortalFormHeader = ({ setShowForm, content, iconBack }: any) => {
  return (
    <div className="fina-portal-form-header">
      <span className="icon-back" onClick={() => setShowForm(TYPE_FINA_PORTAL.HOME)} >
        {iconBack ? iconBack : <IconBack />}
      </span>
      {content}
    </div>
  );
};

export default FinaPortalFormHeader;
