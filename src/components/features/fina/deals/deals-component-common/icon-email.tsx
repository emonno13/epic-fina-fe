import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import './deals.module.scss';

export const IconEmail = ({ email = '' }) => {
  if (!email) {
    return null;
  }
  return (
    <>
      <div className={'wrapper-icon-email'}>
        <Tooltip title={email}>
          <a href={`mailto:${email}`}><MailOutlined className={'icon-email'}/></a>
        </Tooltip>
      </div>
      <style jsx>{`
      .wrapper-icon-email {
        display: flex;
        margin-bottom: 8px;
      }
      .wrapper-icon-email a{
        display: flex;
      }
     
      .icon-email {
        margin-left: 8px;
        background: #0a3eca;
        border-radius: 50%;
        width: 26px;
        height: 26px;
        transition: all 0.1s linear;
        color: #ffffff;
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: center;
      }
   `}</style>
    </>
  );
};