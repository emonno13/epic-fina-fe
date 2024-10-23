import { RouteUtils } from '@components/shared/layout/router-contaner/utils';

const MobileManagementItem = ({
  iconPath,
  title,
  description,
  redirectPath,
}) => {
  const onRedirect = async () => {
    await RouteUtils.redirect(redirectPath);
  };
  return (
    <div className="mobile-management-item" onClick={onRedirect}>
      <img src={iconPath} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default MobileManagementItem;
