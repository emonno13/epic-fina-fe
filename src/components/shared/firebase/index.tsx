import { NotificationOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showPopupNoti } from './actions';

export const NotificationControl = ({ userId = '' }) => {
  const dispatch = useDispatch();
  const showPopupNotification = () => {
    dispatch(showPopupNoti({ userId: userId, isShowPopup: true }));
  };

  return (
    <div className="d-f-center">
      <div>
        <NotificationOutlined onClick={showPopupNotification}/>
      </div>
    </div>
  );
};

