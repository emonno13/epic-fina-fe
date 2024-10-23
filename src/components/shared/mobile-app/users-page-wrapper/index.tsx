import { useRouter } from 'next/router';

import './users-page-wrapper.scss';

const MobileUsersPageWrapper = ({ children }) => {
  const { push, locale } = useRouter();

  const onBackClick = async () => {
    await push(`/${locale}/admin/m-dashboard`, undefined, {
      shallow: true,
      locale,
    });
  };
  return (
    <div className="mobile-users-page-wrapper">
      <img
        {...{
          className: 'mobile-users-page-wrapper__back-icon',
          src: '/assets/images/ic_mobile-back-arrow-gray.svg',
          onClick: onBackClick,
        }}
      />
      {children}
    </div>
  );
};

export default MobileUsersPageWrapper;
