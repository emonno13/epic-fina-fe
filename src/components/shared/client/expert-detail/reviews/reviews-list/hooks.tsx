import { FormUtils } from '@schema-form/utils/form-utils';
import { useCallback, useState } from 'react';

export const useExpertDetailReviewsList = ({ userData, pageSize = 9 }) => {
  const [reviewsData, setReviewsData] = useState<any>({
    data: [],
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReviews = useCallback(
    async (newPage, filter = {}) => {
      setLoading(true);
      await FormUtils.submitForm(
        {},
        {
          isSearchForm: true,
          nodeName: 'user-ratings',
          onGotSuccess: (response) => {
            setReviewsData(response);
          },
          hiddenValues: {
            filter: {
              order: 'createdAt DESC',
              ...filter,
              where: {
                ...(filter.where || {}),
                userId: userData?.id,
              },
              limit: pageSize,
              skip: (Number(newPage || 1) - 1) * pageSize,
              include: ['sender'],
            },
          },
          method: 'get',
        },
      );
      setLoading(false);
    },
    [userData],
  );

  return {
    reviewsData,
    loading,
    fetchReviews,
  };
};
