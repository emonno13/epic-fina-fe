import { tabs } from '../constant';

import './tabs.scss';

const TabComponent = ({ changeTab, activeTab }) => {
  return (
    <div className="flex tabs m-t-20">
      <div
        className="flex items-center tab-content-active m-r-20"
      >
        <div className="info">
          <p className="title">Tài sản</p>
          <p className="sub-title">Nơi quản lý các danh mục đầu tư của bạn</p>
        </div>
      </div>
      <div
        className="flex items-center tab-content"
        onClick={() => changeTab(tabs?.transaction)}
      >
        <div className="info">
          <p className="title">Giao dịch</p>
          <p className="sub-title">Nơi quản lý các lệnh và lịch sử giao dịch</p>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
