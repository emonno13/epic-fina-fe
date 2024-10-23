import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormDataUtils } from '@lib/networks/http/form-data-utils';
import { useCurrentUser } from '@lib/providers/auth';
import { callApi } from '@schema-form/common/actions';
import { FormUtils } from '@schema-form/utils/form-utils';
import { IconGrid, IconList } from 'icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { VIEW_TYPE_REFERRER } from './constant';
import ProfileMyNetworkReferrersGrid from './referrers-grid';
import ProfileMyNetworkReferrersList from './referrers-list';

import './styles.module.scss';

const IconMyNetwork = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.2422 12.9297C17.805 12.9297 17.4095 13.0959 17.1017 13.3609L13.8078 11.5013C13.9923 11.0352 14.1016 10.531 14.1016 10C14.1016 8.96835 13.7056 8.03558 13.0743 7.314L16.4003 3.43277C16.5967 3.50876 16.8082 3.55469 17.0312 3.55469C18.0005 3.55469 18.7891 2.76611 18.7891 1.79688C18.7891 0.827637 18.0005 0 17.0312 0C16.062 0 15.2734 0.827637 15.2734 1.79688C15.2734 2.11502 15.365 2.40952 15.5133 2.66724L12.1904 6.54495C11.5552 6.14075 10.8069 5.89844 10 5.89844C9.3692 5.89844 8.77823 6.05347 8.24387 6.30905L6.71539 4.01672C6.93527 3.72314 7.07031 3.36288 7.07031 2.96875C7.07031 1.99951 6.28174 1.21094 5.3125 1.21094C4.34326 1.21094 3.55469 1.99951 3.55469 2.96875C3.55469 3.93799 4.34326 4.72656 5.3125 4.72656C5.46112 4.72656 5.60303 4.70245 5.74097 4.66766L7.27036 6.96152C6.43478 7.71286 5.89844 8.79044 5.89844 10C5.89844 10.3667 5.96237 10.7158 6.05316 11.0542L3.04443 12.327C2.72308 11.9794 2.26746 11.7578 1.75781 11.7578C0.788574 11.7578 0 12.5464 0 13.5156C0 14.4849 0.788574 15.2734 1.75781 15.2734C2.72705 15.2734 3.51562 14.4849 3.51562 13.5156C3.51562 13.4775 3.50677 13.4419 3.50449 13.4044L6.51306 12.1317C7.23389 13.3063 8.51837 14.0987 9.99374 14.101L10.3584 16.6933C9.79996 16.9881 9.41406 17.5679 9.41406 18.2422C9.41406 19.2114 10.2026 20 11.1719 20C12.1411 20 12.9297 19.2114 12.9297 18.2422C12.9297 17.3914 12.3218 16.6805 11.5176 16.5193L11.1516 13.9166C11.981 13.6717 12.6964 13.1779 13.217 12.5133L16.5158 14.3759C16.4975 14.4774 16.4844 14.5808 16.4844 14.6875C16.4844 15.6567 17.2729 16.4453 18.2422 16.4453C19.2114 16.4453 20 15.6567 20 14.6875C20 13.7183 19.2114 12.9297 18.2422 12.9297Z"
        fill="black"
      />
    </svg>
  );
};

const ProfileMyNetworkReferrers = () => {
  const { t } = useHTranslation('common');
  const currentUser: any = useCurrentUser();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [viewType, setViewType] = useState(VIEW_TYPE_REFERRER.GRID);

  const getParamsToFetchUserByRefCode = (refCode: string, code: string) => {
    return {
      filter: {
        where: {
          referralCode: { inq: [refCode, code] },
        },
        include: [{ relation: 'org' }],
      },
    };
  };

  const fetchUsersChildren = (user, cb) => {
    const { refCode, code } = user;

    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.generateNodeEndpoint('users/referral'),
        method: 'get',
        hiddenValues: getParamsToFetchUserByRefCode(refCode, code),
        onGotSuccess: (res) => {
          const users = res?.data || [];
          const userIds = users.map((user) => user.id);
          const params = {
            filter: {
              where: {
                userIds,
              },
            },
          };
          const endpoint = endpoints.endpointWithApiDomain(
            `/users/with-children?${FormDataUtils.convertObjectToUri(params)}`,
          );

          dispatch(callApi({ method: 'get', params, endpoint, callback: cb }));
        },
      },
    );
  };

  useEffect(() => {
    fetchUsersChildren(currentUser, setDataSource);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleChangeViewType = (type) => setViewType(type);

  return (
    <div className="profile-my-network-referrers">
      <h2 className="profile-my-network-referrers-title-bold">
        <div className="profile-my-network-referrers-title-bold-left">
          <div className="my-network">
            <IconMyNetwork /> {t('profile.myNetwork')}
          </div>
          <div className="total-referrer">
            Có <span>{dataSource?.length}</span> khách được bạn giới thiệu
          </div>
        </div>
        <div className="profile-my-network-referrers-title-bold-right">
          {!isMobile && <span>{t('profile.viewBy')}</span>}
          <IconList
            onClick={() => handleChangeViewType(VIEW_TYPE_REFERRER.LIST)}
            className={viewType === VIEW_TYPE_REFERRER.LIST ? 'active' : ''}
          />
          <IconGrid
            onClick={() => handleChangeViewType(VIEW_TYPE_REFERRER.GRID)}
            className={viewType === VIEW_TYPE_REFERRER.GRID ? 'active' : ''}
          />
        </div>
      </h2>

      {viewType === VIEW_TYPE_REFERRER.LIST ? (
        <ProfileMyNetworkReferrersList dataSource={dataSource} />
      ) : (
        <ProfileMyNetworkReferrersGrid dataSource={dataSource} />
      )}
    </div>
  );
};

export default ProfileMyNetworkReferrers;
