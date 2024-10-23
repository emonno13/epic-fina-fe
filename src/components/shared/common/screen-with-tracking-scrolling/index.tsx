import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'underscore';
import { setScrollBarValues } from 'store/actions';
import { ScrollingProgress } from './ScrollingProgress';

import './screen-with-tracking-scrolling.module.scss';

let mainScrollBarTimeoutId;

export const ScreenWithTrackingScrolling = ({ children, scrollClassName = 'fullscreen', className = '', screenId }) => {
  const dispatch = useDispatch();
  const hasDetailFeaturePopupOrDrawer = useSelector((state: RootStateOrAny) => {
    return state?.common?.hasDetailFeaturePopupOrDrawer;
  }, isEqual);
  const handleUpdate = (values) => {
    clearTimeout(mainScrollBarTimeoutId);
    mainScrollBarTimeoutId = setTimeout(() => {
      dispatch(setScrollBarValues({ id: screenId, values }));
    }, 1);

  };

  return (
    <div className={`ui-scroll-screen ${className}`}>
      <ScrollingProgress screenId={screenId}/>
      <Scrollbars
        id={screenId}
        className={scrollClassName}
        onUpdate={handleUpdate}>
        <div className={`ui-scroll-helper ${hasDetailFeaturePopupOrDrawer ? 'max-height-of-detail-screen' : ''}`}  >
          {children}
        </div>
      </Scrollbars>
    </div>
  );
};
