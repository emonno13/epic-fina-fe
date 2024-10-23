import envConfig from '@utils/config';

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

export const EndpointURLs: { [key in EModelEndpoint]: string } = {
  [EModelEndpoint.openAI]: `/api/ask/${EModelEndpoint.openAI}`,
  [EModelEndpoint.bingAI]: `/api/ask/${EModelEndpoint.bingAI}`,
  [EModelEndpoint.google]: `/api/ask/${EModelEndpoint.google}`,
  [EModelEndpoint.custom]: `/api/ask/${EModelEndpoint.custom}`,
  [EModelEndpoint.anthropic]: `/api/ask/${EModelEndpoint.anthropic}`,
  [EModelEndpoint.gptPlugins]: `/api/ask/${EModelEndpoint.gptPlugins}`,
  [EModelEndpoint.azureOpenAI]: `/api/ask/${EModelEndpoint.azureOpenAI}`,
  [EModelEndpoint.chatGPTBrowser]: `/api/ask/${EModelEndpoint.chatGPTBrowser}`,
  [EModelEndpoint.azureAssistants]: '/api/assistants/v1/chat',
  [EModelEndpoint.assistants]: '/api/assistants/v2/chat',
};

export default function createPayload(submission: TSubmission) {
  // console.log('submission:', submission);
  const { conversation, userMessage, isEdited, isContinued, isReplaceAnswer } = submission;
  const { conversationId } = conversation;

  const server = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/message/ask/${conversationId}`;

  // if (isEdited) {
  //   server = server.replace('/ask/', '/edit/');
  // }
  const payload = {
    ...userMessage,
    ...(userMessage?.text && {
      message: userMessage.text,
    }),
    role: 'human',
    isContinued: !!(isEdited && isContinued),
    isReplaceAnswer: !!isReplaceAnswer,
    conversationId,
  };

  return { server, payload };
}
