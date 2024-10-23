import React from 'react';
import { Popover } from 'antd';
import { IconInfo } from 'icons';

export const PopoverExplain = (props: any) => {
  const { content, title } = props || {};

  return (
    <Popover content={
      <div style={{ fontSize: 14, fontStyle: 'italic', maxWidth: 300 }}>
        {title && <span style={{ fontSize: 16, fontStyle: 'normal', fontWeight: 700, display: 'block' }}>{title}</span>}
        {content && <div>{content}</div>}
      </div>
    } overlayClassName="popover-explain" trigger={['hover', 'click', 'focus']}>
      <IconInfo style={{ cursor: 'pointer', position: 'relative', top: 2 }}/>
    </Popover>
  );
};