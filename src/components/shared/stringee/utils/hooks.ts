import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setConnectingState } from '../actions';

export const useStringee = () => {
  return useSelector((state: RootStateOrAny) => state.stringee);
};

export const useSetStringee = () => {
  const dispatch = useDispatch();

  return payload => {
    dispatch(setConnectingState(payload));
  };
};
