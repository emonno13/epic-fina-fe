import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import './phone-books-list.module.scss';

export const PhoneBooksListItem = ({ phoneBooksData })  => {
  return (
    <div>
      <div className="phone-books-list-item">
        <div className="phone-books-list-item__left-content">
          <div className="phone-books-list-item__avatar">
            <Avatar size={48} icon={<UserOutlined />} />
          </div>
          <div className="phone-books-list-item__name">dasd</div>
        </div>
        <PhoneOutlined className="phone-books-list-item__button"/>
      </div>
    </div>
  );
};