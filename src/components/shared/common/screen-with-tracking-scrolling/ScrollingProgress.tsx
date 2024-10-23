import { RootStateOrAny, useSelector } from 'react-redux';
import React from 'react';


const _window = global.window  ? (window as any) : { innerWidth: 0 };

export const ScrollingProgress = ({ screenId }) => {
  const scrollBarValues = useSelector((state: RootStateOrAny) => {
    return state.common.scrollBars[screenId] || { top: 0 };
  });
  const innerWidth = _window.innerWidth || 0;
  return (
    <div className="_scroll-state" style={{ width: innerWidth * scrollBarValues.top || 0 }}>
    </div>
  );
};