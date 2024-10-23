import React, { FC } from 'react';
import cn from 'classnames';

import { PreLoginFrameProps } from './props-type';

import './pre-login-frame.module.scss';

const PreLoginFrame: FC<PreLoginFrameProps> = ({
  children,
  leftSidePhoto = 'login_meme_bg.png',
  footer = <></>,
  header = <></>,
  className = '',
}) => {
  return (
    <div className={cn('pre-login-frame', className)}>
      <div style={{ backgroundImage: `url(/assets/images/${leftSidePhoto})` }} className="pre-login-frame__left-side" />
      <div className="pre-login-frame__right-side">
        <div className="header">{header}</div>
        {children}
        <div className="pre-login-frame__right--footer">
          {footer}
        </div>
      </div>
    </div>
  );
};

export default PreLoginFrame;
