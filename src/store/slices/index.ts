import appReducer from '@store/slices/app.slice';
import chatbotReducer from '@store/slices/chatbot.slice';
import conversationReducer from '@store/slices/conversation.slice';
import userReducer from '@store/slices/user.slice';

export default {
  conversation: conversationReducer,
  chatbot: chatbotReducer,
  app: appReducer,
  user: userReducer,
};
