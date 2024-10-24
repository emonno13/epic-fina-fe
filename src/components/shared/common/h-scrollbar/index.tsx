import cls from 'classnames';
import { forwardRef, useMemo } from 'react';
import SimpleBar, { Props } from 'simplebar-react';

import 'simplebar-react/dist/simplebar.min.css';
import './h-scrollbar.module.scss';

interface HScrollbarProps extends Props {
  isFullScreen?: boolean;
  hideTrack?: boolean;
  mobileFullWidth?: boolean;
}

export const HScrollbar = forwardRef((props: HScrollbarProps, ref: any) => {
  const {
    children,
    className,
    isFullScreen = true,
    hideTrack = false,
    mobileFullWidth = false,
    classNames,
    ...rest
  } = props;

  const classNamesProp = useMemo(() => {
    const prop = {
      ...classNames,
    };

    if (hideTrack) {
      prop.track = 'simplebar-react-hide-scrollbar';
    }

    return prop;
  }, [classNames, hideTrack]);

  return (
    <SimpleBar
      {...{
        ...rest,
        className: cls(className, {
          fullscreen: isFullScreen,
          'mobile-full-width': mobileFullWidth,
        }),
        classNames: classNamesProp,
        ref,
      }}
    >
      {children}
    </SimpleBar>
  );
});

export default HScrollbar;
