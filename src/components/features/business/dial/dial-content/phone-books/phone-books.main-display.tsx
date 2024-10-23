import InfiniteScroll from 'react-infinite-scroller';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PhoneBooksListGroup from './phone-books-list-group';
import { useHTranslation } from '../../../../../../lib/i18n';
import { useCurrentUser } from '../../../../../../lib/providers/auth';
import { useFeatureId, useTableSourceData } from '../../../../../../schema-form/features/hooks';
import { FormUtils } from '../../../../../../schema-form/utils/form-utils';
import { setDataSource, setPagination } from '../../../../../../schema-form/features/actions';

export const PhoneBooksDisplay = ({ onClose }) => {
  const  { t } = useHTranslation('common');
  const  currentUser = useCurrentUser();
  const  [page, setPage] = useState(2);
  const phoneBooks = useTableSourceData() || [];
  const featureId = useFeatureId();
  const dispatch = useDispatch();

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
          dispatch(setDataSource({ featureId, dataSource: [...phoneBooks, ...data] }));
          dispatch(setPagination({ featureId, pagination: { total } }));
          setPage(page + 1);
        },
      },
    );
  };

  return (
    <div>
      <h1> Danh bạ điện thoại</h1>
      <div>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={onLoadMore}
          useWindow={false}
        >
          {phoneBooks.map(({ title, list }, index) => (
            <PhoneBooksListGroup
              key={`phone-books-group-${index}`}
              {...{ title, phoneBooks: list, onClose }}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};