import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { Badge } from 'antd';

import { CallSvg } from 'icons';
import { setCallMode, setShowDetailCallRecord } from './actions';
import { SVGIcon } from '../../../shared/atom/svg-icon';

export const DialButton = () => {
  const dispatch = useDispatch();
  const dialStore = useSelector((state: RootStateOrAny) => state.dial);

  const handleDial = () => {
    dispatch(setCallMode(!dialStore.callMode));
    dispatch(setShowDetailCallRecord(false));
  };

  return (
    <Badge >
      <SVGIcon svg={<CallSvg onClick={handleDial}  width={32} />} />
    </Badge>
  );
};
