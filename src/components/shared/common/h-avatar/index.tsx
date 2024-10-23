import Avatar from 'antd/lib/avatar';
import React, { useState } from 'react';
import { endpoints } from '@lib/networks/endpoints';
import { AnyObject } from '@components/shared/atom/type';
import { UpdateUserDrawer } from '@components/shared/update-user-drawer';
import { ConverterUtils } from '../../../../lib/converter';

export const UserAvatar = ({
  user = { avatar: null },
  avatarProps = { size: 40 },
  emptyBackgroundColor,
  backgroundColor,
  onClick,
}: any) => {
  const { avatar = null } = user;
  const fullName = ConverterUtils.getFullNameUser(user);
  const [isVisibleUserUpdate, setIsVisibleUserUpdate] =
    useState<boolean>(false);
  const [selectedUserUpdate, setSelectedUserUpdate] = useState<AnyObject>(user);

  if (avatar) {
    const avatarHost = (avatar) => {
      if (typeof avatar === 'string') {
        return avatar?.startsWith('http')
          ? ''
          : endpoints.endpointWithApiDomain('');
      }

      return avatar?.url?.startsWith('http')
        ? ''
        : endpoints.endpointWithApiDomain('');
    };

    return (
      <>
        <Avatar
          {...avatarProps}
          style={
            backgroundColor ? { backgroundColor, position: 'relative' } : {}
          }
          src={
            <img
              className="img"
              onClick={() => {
                setIsVisibleUserUpdate(true);
              }}
              src={`${avatarHost(avatar)}${avatar}`}
              alt={fullName}
            />
          }
        />
        <style jsx>{`
          .img {
            width: 100%;
            height: auto;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            cursor: pointer;
          }
        `}</style>
        <UpdateUserDrawer
          setIsVisibleUserUpdate={setIsVisibleUserUpdate}
          isVisibleUserUpdate={isVisibleUserUpdate}
          selectedUserUpdate={selectedUserUpdate}
          setSelectedUserUpdate={setSelectedUserUpdate}
        />
      </>
    );
  }
  const matches = fullName.match(/\b(\w)/g) || [];
  const acronym = matches.join('');

  return (
    <Avatar {...avatarProps} style={{ backgroundColor: emptyBackgroundColor }}>
      {acronym}
    </Avatar>
  );
};
