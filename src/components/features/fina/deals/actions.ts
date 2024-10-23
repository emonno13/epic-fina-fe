import { createAction } from 'redux-actions';

const UPDATE_DEAL_PROGRESS_ITEM = 'h2platform/deals/UPDATE_DEAL_PROGRESS_ITEM';
const REQUEST_DEAL_DETAILS_BY_DEAL = 'h2platform/deals/REQUEST_DEAL_DETAILS_BY_DEAL';

export const updateDealProgressItem = createAction(UPDATE_DEAL_PROGRESS_ITEM);
export const requestDealDetailsByDeal = createAction(REQUEST_DEAL_DETAILS_BY_DEAL);