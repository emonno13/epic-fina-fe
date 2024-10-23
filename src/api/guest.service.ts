import http from '@lib/http';

export const GuestService = {
  receiveMessage: (data: any): Promise<any> => {
    return http.post('/guest/receive-message', data);
  },
};
