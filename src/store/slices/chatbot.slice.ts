import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface IChatbotState {
  shouldProgressQuestion: boolean;
  shouldGetMessage: boolean;
  message: string;
}

const initialState: IChatbotState = {
  shouldProgressQuestion: false,
  shouldGetMessage: true,
  message: '',
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    initialNewConversation: (state, action) => {
      state.shouldProgressQuestion = true;
      state.shouldGetMessage = false;
      state.message = action.payload.message;
    },
    resetConversation: (state) => {
      state.shouldProgressQuestion = false;
      state.shouldGetMessage = true;
    },
  },
});

export const { actions: chatbotActions } = chatbotSlice;

export const selectChatbotShouldProgressQuestion = (state: AppState) => state.chatbot.shouldProgressQuestion;
export const selectChatbotShouldGetMessage = (state: AppState) => state.chatbot.shouldGetMessage;
export const selectChatbotMessage = (state: AppState) => state.chatbot.message;

export default chatbotSlice.reducer;
