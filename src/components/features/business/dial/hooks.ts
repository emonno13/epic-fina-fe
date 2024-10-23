import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setCurrentControl } from './actions';

export const useCurrentControl = () => {
  return useSelector((state: RootStateOrAny) => state.dial.currentControl);
};

export const useSetCurrentControl = () => {
  const dispatch = useDispatch();

  return payload => {
    dispatch(setCurrentControl(payload));
  };
};
