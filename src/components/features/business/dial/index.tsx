import { Badge } from 'antd';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { CallSvg } from '@icons';
import { SVGIcon } from '../../../shared/atom/svg-icon';
import { setCallMode, setShowDetailCallRecord } from './actions';

export const DialButton = () => {
  const dispatch = useDispatch();
  const dialStore = useSelector((state: RootStateOrAny) => state.dial);

  const handleDial = () => {
    dispatch(setCallMode(!dialStore.callMode));
    dispatch(setShowDetailCallRecord(false));
  };

  return (
    <Badge>
      <SVGIcon svg={<CallSvg onClick={handleDial} width={32} />} />
    </Badge>
  );
};
