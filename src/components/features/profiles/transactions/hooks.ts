import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useState } from 'react';

export const useFetchDealByTaskId = (taskId: string) => {
  const [dealData, setDealData] = useState<any>({});

  useEffect(() => {
    if (!taskId) {
      setDealData({});
      return;
    }

    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.generateNodeEndpoint('deals'),
        hiddenValues: {
          filter: {
            where: {
              taskId,
            },
            include: [
              'product',
              {
                relation: 'dealDetails',
                scope: { include: [{ relation: 'partner' }] },
              },
            ],
          },
        },
        onGotSuccess: (response) => {
          setDealData(response?.data?.[0] || {});
        },
        useDefaultMessage: true,
      },
    );
  }, [taskId]);

  return dealData;
};

export const useFetchCreatedByForHistory = (histories: any[] = []) => {
  const [historiesWithCreatedBy, setHistoriesWithCreatedBy] = useState<any[]>(
    [],
  );
  const userIds =
    histories?.map(
      (history) => history?.createdById || history?.createdBy?.id || '',
    ) || [];

  useEffect(() => {
    if (!userIds.length) {
      setHistoriesWithCreatedBy(histories);
      return;
    }

    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.generateNodeEndpoint('users/referral'),
        hiddenValues: {
          filter: {
            where: {
              id: { inq: [...new Set([...userIds])] },
            },
          },
        },
        onGotSuccess: (response) => {
          const users = response?.data || [];
          const normalizeHistories = [...histories];

          for (const history of normalizeHistories) {
            history.createdBy = users.find(
              (user) =>
                user.id === history?.createdById ||
                user.id === history?.createdBy?.id,
            );
          }

          setHistoriesWithCreatedBy(normalizeHistories);
        },
      },
    );
  }, [histories]);

  return historiesWithCreatedBy;
};
