import { InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';

export const RecentCallListItem = ({ recentCallData }) => {
  return (
    <div className="recent-call-item">
      <div className="recent-call-item__left-content">
        <PhoneOutlined className="recent-call-item__button-phone-call"/>
        <div className="recent-call-item__center">
          <div><h1>08644256252</h1></div>
          <div className="recent-call-name"> Vaan Anh</div>
        </div>
      </div>
      <div className="recent-call-date">12:20:20</div>
      <InfoCircleOutlined className="recent-call-item__button"/>
    </div>
  );
};