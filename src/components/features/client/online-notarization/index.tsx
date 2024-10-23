import { useCurrentUser } from '@lib/providers/auth';
import sign from 'jwt-encode';

import './online-notarization.module.scss';

const OnlineNotarization = () => {
  const user: any = useCurrentUser();
  const token = () => {
    let url = 'https://congchungtructuyen.vn';

    const email = user.emails?.[0].email;
    const phone = user.tels?.[0].tel;

    const secret = '';
    const data = { email: email, sodienthoai: phone };
    const jwt = sign(data, secret);
    if (email && phone) {
      url = `https://congchungtructuyen.vn/?token=${jwt}`;
    }
    return url;
  };

  return (
    <div className="online-notarization">
      <div className="online-notarization__m-1200 m-auto">
        <iframe src={token()} />
      </div>
    </div>
  );
};

export default OnlineNotarization;
