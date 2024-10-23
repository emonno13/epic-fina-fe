import { FC } from 'react';

import { SmallClientLogo } from '@layouts/admin/lightly/client/header/header.logo';
import { LoginFrameLogoProps } from './props-type';

const PreLoginFrameLogo: FC<LoginFrameLogoProps> = ({ extraContent }) => {
  return (
    <div className="login-frame--logo">
      <div className="logo">
        <SmallClientLogo />
      </div>
      {extraContent}
      <style jsx>{`
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-frame--logo {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default PreLoginFrameLogo;
