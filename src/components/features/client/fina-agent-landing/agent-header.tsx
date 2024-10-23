import React from 'react';
import RegisterAgentForm from './components/register-agent-form';

import './css/agent-header.module.scss';

const AgentHeader = React.memo(()=> {
  return (
    <div className="agent-banner" id="endow">
      <div className="agent-container-header">
        <div className="agent-header">
          <div className="title-header-agent">
          </div>
          <div className="title-header-agent-text">FINA AGENT</div>
          <div className="content-header-agent">
            <p style={{ textAlign: 'center', fontSize: '16px', marginBottom:'25px' }}>TUYỂN CỘNG TÁC VIÊN</p>
            <div className="agent-header-text">
              <div className="title-header-icon"></div><span style={{ fontFamily: 'SFPD-bold', paddingRight: '3px' }}>Gia tăng thu nhập</span> <span> cho Môi giới Bất động sản</span></div>
            <div className="agent-header-text">
              <div className="title-header-icon"></div><span>Hoa hồng lên đến </span> <span style={{ fontFamily: 'SFPD-bold', padding: '0 3px' }}> 56%</span> <span>giá trị giao dịch</span>
            </div>
          </div>
        </div>

        <RegisterAgentForm />
      </div>
    </div>
  );
});
export default AgentHeader;
