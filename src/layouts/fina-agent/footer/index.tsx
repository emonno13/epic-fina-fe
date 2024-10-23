import FinaAgentFooterForm from './footer.form';
import FinaAgentFooterContact from './footer.contact';
import FinaFooterAppLinks from './fina-agent-footer.app-links';

import './footer.module.scss';

const ClientFinaAgentFooter = () => {

  return (
    <div className="fina-agent-footer fina-agent-container">
      <FinaAgentFooterContact />
      <FinaFooterAppLinks />
      <FinaAgentFooterForm />
    </div>
  );
};

export default ClientFinaAgentFooter;
