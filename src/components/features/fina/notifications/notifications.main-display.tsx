import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { setDataSource, setPagination } from '@schema-form/features/actions';
import {
  useFeatureId,
  usePagination,
  useTableSourceData,
} from '@schema-form/features/hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import moment from 'moment';
import { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch } from 'react-redux';
import NotificationListGroup from './notification-list.group';

const NotificationMainDisplay = ({ onClose }) => {
  const { t } = useHTranslation('common');
  const currentUser = useCurrentUser();
  const [page, setPage] = useState(2);
  const notifications = useTableSourceData();
  const pagination = usePagination();
  const featureId = useFeatureId();
  const dispatch = useDispatch();
  const renderListArr = useMemo(() => {
    if (!Array.isArray(notifications) || notifications.length < 1) {
      return [];
    }
    const today = moment().format('YYYY-MM-DD');
    const { todayNotifications, notTodayNotifications } = notifications.reduce(
      (acc, noti = {}) => {
        const createdAt = noti?.createdAt || new Date();
        if (!createdAt || moment(createdAt).format('YYYY-MM-DD') === today) {
          const formatNoti = {
            ...noti,
            createdAt: createdAt ? createdAt : today,
            status: 'UNREAD',
          };

          acc.todayNotifications.push(formatNoti);
        } else {
          acc.notTodayNotifications.push(noti);
        }
        return acc;
      },
      { todayNotifications: [], notTodayNotifications: [] },
    );
    return [
      {
        title: t('Today', { en: 'Today', vn: 'Hôm nay' }),
        list: todayNotifications,
      },
      {
        title: t('Before', { en: 'Before', vn: 'Trước đó' }),
        list: notTodayNotifications,
      },
    ];
  }, [notifications]);
  const onLoadMore = async () => {
    await FormUtils.submitForm(
      {
        filter: {
          where: { userId: currentUser.id },
          skip: (page - 1) * 20,
          limit: 20,
          order: ['createdAt DESC'],
        },
      },
      {
        nodeName: 'notifications',
        showSuccessMessage: false,
        onGotSuccess: (response) => {
          const { data, total } = response;
          dispatch(
            setDataSource({
              featureId,
              dataSource: [...notifications, ...data],
            }),
          );
          dispatch(setPagination({ featureId, pagination: { total } }));
          setPage(page + 1);
        },
      },
    );
  };
  const hasMore = useMemo(
    () => notifications?.length < pagination?.total,
    [notifications, pagination],
  );

  return (
    <div className="notification-main">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={hasMore}
        useWindow={false}
      >
        {renderListArr.map(({ title, list }, index) => (
          <NotificationListGroup
            key={`notification-group-${index}`}
            {...{ title, notifications: list, onClose }}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default NotificationMainDisplay;
