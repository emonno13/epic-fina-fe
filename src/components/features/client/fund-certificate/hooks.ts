import { useDispatch, useSelector } from 'react-redux';
import { fundStoreName, setMioEKyc } from './store';

export const useMioEkyc = () => {
  return useSelector(state => state?.[fundStoreName]?.mioEkyc);
};

export const useSetMioEkyc = () => {
  const dispatch = useDispatch();
  return payload => {
    dispatch(setMioEKyc(payload));
  };
};
