import { createAction } from 'redux-actions';

const UPDATE_ITEMS = 'h2platform/DRAG_AND_DROP/UPDATE_ITEMS';
const ADD_ITEM = 'h2platform/DRAG_AND_DROP/ADD_ITEM';
const DELETE_ITEM = 'h2platform/DRAG_AND_DROP/DELETE_ITEM';
const UPDATE_ITEM = 'h2platform/DRAG_AND_DROP/UPDATE_ITEM';

export const updateItems = createAction(UPDATE_ITEMS);
export const addItem = createAction(ADD_ITEM);
export const deleteItem = createAction(DELETE_ITEM);
export const updateItem = createAction(UPDATE_ITEM);
