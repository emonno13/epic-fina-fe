import { ReactionType } from '@interfaces/message.interface';
import http from '@lib/http';

export const messageService = {
  getByConversation: async (conversationId: string): Promise<any> => {
    const result: any = await http.get(
      `/message/conversation/${conversationId}`,
    );
    const res = result?.data || result?.payload?.data || [];
    return res;
  },
  getSuggestQuestion: (): Promise<any> => {
    return http.get(`/suggest-question`);
  },
  reaction: (
    messageId: string,
    payload: { react: ReactionType; reason?: string },
  ): Promise<any> => {
    return http.put(`/message/feedback/custom-id/${messageId}`, payload);
  },
  updateMessage: (payload: any): Promise<any> => {
    const { messageId, text } = payload;
    return http.put(`/message/update/${messageId}`, {
      text,
    });
  },
  uploadImage: (data: any): Promise<any> => {
    return http.post('/upload/image ', data);
  },
};
