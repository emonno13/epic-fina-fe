import http from '@lib/http';

export const conversationService = {
  getAll: (): Promise<any> => {
    return http.get('/conversation');
  },
  getAllConv: async (): Promise<any> => {
    const result: any = await http.get(`/conversation`);
    return result?.data;
  },
  getRelatedQuestion: (payload: { message: string }): Promise<any> => {
    return http.post(`/question-answer/find-related`, payload);
  },
  getDetail: (convId: string): Promise<any> => {
    return http.get(`/conversation/${convId}`);
  },
  createNewOne: (message: string): Promise<any> => {
    return http.post('/conversation', { message });
  },
  updateMessageQAndA: (
    messageId: string,
    payload: {
      questionAnswerIds: string[];
    },
  ): Promise<any> => {
    return http.patch(`/message/question-answer/${messageId}`, payload);
  },
};
