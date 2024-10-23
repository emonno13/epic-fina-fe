import { RightOutlined } from '@ant-design/icons';
import ClientBreadCrumb from '../bread-crumb';

import './page-cover.module.scss';

interface ClientPageCoverProps {
  title: string;
  description?: string;
  breadCrumbRoutes?: any[];
  imageSrc?: string;
  homeRoute?: string;
}

const ClientPageCover = ({ title, description = '', breadCrumbRoutes = [], imageSrc, homeRoute }: ClientPageCoverProps) => {
  return (
    <div className="client-page-cover">
      <div className="max-w-1100 m-auto">
        <ClientBreadCrumb
          {...{
            className: 'client-page-cover__breadcrumb',
            routes: breadCrumbRoutes,
            separator: <RightOutlined />,
            homeRoute,
          }}
        />
        <div className="client-page-cover__title">{title}</div>
        <div className="client-page-cover__desc">{description}</div>
      </div>
      {imageSrc && (
        <div className="client-page-cover__cover">
          <i style={{ backgroundImage: `url("${imageSrc}")` }} />
        </div>
      )}
    </div>
  );
};

export default ClientPageCover;
