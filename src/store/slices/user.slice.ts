import { authService } from '@api/auth.service';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/store';
import { removeAccessToken } from '@utils';

export interface UserState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user?: Record<string, any>;
  scope: string;
}

export type SessionInfo = Pick<UserState, 'user' | 'scope'>;

const initialState: UserState = {
  isInitialized: false,
  isAuthenticated: false,
  user: undefined,
  scope: '',
};

export const getProfileAsyncThunk = createAsyncThunk(
  'user/getProfileAsyncThunk',
  /* async */ async (_, { rejectWithValue }) => {
    try {
      const res = await authService.getProfile();
      const user = res?.payload?.data || {};
      return { user };
    } catch (err) {
      console.log('🚀 ~ /**/ ~ err:', err);
      return rejectWithValue(JSON.stringify(err as any));
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initSession: (state) => {
      state.isInitialized = true;
    },
    updateSession: (state, action) => {
      const { payload } = action as PayloadAction<SessionInfo>;
      state.user = payload.user;
      state.isAuthenticated = true;
      state.scope = payload.scope;
    },
    clearSession: (state) => {
      state.user = undefined;
      state.isAuthenticated = false;
      state.scope = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileAsyncThunk.fulfilled, (state, action /* : PayloadAction<SessionInfo> */) => {
      state.user = action.payload.user;
    });
    builder.addCase(getProfileAsyncThunk.rejected, (state, action) => {
      console.log('fail to get profile', action);
      state.user = {};
      removeAccessToken();
      window.location.reload();
    });
  },
});

export const { updateSession, clearSession, initSession } = userSlice.actions;

export const selectUser = (state: AppState) => state.user.user;

export default userSlice.reducer;
