import useChatHelpers from '@hooks/useChatHelpers';
import { createContext, useContext } from 'react';
type TChatContext = ReturnType<typeof useChatHelpers>;

export const ChatContext = createContext<TChatContext>({} as TChatContext);
export const useChatContext = () => useContext(ChatContext);
