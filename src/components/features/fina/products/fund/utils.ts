import { useEffect, useState } from 'react';
import { TYPE_OF_FUND } from './constants';
import { FormUtils } from '../../../../../schema-form/utils/form-utils';
import { endpoints } from '../../../../../lib/networks/endpoints';

export const mappingLabelTypeOfFund = (status) => {
  switch (status) {
    case TYPE_OF_FUND.STOCK:
      return 'Quỹ cổ phiếu';
    case TYPE_OF_FUND.BOND:
      return 'Quỹ trái phiếu';
    case TYPE_OF_FUND.BALANCED:
      return 'Quỹ cân bằng';
    case TYPE_OF_FUND.IPO:
      return 'Quỹ tiền tệ';
    default:
      return '_';
  }
};

export const useFetchUpdateNavHistories = (productId: string, filter: any = {}) => {
  const [updateNavHistory, setUpdateNavHistory] = useState<any[]>([]);
  useEffect(() => {
    if (!productId) {
      setUpdateNavHistory([]);
      return;
    }
    FormUtils.submitForm({}, {
      method: 'get',
      endpoint: endpoints.endpointWithApiDomain('/navs'),
      hiddenValues: {
        filter: {
          ...filter,
          where: {
            ...filter?.where || {},
            productId,
          },
          order: ['navDate DESC'],
        },
      },
      onGotSuccess: response => {
        setUpdateNavHistory(response?.data || []);
      },
      onGotError: () => setUpdateNavHistory([]),
    });
  }, [productId]);
  return updateNavHistory;
};

export const useFetchFee = (productId: string, filter: any = {}) => {
  const [updateFee, setUpdateFee] = useState<any[]>([]);
  useEffect(() => {
    if (!productId) {
      setUpdateFee([]);
      return;
    }
    FormUtils.submitForm({}, {
      method: 'get',
      endpoint: endpoints.endpointWithApiDomain('/fees'),
      hiddenValues: {
        filter: {
          ...filter,
          where: {
            ...filter?.where || {},
            productId,
          },
        },
      },
      onGotSuccess: response => {
        setUpdateFee(response?.data || []);
      },
      onGotError: () => setUpdateFee([]),
    });
  }, [productId]);
  return updateFee;
};


