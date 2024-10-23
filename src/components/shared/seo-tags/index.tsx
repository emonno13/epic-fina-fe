import Head from 'next/head';
import { ReactNode, useMemo } from 'react';
import { usePublicEnvironment } from 'system/hooks';
import { SeoTagsKey } from './constants';

export type SeoTagsProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  url?: string;
  author?: string;
  imageUrl?: string;
  image?: any;
  robots?: string;
  type?: string;
  children?: ReactNode;
  imageWidth?: string;
  imageHeight?: string;
};

const SeoTags = (props: SeoTagsProps) => {
  const { 
    title,
    description,
    keywords,
    url,
    author,
    imageUrl, 
    image,
    robots,
    type,
    children,
    imageWidth,
    imageHeight,
  } = props;
  const currEnvironment = usePublicEnvironment('NODE_ENV');
  const thumbUrl = useMemo(() => image?.url || imageUrl || '', [imageUrl, image]);
  const robotsTag = useMemo(() => {
    if (currEnvironment !== 'production') return 'noindex, nofollow';
    return robots;
  }, [currEnvironment, robots]);

  return (
    <Head>
      {/* extra tags */}
      {children}

      {/* render tags */}
      {title && <title key={SeoTagsKey.TITLE}>{title}</title>}
      {title && <meta name="title" content={title} key={SeoTagsKey.META_TITLE} />}
      {description && <meta name="description" content={description} key={SeoTagsKey.META_DESCRIPTION} />}
      {Array.isArray(keywords) && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} key={SeoTagsKey.META_KEYWORDS} />}
      {author && <meta name="author" content={author} />}
      {thumbUrl && <meta name="thumbnail" content={thumbUrl} key={SeoTagsKey.META_THUMBNAIL} />}

      {/* robots tags */}
      {robots && <meta name="robots" content={robotsTag} />}

      {/* og tags */}
      {title && <meta property="og:title" content={title} key={SeoTagsKey.META_OG_TITLE} />}
      {url && <meta property="og:url" content={url} key={SeoTagsKey.META_OG_URL} />}
      {thumbUrl && <meta property="og:image" content={thumbUrl} key={SeoTagsKey.META_OG_IMAGE} />}
      {thumbUrl && <meta property="og:image:width" content={imageWidth || '1080'} key={SeoTagsKey.META_OG_IMAGE_WIDTH} />}
      {thumbUrl && <meta property="og:image:height" content={imageHeight || '1080'} key={SeoTagsKey.META_OG_IMAGE_HEIGHT} />}
      {description && <meta property="og:description" content={description} key={SeoTagsKey.META_OG_DESCRIPTION} />}
      {type && <meta property="og:type" content={type} key={SeoTagsKey.META_OG_TYPE} />}
      <meta property="og:locale" content="vi" key={SeoTagsKey.META_OG_LOCALE} />
      <meta property="og:site_name" content="FINA" key={SeoTagsKey.META_OG_SITENAME}/>

      {/* facebook tags */}
      {title && <meta name="facebook:title" content={title} />}
      {description && <meta name="facebook:description" content={description} />}
      {thumbUrl && <meta name="facebook:image" content={thumbUrl} key={SeoTagsKey.META_FACEBOOK_IMAGE} />}
      {thumbUrl && <meta name="facebook:card" content={thumbUrl} />}
      <meta name="fb:app_id" content="101999141463247" />
    </Head>
  );
};

export default SeoTags;
