import Cookies from 'js-cookie';

export const AuthenticationUtils = {
  resetCookies: () => {
    Cookies.remove('h2token');
    Cookies.remove('refreshToken');
    Cookies.remove('h2user');
    Cookies.remove('stringeeToken');
    Cookies.remove('h2permissions');
    Cookies.remove('stringeeAgent');
    Cookies.remove('stringeeTokenApi');
    Cookies.remove('expiresIn');
  },
};
