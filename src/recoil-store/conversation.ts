import { buildTree } from '@utils';
import { atom, atomFamily, selector } from 'recoil';

const conversation = atom<TConversation | null>({
  key: 'conversation',
  default: null,
});

// current messages of the conversation, must be an array
// sample structure
const messages = atom<TMessagesAtom>({
  key: 'messages',
  default: [],
});

const messagesTree = selector({
  key: 'messagesTree',
  get: ({ get }) => {
    return buildTree({ messages: get(messages) });
  },
});

const latestMessage = atom<TMessage | null>({
  key: 'latestMessage',
  default: null,
});

const messagesSiblingIdxFamily = atomFamily<number, string | null | undefined>({
  key: 'messagesSiblingIdx',
  default: 0,
});

const allMessages = atom<TMessagesAtom>({
  key: 'allMessages',
  default: [],
});

export default {
  messages,
  conversation,
  messagesTree,
  latestMessage,
  messagesSiblingIdxFamily,
  allMessages,
};
