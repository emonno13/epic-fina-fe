import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { AppIcon } from '@components/app-icon';
import { ColorModeContextProvider } from '@contexts/color-mode';
import TanstackQueryClientProvider from '@contexts/query-provider';
import StyledComponentsRegistry from '@lib/registry';
import { dataProvider } from '@providers/data-provider';
import RecoilStoreProvider from '@recoil-store/RecoilStoreProvider';
import { useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import StoreProvider from '@store/StoreProvider';
import localFont from 'next/font/local';
import '../styles/global.scss';

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: [
    {
      path: '../styles/fonts/HonorSans/HONORSans-Light.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../styles/fonts/HonorSans/HONORSans-Regular.ttf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../styles/fonts/HonorSans/HONORSans-Medium.ttf',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../styles/fonts/HonorSans/HONORSans-Demibold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../styles/fonts/HonorSans/HONORSans-ExtraBold.ttf',
      weight: '800',
      style: 'extrabold',
    },
    {
      path: '../styles/fonts/HonorSans/HONORSans-Bold.ttf',
      weight: '900',
      style: 'megabold',
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://landing.ivita.vn'),
  title: 'AI Tra Cứu Sức Khỏe - Trợ lý AI Sức khỏe đầu tiên',
  description:
    'AI Tra Cứu Sức khỏe là 1 sản phẩm công nghệ đột phá trong việc hỗ trợ và tư vấn sức khỏe trong bối cảnh của cuộc cách mạng công nghiệp 4.0.',
  icons: {
    icon: '/icon/ivita-meta-icon.png',
  },
  openGraph: {
    title: 'AI Sức khỏe: Xây Dựng Nền Tảng Chăm Sóc Sức Khỏe Trong Kỹ Thuật Số',
    description:
      'AI Tra Cứu Sức Khỏe là 1 sản phẩm công nghệ đột phá trong việc hỗ trợ và tư vấn sức khỏe trong bối cảnh của cuộc cách mạng công nghiệp 4.0.',
    images: '/image/iVita-thumb-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  const defaultMode = theme?.value === 'dark' ? 'dark' : 'light';

  return (
    <html lang="en" className={myFont.className}>
      <body>
        <Suspense>
          <AntdRegistry>
            <ColorModeContextProvider defaultMode={defaultMode}>
              <StyledComponentsRegistry>
                <TanstackQueryClientProvider>
                  <RecoilStoreProvider>
                    <StoreProvider>
                      <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider}
                        notificationProvider={useNotificationProvider}
                        resources={[
                          {
                            name: 'home',
                            list: '/',
                            meta: {
                              canDelete: true,
                            },
                          },
                          {
                            name: 'login',
                            list: '/login',
                            meta: {
                              canDelete: true,
                            },
                          },
                        ]}
                        options={{
                          syncWithLocation: true,
                          warnWhenUnsavedChanges: true,
                          useNewQueryKeys: true,
                          projectId: '047ypg-jsgSWc-sUbCVY',
                          title: { text: 'Ivita Project', icon: <AppIcon /> },
                        }}
                      >
                        {children}
                      </Refine>
                    </StoreProvider>
                  </RecoilStoreProvider>
                </TanstackQueryClientProvider>
              </StyledComponentsRegistry>
            </ColorModeContextProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
