import React from 'react';

export const HEAD_DEFAULT_TAGS = [
  {
    key: 'PAGE_TITLE',
    tag: 'title',
    children: 'Fina - Your financial advisors',
  },
  {
    key: 'META_TITLE',
    tag: 'meta',
    props: {
      name: 'title',
      content: 'FINA is a technology platform that allows users to search, compare and choose exactly the right financial solutions for their needs including home loans, insurance packages or investment products.',
    },
  },
  {
    key: 'META_DESCRIPTION',
    tag: 'meta',
    props: {
      name: 'description',
      content: 'FINA\'s mission is to provide comprehensive financial services to help all Vietnamese people access the most diverse financial resources, address each individual\'s unique needs, and gradually improve improve the quality of life, create a sustainable and happy home.',
    },
  },
  {
    key: 'META_KEYWORDS',
    tag: 'meta',
    props: {
      name: 'keywords',
      content: 'fina, real estate, financial solutions, financial services, home loans, insurance packages, investment products',
    },
  },
  {
    key: 'META_OG_TYPE',
    tag: 'meta',
    props: {
      property: 'og:type',
      content: 'website',
    },
  },
  {
    key: 'META_OG_SITE_NAME',
    tag: 'meta',
    props: {
      property: 'og:site_name',
      content: 'FINA',
    },
  },
  {
    key: 'META_OG_URL',
    tag: 'meta',
    props: {
      property: 'og:url',
      content: '/',
    },
  },
  {
    key: 'META_OG_TITLE',
    tag: 'meta',
    props: {
      property: 'og:title',
      content: 'Fina - Your financial advisors',
    },
  },
  {
    key: 'META_OG_DESCRIPTION',
    tag: 'meta',
    props: {
      property: 'og:description',
      content: 'FINA is a technology platform that allows users to search, compare and choose exactly the right financial solutions for their needs including home loans, insurance packages or investment products.',
    },
  },
  {
    key: 'META_OG_IMAGE',
    tag: 'meta',
    props: {
      property: 'og:image',
      content: 'https://storage.googleapis.com/image-fina/upload/fina/fina-seo-image_1640157050553.png',
    },
  },
  {
    key: 'META_OG_IMAGE_WIDTH',
    tag: 'meta',
    props: {
      property: 'og:image:width',
      content: '1080',
    },
  },
  {
    key: 'META_OG_IMAGE_HEIGHT',
    tag: 'meta',
    props: {
      property: 'og:image:height',
      content: '1080',
    },
  },
  {
    key: 'META_TWITTER_CARD',
    tag: 'meta',
    props: {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
  },
  {
    key: 'META_FB_APP_ID',
    tag: 'meta',
    props: {
      property: 'fb:app_id',
      content: '101999141463247',
    },
  },
];

export type HeadGenerateItem = {
  key: string,
  tag: string,
  props?: any,
  children?: string,
}

export const HeadUtils = {
  generateDefaultHeadTagss() {
    return (
      <>
        {HEAD_DEFAULT_TAGS.map(item => {
          const { key, tag, children, props = {} } = item;
          return React.createElement(tag, {
            ...props,
            key,
          }, children);
        })}
      </>
    );
  },
  generateHeadTags(configs: HeadGenerateItem[] = []) {
    const generateConfigs = configs || [];

    HEAD_DEFAULT_TAGS.forEach(defaultItem => {
      if (generateConfigs.every(config => config.key !== defaultItem.key)) {
        generateConfigs.push(defaultItem);
      }
    });
    return (
      <>
        {generateConfigs.map(item => {
          const { key, tag, children, props = {} } = item;
          return React.createElement(tag, {
            ...props,
            key,
          }, children);
        })}
      </>
    );
  },
};
