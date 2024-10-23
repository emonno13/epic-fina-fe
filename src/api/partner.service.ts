import http from '@lib/http';

export const partnerService = {
  register: (data?: any): Promise<any> => {
    return http.post(`/partner/register`, data);
  },
};
