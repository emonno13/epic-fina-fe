import { useCallback, useRef, useState } from 'react';

const useLongPress = (
  onLongPress,
  onClick,
  { shouldPreventDefault = true, delay = 500 } = {},
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<any>();
  const target = useRef<any>();

  const start = useCallback(
    event => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', () => {}, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault],
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout?.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick(event);
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target?.current?.removeEventListener('touchend', () => {});
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered],
  );

  return {
    onMouseDown: e => start(e),
    onTouchStart: e => start(e),
    onMouseUp: e => clear(e),
    onMouseLeave: e => clear(e, false),
    onTouchEnd: e => clear(e),
  };
};

export default useLongPress;