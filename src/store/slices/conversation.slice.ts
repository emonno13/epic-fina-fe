import { conversationService } from '@api/conversation.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface IConversationState {
  loading?: boolean;
  data: any[];
}

const initialState: IConversationState = {
  loading: false,
  data: [],
};

const appSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addNewConversation: (state, action) => {
      state.data = [
        {
          _id: action.payload.id,
          name: 'New chat',
        },
        ...state.data,
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doFetchConversation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doFetchConversation.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
  },
});

export const doFetchConversation = createAsyncThunk('conversation/fetch', async () =>
  conversationService.getAll().then((res) => {
    return res?.payload?.data || [];
  }),
);

export const { actions: conversationActions } = appSlice;

export const selectConversationList = (state: AppState) => state.conversation.data;

export default appSlice.reducer;
