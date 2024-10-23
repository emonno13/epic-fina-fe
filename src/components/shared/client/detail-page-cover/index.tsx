
import { RightOutlined } from '@ant-design/icons';
import ClientBreadCrumb from '../bread-crumb';

import './detail-page-cover.module.scss';

interface ClientDetailPageCoverProps {
  breadCrumbRoutes?: any[];
  homeRoute?: string;
}

const ClientDetailPageCover = ({ breadCrumbRoutes = [], homeRoute }: ClientDetailPageCoverProps) => {
  return (
    <div className="client-detail-page-cover">
      <div className="max-w-1100 m-auto">
        <ClientBreadCrumb
          {...{
            className: 'client-detail-page-cover__breadcrumb',
            routes: breadCrumbRoutes,
            separator: <RightOutlined />,
            homeRoute,
          }}
        />
      </div>
    </div>
  );
};

export default ClientDetailPageCover;
