import { useEffect, useState } from 'react';
import {
  useCollapseLeftMenuState,
  useDispatchCollapseLeftMenuState,
} from '../../../../layouts/hooks';

export const CollapseLeftMenuPanel = ({ children }) => {
  const collapseLeftMenuState = useCollapseLeftMenuState();
  const [startingLeftMenuState, setStartingLeftMenuState] = useState(collapseLeftMenuState);
  const dispatchCollapseLeftMenuState = useDispatchCollapseLeftMenuState();
  useEffect(() => {
    dispatchCollapseLeftMenuState(true);
    setStartingLeftMenuState(collapseLeftMenuState);
    return () => {
      dispatchCollapseLeftMenuState(startingLeftMenuState);
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
};