import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { ConverterUtils } from '@lib/converter';
import React from 'react';
import { UserAvatar } from '../h-avatar';

import './h-user.module.scss';

interface HUserProps {
  user: any;
  showHasAccount?: boolean;
  addon?: React.ReactNode;
  avatarSize?: number;
}

const HUser = (props: HUserProps) => {
  const { user = {}, showHasAccount = true, addon = '', avatarSize } = props;
  const hasAccount = user?.hasAccount;
  const tickStyle = {
    color: '#25D536',
    zIndex: '1',
    border: '1px solid #fff',
    borderRadius: '50%',
    fontSize: '12px',
    backgroundColor: '#fff',
  } as any;

  const tickCloseStyle = {
    color: '#cf1322',
    zIndex: '1',
    border: '1px solid #fff',
    borderRadius: '50%',
    fontSize: '12px',
    backgroundColor: '#fff',
  } as any;
  return (
    <div className="h-user">
      <div className="h-user__avatar">
        <UserAvatar
          {...{
            user,
            avatarSize,
            backgroundColor: user?.backgroundColor,
          }}
        />
        {showHasAccount && (
          <div className="h-user__avatar__tick">
            {hasAccount ? (
              <CheckCircleFilled style={tickStyle} />
            ) : (
              <CloseCircleFilled style={tickCloseStyle} />
            )}
          </div>
        )}
      </div>
      <div className="h-user__content">
        <div className="!flex !items-center justify-center">
          <p
            className="m-auto"
            style={{ lineBreak: 'anywhere', maxWidth: '130px' }}
          >
            {ConverterUtils.getFullNameUser(user)}
          </p>
        </div>
        <div>{addon}</div>
      </div>
    </div>
  );
};

export default HUser;
