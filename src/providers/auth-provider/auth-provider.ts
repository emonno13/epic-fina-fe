'use client';

import { authService } from '@api/auth.service';
import type { AuthProvider } from '@refinedev/core';
import { removeAccessToken } from '@utils';
import Cookies from 'js-cookie';

export const authProvider: AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    let accessToken = null;
    try {
      const res = await authService.login({ email, password });
      accessToken = res?.payload?.token;
    } catch (error) {
      console.log('🚀 ~ login: ~ error:', error);
      removeAccessToken();
    }

    if (accessToken) {
      Cookies.set('accessToken', JSON.stringify(accessToken), {
        expires: 7, // 7
        path: '/',
      });
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      return {
        success: true,
        redirectTo: '/',
      };
    }

    return {
      success: false,
      error: {
        name: 'Login Failed!',
        message: 'Tài khoản hoặc mật khẩu không đúng',
      },
    };
  },
  logout: async () => {
    removeAccessToken();

    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const auth = localStorage.getItem('accessToken');

    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => {
    const auth = localStorage.getItem('accessToken');

    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = localStorage.getItem('accessToken');

    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
