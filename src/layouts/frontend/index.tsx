import React from 'react';
import { DefaultSeo } from 'next-seo';
import { DefaultLayout } from './_default';
import SEO from '../../seo.config';

export const FrontendLayout = ({ children }) => {
  return (
    <DefaultLayout>
      <DefaultSeo {...SEO}/>
      {children}
    </DefaultLayout>
  );
};
export default FrontendLayout;