import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { notification } from 'antd';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'underscore';

const notificationFetchUserError = (t, referralCode) => {
  notification.error({
    message: t(`Could not found user by code: ${referralCode}`, {
      vn: `Không tìm thấy tài khoản với mã: ${referralCode}`,
    }),
  });
};

const fetchReferUserByRefCode = ({
  refCode,
  filter,
}: {
  refCode: string;
  filter?: any;
}) => {
  const params = {
    filter: {
      where: { referralCode: refCode },
      ...filter,
      fields: [
        'id',
        'firstName',
        'lastName',
        'fullName',
        'emails',
        'tels',
        'code',
        'avatar',
        'identification',
      ],
    },
  };
  return FormUtils.getHttpRequestMethod(params, { method: 'GET' })({
    url: endpoints.generateNodeEndpoint('users/referral'),
    params: params,
  });
};

const useFetchReferralUser = (referralCode: string) => {
  const { t } = useHTranslation('admin');
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (!referralCode) return;
    const responseFetchReferUser = fetchReferUserByRefCode({
      refCode: referralCode,
    });
    responseFetchReferUser
      .then((response) => {
        const userByRefCode = response?.data?.[0];
        if (isEmpty(userByRefCode)) {
          notificationFetchUserError(t, referralCode);
          setUser(undefined);
          return;
        }
        setUser(userByRefCode);
      })
      .catch(() => {
        notificationFetchUserError(t, referralCode);
        setUser(undefined);
      });
  }, [referralCode]);

  return useMemo(() => user, [user, referralCode]);
};

const useFetchReferralUserDebounce = (
  referralCode?: string,
  timeDebounce = 300,
) => {
  const { t } = useHTranslation('admin');
  const [user, setUser] = useState<any>({});

  const fetchRefer = (refCode) => {
    const responseFetchReferUser = fetchReferUserByRefCode({
      refCode: refCode,
    });
    responseFetchReferUser
      .then((response) => {
        const userByRefCode = response?.data?.[0];
        if (isEmpty(userByRefCode)) {
          notificationFetchUserError(t, refCode);
          setUser(undefined);
          return;
        }
        setUser(userByRefCode);
      })
      .catch(() => {
        notificationFetchUserError(t, refCode);
        setUser(undefined);
      });
  };

  const fetchReferDebounce = useCallback(
    debounce(fetchRefer, timeDebounce),
    [],
  );

  useEffect(() => {
    if (!referralCode) return;
    fetchReferDebounce(referralCode);
  }, [referralCode]);

  return useMemo(() => user, [user]);
};

const useFetchChildrenUserIds = (user: any) => {
  const [users, setUsers] = useState<any>([]);
  const { id } = user;

  useEffect(() => {
    if (!id) {
      setUsers([]);
      return;
    }

    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.generateNodeEndpoint(`users/${id}/children`),
        method: 'get',
        onGotSuccess: setUsers,
        hiddenValues: {
          filter: {
            fields: ['id'],
          },
        },
      },
    );
  }, [id]);

  return users.map((user) => user.id.toString());
};

const useFetchUser = (userId: string, filter?: any) => {
  const [users, setUsers] = useState<any>({});

  useEffect(() => {
    if (!userId) {
      setUsers([]);
      return;
    }

    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(`/users/${userId}`),
        method: 'get',
        onGotSuccess: setUsers,
        hiddenValues: {
          ...filter,
          status: {
            neq: 'deleted',
          },
        },
      },
    );
  }, [userId]);

  return users;
};

export {
  fetchReferUserByRefCode,
  notificationFetchUserError,
  useFetchChildrenUserIds,
  useFetchReferralUser,
  useFetchReferralUserDebounce,
  useFetchUser,
};
