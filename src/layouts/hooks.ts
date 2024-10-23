import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { setCurrentLayout, setLayoutValue, showLeftMenu } from './actions';

export function useLayouts(): any {
  const layouts = useSelector((state: RootStateOrAny) => {
    return state?.layouts;
  }, isEqual);
  return layouts || {};
}

export function useCurrentLayoutName(): any {
  const currentLayout = useSelector((state: RootStateOrAny) => {
    return state?.layouts?.currentLayout;
  }, isEqual);
  return currentLayout;
}

export function useLayout(layoutName = '', allowChangeLayout = true): any {
  const dispatch = useDispatch();
  let theLayout = layoutName;
  const layout = useSelector((state: RootStateOrAny) => {
    const layouts = state?.layouts;
    theLayout ||= layouts.currentLayout;
    if (allowChangeLayout && layouts?.currentLayout !== theLayout) {
      dispatch(setCurrentLayout({ currentLayout: theLayout }));
    }

    return layouts?.[theLayout];
  }, isEqual);
  return layout || {};
}
export function useDispatchLayout(layoutName = ''): any {
  const dispatch = useDispatch();
  const theLayout = layoutName || useCurrentLayoutName();
  return (key, value) => {
    dispatch(setLayoutValue({ layout: theLayout, key, value }));
  };
}
export function useCollapseLeftMenuState(layoutName = ''): any {
  const layout = useLayout(layoutName, false);
  return layout?.collapseLeftMenu || false;
}
export function useDispatchCollapseLeftMenuState(layoutName = ''): any {
  const dispatch = useDispatch();
  const theLayout = layoutName || useCurrentLayoutName();
  return (value) => {
    dispatch(setLayoutValue({ layout: theLayout, key: 'collapseLeftMenu', value }));
  };
}

export function useShowLeftMenu(): boolean {
  return useSelector((state: RootStateOrAny) => {
    return state?.layouts?.isShowLeftMenu;
  }, isEqual);
}

export function useDispatchShowLeftMenu(): any {
  const dispatch = useDispatch();

  return (value) => {
    dispatch(showLeftMenu({ isShowLeftMenu: value }));
  };
}

