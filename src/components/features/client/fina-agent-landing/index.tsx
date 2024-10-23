import React from 'react';
import AgentHeader from './agent-header';
import MakeMoneyProcess from './make-money-process';
import FinaPartner from './components/fina-partners';
import AgentRegisterBody from './agent-register-body';
import JobContent from './job-content';
import Faq from './faq';
import JoinReason from './join-reason';

const FinaAgentPage = () => {
  return (
    <>
      <AgentHeader />
      <MakeMoneyProcess />
      <JobContent />
      <JoinReason />
      <AgentRegisterBody />
      <Faq />
      <FinaPartner />
    </>
  );
};

export default FinaAgentPage;
