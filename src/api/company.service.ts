import http from '@lib/http';

export const companyService = {
  getAll: (): Promise<any> => {
    return http.get('/company');
  },
  register: (data?: any): Promise<any> => {
    return http.post(`/company/register`, data);
  },
};
