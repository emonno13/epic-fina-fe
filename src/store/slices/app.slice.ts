import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface IAppState {
  siderCollapsed: boolean;
  refCode: string;
  workspaces: string;
}

const initialState: IAppState = {
  siderCollapsed: false,
  refCode: '',
  workspaces: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleCollapse: (state, action) => {
      state.siderCollapsed = action.payload;
    },
    storeRefCode: (state, action) => {
      state.refCode = action.payload;
    },
    storeWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },
    clearRefCode: (state) => {
      state.refCode = '';
    },
    clearWorkspaces: (state) => {
      state.workspaces = '';
    },
  },
});

export const { actions: appActions } = appSlice;

export const selectSiderCollapsed = (state: AppState) => state.app.siderCollapsed;
export const selectRefCode = (state: AppState) => state.app.refCode;
export const selectWorkspaces = (state: AppState) => state.app.workspaces;

export default appSlice.reducer;
