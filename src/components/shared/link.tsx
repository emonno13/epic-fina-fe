import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import { LanguageUtils } from '../../lib/language-utils';

export const Link = (props: LinkProps | any) => {
  const { children } = props || {};
  return (
    <span className="clickable-opacity">
      <NextLink passHref {...props} href={`/${LanguageUtils.getCurrentCountry()}${props.href}`}>
        <span>{children}</span>
      </NextLink>
    </span>
  );
};
