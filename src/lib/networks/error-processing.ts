import { AuthenticationUtils } from '@lib/utils/authentication-utils';
import { MobileUtils } from '@lib/utils/mobile';
import { notification } from 'antd';
import Router from 'next/router';
import { RouteUtils } from '../../components/shared/layout/router-contaner/utils';

export const STATUS_CODE = [401, 403, 502];

export const showErrorDetailForDev = (error) => {
  if (['production', 'test'].includes(process.env.NODE_ENV)) {
    return;
  }

  notification.error({
    message: `${error?.name} (${error?.statusCode})`,
    description: `${error?.message}`,
  });
  const details = error?.details || [];
  if (Array.isArray(details)) {
    details.map((errDetail) => {
      notification.error({
        message: `${errDetail?.code} (${errDetail?.path}${errDetail?.info?.missingProperty})`,
        description: `${errDetail.message}`,
      });
    });
  } else {
    notification.error({
      message: 'Error',
      description: 'Your request is not success',
    });
  }
};

const showErrorMessageByName = (error) => {
  if (!global.document) {
    return;
  }
  let message = error?.name || 'Error';
  let description = error?.message || 'The system can not execute your request';
  switch (error?.name) {
    case 'UnauthorizedError': {
      message = 'Your login information is not correct.';
      description = 'Please enter the correct account and try again!';
      break;
    }
    case 'ForbiddenError': {
      message = "You don't have permission to access resource.";
      description = 'You need to have right permission or role to continues!';
      break;
    }
    case 'ConflictError': {
      message = 'The data is duplicated';
      description = 'Your data already existed in the db. Please double check.';
      break;
    }
    case 'UnprocessableEntityError': {
      message = "You don't have permission to access resource.";
      description = 'You need to have right permission or role to continues!';
      break;
    }
    case 'domainNotFound': {
      message = 'Domain not support for your account.';
      description = 'Looks like your account belong another domain!';
      break;
    }
  }
  notification.error({ message, description });
  // if(message && description){
  // 	notification.error({message, description});
  // }
};

export const redirectToLoginPage = async () => {
  const { asPath, route } = Router;
  if (MobileUtils.checkIsWebView()) {
    await RouteUtils.redirect('/admin/m-dashboard?openLogin=true');
    return;
  }
  if (route === '/users/login') {
    return;
  }
  await RouteUtils.redirect(
    `/users/login?${RouteUtils.getQueryUri({ redirect: asPath }, true)}`,
  );
};

export const redirectErrorProcessing = async (
  error,
  useDefaultMessage = true,
) => {
  switch (error?.statusCode) {
    case 401:
    case 403: {
      AuthenticationUtils.resetCookies();
      return await redirectToLoginPage();
    }
    case 502: {
      await redirectToLoginPage();
      break;
    }
  }
};

export const ErrorProcessing = async (error) => {
  showErrorMessageByName(error);
  await redirectErrorProcessing(error);
};
