import Cookies from 'js-cookie';

export const onLoginSuccess = (response, callback?) => {
  const {
    user,
    accessToken,
    refreshToken,
    expiresIn = 0,
  } = response || {};
  const currentTime: number = new Date().getTime();
  const expiredAt = currentTime + parseInt(`${(expiresIn - 60) * 1000}`);
  Cookies.set('h2token', accessToken);
  Cookies.set('refreshToken', refreshToken);
  Cookies.set('expiresIn', expiresIn);
  Cookies.set('expiredAt', `${expiredAt}`);
  Cookies.set('h2user', JSON.stringify(user || '{}'));
  if (callback) {
    callback();
  }
};
