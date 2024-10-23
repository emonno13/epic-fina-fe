import { BorderBottomOutlined, UnorderedListOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

export const DisplayTypes = ({ width = 40, height = 30 }) => {
  const [active, setActive] = useState(false);
  const handleActiveMenu = () => {
    setActive(!active);
  };
  return (
    <div className={`ui-display-types ${active && 'active'}`} onClick={handleActiveMenu}>
      <div className={'container'}>
        <div className={'content'}>
          <div className={'title'}>
            <BorderBottomOutlined style={{ fontSize: 30 }}/>
          </div>
          <ul className="menu-panel">
            <li><BorderBottomOutlined style={{ fontSize: 30 }}/></li>
            <li><UnorderedListOutlined style={{ fontSize: 30 }}/></li>
            <li><BorderBottomOutlined style={{ fontSize: 30 }}/></li>
            <li><BorderBottomOutlined style={{ fontSize: 30 }}/></li>
            <li><BorderBottomOutlined style={{ fontSize: 30 }}/></li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .ui-display-types {
          // width: ${typeof width === 'number' ? `${width}px` : (width || 'auto')};
          height: ${typeof height === 'number' ? `${height}px` : (height || 'auto')};
        }
      `}</style>
    </div>
  );
};

