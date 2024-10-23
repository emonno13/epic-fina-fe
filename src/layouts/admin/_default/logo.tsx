import { AlignRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import { useAuth } from '../../../lib/providers/auth';

export const SiteHeaderLogo = ({ onLeftMenuToggle }) => {
  const { currentUser = {} } = useAuth();

  return (
    <div className="admin-site-name">
      <AlignRightOutlined onClick={onLeftMenuToggle} className="icon"/>
      <div className="site-link">
        <div>
          <Link href="#">
            IPS ERP
          </Link>
        </div>
        <div className="username">
          {(currentUser as any).fullName}
        </div>
      </div>
    </div>
  );
};
