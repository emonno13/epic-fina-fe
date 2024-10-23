type TMessageProps = {
  conversation?: TConversation | null;
  message_id?: string | null;
  message?: TMessage;
  messagesTree?: TMessage[];
  currentEditId: string | number | null;
  isSearchView?: boolean;
  siblingIdx?: number;
  siblingCount?: number;
  setCurrentEditId?: React.Dispatch<React.SetStateAction<string | number | null>> | null;
  setSiblingIdx?: ((value: number) => void | React.Dispatch<React.SetStateAction<number>>) | null;
};

type TMessageContentParts =
  | { type: ContentTypes.ERROR; text: Text & PartMetadata }
  | { type: ContentTypes.TEXT; text: Text & PartMetadata }
  | {
      type: ContentTypes.TOOL_CALL;
    };

type TMessage = {
  feedback?: {
    react: string;
    reason?: string;
  };
  messageId: string;
  message_id?: string;
  isFinished?: boolean;
  endpoint?: string;
  clientId?: string;
  conversationId: string | string[] | null;
  conv_id: string | string[] | null;
  parentMessageId?: string | null;
  parent_message_id: string | null;
  responseMessageId?: string;
  overrideParentMessageId?: string;
  bg?: string;
  model?: string;
  role?: string;
  title?: string;
  sender?: string;
  text: string;
  message?: string;
  generation?: string;
  isEdited?: boolean;
  isCreatedByUser: boolean;
  error: boolean;
  createdAt?: string;
  updatedAt?: string;
  current?: boolean;
  unfinished?: boolean;
  searchResult?: boolean;
  finish_reason?: string;
  thread_id?: string;
  iconURL?: string;
  children?: TMessage[];
  content?: TMessageContentParts[];
};

type TMessagesAtom = TMessages | null;

type TConversation = {
  _id?: string;
  conversationId: string | string[] | null;
  title: string;
  name?: string;
};

type TAskProps = {
  text: string;
  isNewConvo?: boolean;
  parentMessageId?: string | null;
  parent_message_id?: string | null;
  conversationId?: string | string[] | null;
  messageId?: string | null;
  message_id?: string | null;
};

type TOptions = {
  editedMessageId?: string | null;
  editedText?: string | null;
  resubmitFiles?: boolean;
  isRegenerate?: boolean;
  isContinued?: boolean;
  isEdited?: boolean;
  isReplaceAnswer?: boolean;
};

type TAskFunction = (props: TAskProps, options?: TOptions) => void;

enum EModelEndpoint {
  azureOpenAI = 'azureOpenAI',
  openAI = 'openAI',
  bingAI = 'bingAI',
  chatGPTBrowser = 'chatGPTBrowser',
  google = 'google',
  gptPlugins = 'gptPlugins',
  anthropic = 'anthropic',
  assistants = 'assistants',
  azureAssistants = 'azureAssistants',
  custom = 'custom',
}

type TEndpointsConfig = Record<EModelEndpoint | string, TConfig | null | undefined> | undefined;

type TEndpointOption = {
  endpoint: EModelEndpoint;
  endpointType?: EModelEndpoint;
  modelDisplayLabel?: string;
  resendFiles?: boolean;
  maxContextTokens?: number;
  model?: string | null;
  promptPrefix?: string;
  temperature?: number;
  chatGptLabel?: string | null;
  modelLabel?: string | null;
  jailbreak?: boolean;
  key?: string | null;
  /* assistant */
  thread_id?: string;
};

type TSubmission = {
  plugin?: TResPlugin;
  plugins?: TResPlugin[];
  userMessage: TMessage;
  isEdited?: boolean;
  isContinued?: boolean;
  messages: TMessage[];
  isRegenerate?: boolean;
  conversationId?: string;
  initialResponse: TMessage;
  conversation: Partial<TConversation>;
  isNewConvo: boolean;
  isReplaceAnswer?: boolean;
};

type TPreset = {
  conversationId: boolean;
  createdAt: boolean;
  updatedAt: boolean;
  title: boolean;
};

type TModelsConfig = Record<string, string[]>;
