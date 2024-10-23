import { useHTranslation } from '@lib/i18n';
import { List } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ExpertDetailReviewsListForm from '../reviews-list-form';
import ExpertDetailReviewsListItem from './reviews-list-item';

import './expert-detail-reviews-list.module.scss';

const PAGE_SIZE = 9;

const ExpertDetailReviewsList = ({
  hasPagination = false,
  fetchReviews,
  loading,
  reviewsData,
}) => {
  const { t } = useHTranslation('common');
  const [page, setPage] = useState<number>(1);
  const [paginationTitle, setPaginationTitle] = useState<string>('');

  const onFormChanging = (filter = {}) => {
    fetchReviews(1, filter);
  };

  const onPaginationChange = useCallback((current) => {
    setPage(current);
    fetchReviews(current);
  }, []);

  useEffect(() => {
    fetchReviews(1);
  }, []);

  return (
    <div className="expert-detail-reviews-list">
      {hasPagination && (
        <div className="expert-detail-reviews-list-form-container">
          <p>{paginationTitle}</p>
          <ExpertDetailReviewsListForm {...{ onFormChanging }} />
        </div>
      )}
      <List
        {...{
          dataSource: reviewsData?.data || [],
          loading,
          renderItem: (item: any) => {
            return (
              <List.Item>
                <ExpertDetailReviewsListItem {...item} />
              </List.Item>
            );
          },
          grid: {
            gutter: [24, 32] as any,
            xs: 1,
            sm: 1,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          },
          pagination: hasPagination
            ? {
                current: page,
                pageSize: PAGE_SIZE,
                total: reviewsData.total,
                onChange: onPaginationChange,
                showSizeChanger: false,
                showTotal: (total, [rangeStart, rangeEnd]) => {
                  const newPaginationTitle = `${t('Display', { vn: 'Hiển thị' })} ${rangeStart} - ${rangeEnd} ${t('of', { vn: 'của' })} ${total} ${t('reviews', { vn: 'đánh giá' })}`;
                  setPaginationTitle(newPaginationTitle);
                  return newPaginationTitle;
                },
              }
            : false,
        }}
      />
    </div>
  );
};

export default ExpertDetailReviewsList;
