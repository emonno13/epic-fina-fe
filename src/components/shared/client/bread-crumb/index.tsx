import { Link } from '@components/shared/link';
import { Breadcrumb, BreadcrumbProps } from 'antd';

const ClientBreadCrumbItems = ({ routes, separator }) => {
  if (!Array.isArray(routes) || routes.length < 1) {
    return null;
  }
  return (
    <>
      {routes.map(({ path, breadcrumbName }, index) => (
        <Breadcrumb.Item
          separator={separator}
          key={`breadcrumb-item-${index}-${path}`}
        >
          {index === routes.length - 1 && breadcrumbName}
          {index !== routes.length - 1 && (
            <Link href={path}>{breadcrumbName}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </>
  );
};

const ClientBreadCrumb = (props: BreadcrumbProps) => {
  const { routes, homeRoute, ...rest }: any = props;
  return (
    <Breadcrumb {...rest}>
      <Breadcrumb.Item>
        <Link href={homeRoute || '/'}>Home</Link>
      </Breadcrumb.Item>
      <ClientBreadCrumbItems {...{ routes, separator: props.separator }} />
    </Breadcrumb>
  );
};

export default ClientBreadCrumb;
