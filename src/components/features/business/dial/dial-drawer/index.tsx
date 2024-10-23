import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Drawer } from 'antd';

import { DialContent } from './dial-content';
import { setCallMode } from '../actions';

const DialDrawer = () => {
  const dialStore = useSelector((state: RootStateOrAny) => state.dial);
  const dispatch = useDispatch();
  const handleDrawerClose = () => {
    dispatch(setCallMode(false));
  };

  return (
    <Drawer {...{
      visible: dialStore.callMode,
      getContainer: false,
      onClose: handleDrawerClose,
      className: 'dial-drawer-business',
    }}>
      <DialContent />
    </Drawer>
  );
};

export default DialDrawer;
