import { WifiOutlined } from '@ant-design/icons';
import { endpoints } from '@lib/networks/endpoints';
import { NumberUtils } from '@lib/utils/number';
import { Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { ReactInternetSpeedMeter } from 'react-internet-meter';

import './speed-test-internet.module.scss';
const { Text } = Typography;
const SpeedTestInternet = () => {
  const [wifiSpeed, setWifiSpeed] = useState<number>(0);
  const isOnline = useCheckOnlineOfLine();

  const speedStatus = useMemo(() => {
    if (!isOnline) {
      setWifiSpeed(0);
      return 'no-internet';
    }

    const number = NumberUtils.toFixed(wifiSpeed);

    if (number <= 0) {
      return 'waiting-check';
    }
    if (number < 10) {
      return 'slow-speed';
    }
    if (number < 20) {
      return 'normal-speed';
    }
    return 'good-speed';
  }, [wifiSpeed, isOnline]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="speed-test-internet">
      <ReactInternetSpeedMeter
        txtSubHeading={(wifiSpeed || '...') + ' MB/s'}
        outputType="alert"
        customClassName={'display-none'}
        txtMainHeading=" "
        pingInterval={10000} // milliseconds
        thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
        threshold={8}
        imageUrl={endpoints.endpointWithApiDomain('/images/fina_logo.png')}
        downloadSize="2550420" //bytes
        callbackFunctionOnNetworkTest={setWifiSpeed}
      />
      <WifiOutlined style={{ fontSize: 18 }} className={speedStatus} />
      <Text className={`${speedStatus} m-l-5`} ellipsis>
        {(wifiSpeed || '...') + ' MB/s'}
      </Text>
    </div>
  );
};

export default SpeedTestInternet;

const useCheckOnlineOfLine = () => {
  const [isOnline, setOnline] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener('online', () => setOnline(true));
    window.addEventListener('offline', () => setOnline(false));
  }, []);

  return isOnline;
};
