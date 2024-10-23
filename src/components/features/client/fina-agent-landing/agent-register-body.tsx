import React from 'react';
import RegisterAgentForm from './components/register-agent-form';

import './css/agent-register-body.module.scss';

const AgentRegisterBody = React.memo(()=> {
  return (
    <div className="agent-body" id="register-now">
      <div className="agent-container" >
        <RegisterAgentForm />
      </div>
    </div>
  );
});
export default AgentRegisterBody;
