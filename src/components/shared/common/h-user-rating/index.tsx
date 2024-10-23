import React from 'react';
import { Rate } from 'antd';
import { UserAvatar } from '../h-avatar';
import { ConverterUtils } from '../../../../lib/converter';

import './h-user-rating.module.scss';

export const HUserRating = ({ sender, rating }) => {
  const senderUser = sender || { fullName: rating?.metaData?.fullName || 'Anonymous' };
  return (
    <div className={'h-user-rating'}>
      <div className={'h-user-rating__avatar'}>
        <UserAvatar {...{ user: senderUser, avatarProps: { size: 60 } }}/>
      </div>
      <div className={'h-user-rating__information'}>
        <div className={'h-user-rating__information-fullName'}>{senderUser?.fullName}</div>
        <div className={'h-user-rating__information-rate'}><Rate disabled allowHalf defaultValue={rating.rate}/></div>
        <div
          className={'h-user-rating__information-created'}>{ConverterUtils.fullDatetimeConverter(rating.createdAt)}</div>
        <div className={'h-user-rating__information-message'}>
          {rating?.message}
        </div>
        {rating?.metaData && <div className={'h-user-rating__information-metadata'}>
					Đánh giá tại giao dịch: <a href="#">#LO000023423</a>
        </div>}
      </div>
    </div>
  );
};