import cookie from 'cookie';
import { appWithTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import App, { AppInitialProps, AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import { StringeeCall as StringeeCallSDK } from 'fccs-sdk/dist';
import { useRouter } from 'next/router';
import { MobileUtils } from '@lib/utils/mobile';
import { DeviceUuidUtils } from '@lib/utils/device-uuid-utils';
import { AppUtils } from '@lib/utils/app-utils';
import { loadMioEKyc } from '@components/features/client/fund-certificate/store';
import AppSeoTags from '@components/shared/app-seo-tags';
import { CookieMessage } from '../@types';
import { UserCallingDetail } from '../components/features/crm/user-calling-info';
import { connectToStringeeServer } from '../components/shared/stringee/actions';
import { StringeeCall } from '../components/shared/stringee/calling-detail';
import {
  loadPositionConfig,
  loadRolesConfig,
} from '../dynamic-configuration/actions';
import { AuthProvider, useAuth } from '../lib/providers/auth';
import { requestPermission } from '../store/actions';
import { wrapper } from '../store/store';
import { loadSystemEnv } from '../system/actions';

import '../styles/antd-custom.less';

import 'animate.css/animate.min.css';
import 'nprogress/nprogress.css';
import 'public/app.scss';
import 'fccs-sdk/dist/index.css';
import 'tailwindcss/tailwind.css';
import '../styles/_css_utils.scss';
import '../styles/_default.scss';
import '../styles/_nprogress_custom.scss';

export const Notification = dynamic(
  () => import('components/shared/firebase/notification'),
  { ssr: false },
);
export const FccsProvider = dynamic(() => import('fccs-sdk/dist'), {
  ssr: false,
});

const emptyLayout = ({ children }) => {
  return <div>{children}</div>;
};

const TopProgressBar = dynamic(
  () => {
    return import('components/shared/TopProgressBar');
  },
  { ssr: false },
);

const H2PlatformApp = (_props) => {
  const mainViewRef = useRef(null);
  const dispatch = useDispatch();
  const { setStringeeToken } = useAuth();
  const {
    Component,
    pageProps,
    authenticated,
    stringeeTokenApi,
    organization,
    user,
    token,
    stringeeToken,
    stringeeAgent,
    customAppProps = {},
  } = _props;
  const { seoTags } = pageProps;

  const checkIsWebView = MobileUtils.checkIsWebView();

  useEffect(() => {
    window.addEventListener('load', async () => {
      if (!process.env.NEXT_PUBLIC_USED_FCCS_SDK) {
        const options = {
          // handleRequestStringeeTokenSuccess,
          stringeeAgent,
          stringeeToken,
          setStringeeToken,
          currentUser: user,
        };
        dispatch(connectToStringeeServer(options));
      }
      DeviceUuidUtils.handleCheckDeviceUuid();
      dispatch(loadSystemEnv());
    });
  }, []);

  useEffect(() => {
    if (checkIsWebView) {
      MobileUtils.removeFbElement();
    }
  }, [checkIsWebView]);

  useEffect(() => {
    if (!user.id) {
      return;
    }
    dispatch(requestPermission({ userId: user?.id }));
    dispatch(loadPositionConfig());
    dispatch(loadRolesConfig());
    dispatch(loadMioEKyc());
  }, [user.id]);

  useEffect(() => {
    (window as any).mainViewRef = mainViewRef;
  }, [mainViewRef]);

  const PageLayout = Component.Layout || emptyLayout;

  return (
    <UseSDKWithMode>
      <AuthProvider
        {...{
          authenticated,
          organization,
          user,
          stringeeTokenApi,
          token,
          stringeeToken,
          stringeeAgent,
        }}
      >
        <Head>
          <meta
            name="viewport"
            content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
          />
        </Head>
        <AppSeoTags {...{ seoTags }} />
        <TopProgressBar />
        <div
          ref={mainViewRef}
          className="height100percent"
          id="height100percent"
        >
          <PageLayout {..._props}>
            <Component
              {...{
                ...pageProps,
                ...customAppProps,
                user: { ...user },
              }}
            />
          </PageLayout>
        </div>
        {authenticated && <Notification />}
        {process.env.NEXT_PUBLIC_USED_FCCS_SDK ? (
          <StringeeCallSDK />
        ) : (
          <StringeeCall />
        )}
        <UserCallingDetail />
      </AuthProvider>
    </UseSDKWithMode>
  );
};

H2PlatformApp.getInitialProps = async (
  appContext,
): Promise<AppInitialProps & AppProps> => {
  let authenticated = false;
  let stringeeToken = '';
  let stringeeTokenApi = '';
  let user: object = {};
  let stringeeAgent: object = {};
  let organization: object = {};
  const request = appContext.ctx.req as CookieMessage;
  if (request) {
    request.cookies = cookie.parse(request.headers.cookie || '');
    // authenticated = !!request.cookies.session;
    authenticated = !!request.cookies.h2token;
    stringeeToken = request.cookies.stringeeToken;
    stringeeTokenApi = request.cookies.stringeeTokenApi;
    try {
      stringeeAgent = request.cookies.stringeeAgent
        ? JSON.parse(request.cookies.stringeeAgent)
        : {};
      // eslint-disable-next-line no-empty
    } catch (e) {}
    // token = request.cookies.h2token;
    user = request.cookies.h2user ? JSON.parse(request.cookies.h2user) : {};
    organization = request.cookies.organization
      ? JSON.parse(request.cookies.organization)
      : {};
  }
  const customAppProps = await AppUtils.getCustomAppProps(appContext);
  // Call the page's `getInitialProps` and fill `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
    stringeeToken,
    stringeeAgent,
    stringeeTokenApi,
    authenticated,
    user,
    organization,
    customAppProps,
  } as any;
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'second-page'])),
  },
});

export default wrapper.withRedux(appWithTranslation(H2PlatformApp));
const UseSDKWithMode = ({ children }) => {
  const { locale } = useRouter();

  if (process.env.NEXT_PUBLIC_USED_FCCS_SDK) {
    return (
      <FccsProvider
        {...{
          publicKey: process.env.NEXT_PUBLIC_CLIENT_KEY_FCCS_SDK || '',
          callCenterUrl: process.env.NEXT_PUBLIC_URL_FCCS_SDK || '',
          defaultLanguage: locale || 'en',
        }}
      >
        {children}
      </FccsProvider>
    );
  }
  return <>{children}</>;
};
