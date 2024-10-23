import http from '@lib/http';

export const authService = {
  login: (data?: any): Promise<any> => {
    return http.post('/auth/login', data);
  },
  loginWithMagicLink: (data: any): Promise<any> => {
    return http.post('/auth/login-with-magic-link', data);
  },
  loginByGoogle: (): Promise<any> => {
    return http.get('/auth/google');
  },
  loginByFacebook: (): Promise<any> => {
    return http.get('/auth/facebook');
  },
  register: (data?: any, refCode?: string): Promise<any> => {
    const apiUrl = refCode ? `/auth/register?refCode=${refCode}` : `/auth/register`;
    return http.post(apiUrl, data);
  },
  resendVerifyByToken: (data: { state: string }): Promise<any> => {
    return http.post('/auth/send-verify-by-state', data);
  },
  resendVerifyByEmail: (data: { email: string }): Promise<any> => {
    return http.post('/auth/send-verify-by-email', data);
  },
  forgotPassword: (data: { email: string }): Promise<any> => {
    return http.post('/auth/forgot-password', data);
  },
  resetPassword: (data: { password: string; token: string }): Promise<any> => {
    return http.post('/auth/set-new-password', data);
  },
  getProfile: (): Promise<any> => {
    return http.get(`/auth/profile`);
  },
  verifyEmail: (data: { token: string }): Promise<any> => {
    return http.post(`/auth/verify-email`, data);
  },
  updateProfile: (data: { name: string }): Promise<any> => {
    return http.put(`/account`, data);
  },
  requestJoinCompany: (data: { company_id: string }): Promise<any> => {
    return http.post(`/account/request-join-company-by-account`, data);
  },
  contactUs: (data: any): Promise<any> => {
    return http.post(`/contact`, data);
  },
  verifyToken: (data: { token: string }): Promise<any> => {
    return http.post(`/auth/verify-token`, data);
  },
  checkHeal: (): Promise<any> => {
    return http.get(`/heal`);
  },
  verifyAuthCode: (data: { authCode: string }): Promise<any> => {
    return http.post(`auth/verify-authCode`, data);
  },
};
