'use client';

import { AppDrawer } from '@components/layout/appDrawer';
import { AppHeader } from '@components/layout/appHeader';
import { AppSider } from '@components/layout/appSider';
import useWindowSize from '@hooks/useWindowSize';
import { useAppDispatch } from '@store/hook';
import { doFetchConversation } from '@store/slices/conversation.slice';
import { getProfileAsyncThunk } from '@store/slices/user.slice';
import { Flex, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useEffect } from 'react';

export default function MainTemplate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { width, height } = useWindowSize(); // trick for ios mobile phone

  // get conversation list
  useEffect(() => {
    dispatch(doFetchConversation());
  }, []);

  // get user profile
  useEffect(() => {
    dispatch(getProfileAsyncThunk());
  }, []);

  return (
    <Layout style={{ backgroundSize: 'cover' }}>
      <Flex>
        <Layout
          id='loxo'
          style={{
            height: `${height}px`,
            backgroundColor: '#F9F9F9',
          }}
        >
          <Sider
            id='sider-id'
            className='hidden lg:flex h-full'
            width='324px'
            style={{ backgroundColor: 'transparent' }}
          >
            <AppSider />
          </Sider>
          <Layout className='' style={{ backgroundColor: 'transparent' }}>
            <AppHeader />
            <Content id='root-container-outlet' className='h-full overflow-hidden '>
              <AppDrawer />
              {children}
            </Content>
          </Layout>
        </Layout>
      </Flex>
    </Layout>
  );
}
