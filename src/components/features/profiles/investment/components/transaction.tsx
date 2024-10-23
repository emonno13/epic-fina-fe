import { useState } from 'react';
import { tabs } from '../constant';

import './tabs.scss';

const TabTransaction = () => {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="flex tab-transaction m-t-20">
      <div
        className={`flex items-center m-r-20 ${activeTab === tabs?.invest ? 'tab-active' : ''}`}
        onClick={() => setActiveTab(tabs?.invest)}
      >
        <span className="title">Lệnh chờ</span>
      </div>
      <div
        className={`flex items-center m-r-20 ${activeTab === tabs?.transaction ? 'tab-active' : ''}`}
        onClick={() => setActiveTab(tabs?.transaction)}
      >
        <span className="title">Lịch sử giao dịch</span>
      </div>
      <div
        className={`flex items-center ${activeTab === tabs?.invest ? 'tab-active' : ''}`}
        onClick={() => setActiveTab(tabs?.transaction)}
      >
        <span className="title">Đầu tư định kỳ</span>
      </div>
    </div>
  );
};

export default TabTransaction;