import { Spin } from 'antd';

const PayMe = ({
  url = '',
}) => {
  return (
    <>
      {!url && <Spin size="large"/>}

      {url && <iframe title={url} allowFullScreen frameBorder="0" height={'650px'} src={url} width={'100%'}/>}
    </>
  );
};

export default PayMe;