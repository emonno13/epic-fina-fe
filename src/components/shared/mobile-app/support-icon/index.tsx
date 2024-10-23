import { PhoneFilled } from '@ant-design/icons';
import { Button } from 'antd';

import './support-icon.scss';

const MobileSupportIcon = () => {
  return (
    <Button className="mobile-support" type="link" href="tel:0917434496">
      <span>IT support</span>
      <span><PhoneFilled /> 0917434496</span>
    </Button>
  );
};

export default MobileSupportIcon;
