import React from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import { PageHeader } from './header/view';
import { ScreenWithTrackingScrolling } from '../../../components/shared/common/screen-with-tracking-scrolling';

import './view.module.scss';

const MAIN_SCREEN_ID = 'mainScreen';

export default ({ children }) => {

  return (
    <ScreenWithTrackingScrolling screenId={MAIN_SCREEN_ID}>
      <Head>
        <meta name="description" content="H2Platform Frontend"/>
        <title>H2Platform Frontend</title>
      </Head>
      <Layout className="_ui-page" >
        <PageHeader/>
        {children}
      </Layout>

    </ScreenWithTrackingScrolling>
  );
};