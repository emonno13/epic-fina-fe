import InfiniteScroll from 'react-infinite-scroller';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { RecentCallGroup } from './recent-call-list-group';
import { useHTranslation } from '../../../../../../lib/i18n';
import { useCurrentUser } from '../../../../../../lib/providers/auth';
import { useFeatureId, usePagination, useTableSourceData } from '../../../../../../schema-form/features/hooks';
import { FormUtils } from '../../../../../../schema-form/utils/form-utils';
import { setDataSource, setPagination } from '../../../../../../schema-form/features/actions';

import './recent-call-display.module.scss';

export const RecentCallDisplay = ({ onClose }) => {
  const  { t } = useHTranslation('common');
  const  currentUser = useCurrentUser();
  const  [page, setPage] = useState(2);
  const recentCalls = useTableSourceData();
  const pagination = usePagination();
  const featureId = useFeatureId();
  const dispatch = useDispatch();
  const renderListArr = useMemo(() => {
    if (!Array.isArray(recentCalls) || recentCalls.length < 1) {
      return [];
    }
    const today = moment().format('YYYY-MM-DD');
    const { todayRecentCalls, notTodayRencentCalls } = recentCalls.reduce(
      (acc, noti = {}) => {
        const createdAt = noti?.createdAt || new Date();
        if (!createdAt || moment(createdAt).format('YYYY-MM-DD') === today) {
          acc.todayRecentCalls.push(noti);
        } else {
          acc.notTodayRencentCalls.push(noti);
        }
        return acc;
      },
      { todayRecentCalls: [], notTodayRencentCalls: [] },
    );
    return [
      {
        title: t('Today', { en: 'Today', vn: 'Hôm nay' }),
        list: todayRecentCalls,
      },
      {
        title: t('Before', { en: 'Before', vn: 'Trước đó' }),
        list: notTodayRencentCalls,
      },
    ];
  }, [recentCalls]);

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
        // nodeName: '',
        showSuccessMessage: false,
        onGotSuccess: (response) => {
          const { data, total } = response;
          dispatch(setDataSource({ featureId, dataSource: [...recentCalls, ...data] }));
          dispatch(setPagination({ featureId, pagination: { total } }));
          setPage(page + 1);
        },
      },
    );
  };
  const hasMore = useMemo(() => recentCalls?.length < pagination?.total, [
    recentCalls,
    pagination,
  ]);
  return (
    <div className={'recent-call-display'}>
      <h1> Cuộc gọi gần đây</h1>
      <div>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={onLoadMore}
          hasMore={hasMore}
          useWindow={false}
        >
          {renderListArr.map(({ title, list }, index) => (
            <RecentCallGroup
              key={`recent-call-group-${index}`}
              {...{ title, recentCalls: list, onClose }}
            />
          ))}

        </InfiniteScroll>
      </div>
    </div>
  );
};