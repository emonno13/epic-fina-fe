import { RouteUtils } from '../../../components/shared/layout/router-contaner/utils';
import { TableUtils } from '../../../lib/table-utils';
import { setPagination } from '../actions';

export const executeOnPageChanged = async ({ pagination, sorter, useQueryParams, dispatch, featureId, handleSubmitSearchForm, limitNamespace = 'limit', skipNamespace = 'skip', pageNamespace = 'page' }) => {
  const { current = 1, pageSize } = pagination;
  const { columnKey, order } = sorter;
  const newPagination = {
    [pageNamespace]: current,
    filter: {
      [limitNamespace]: pageSize,
      [skipNamespace]: (current - 1) * pageSize,
      ...(columnKey && order) ? { order: `${columnKey} ${TableUtils.getLoopbackSortOrderFromAntOrder(order)}` } : {},
    },
  };

  if (useQueryParams) {
    const basePath = RouteUtils.getAdminBasePathFromRoute();
    await RouteUtils.redirect(`${basePath}?${RouteUtils.getQueryUri(newPagination, true)}`);
  }

  dispatch(setPagination({ featureId, pagination: newPagination }));
  handleSubmitSearchForm();
};
