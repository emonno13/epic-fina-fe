export const RobotsType = {
  NOINDEX_NOFOLLOW: 'NOINDEX, NOFOLLOW',
  INDEX_FOLLOW: 'INDEX, FOLLOW',
  INDEX_NOFOLLOW: 'INDEX, NOFOLLOW',
  NOINDEX_FOLLOW: 'NOINDEX, FOLLOW',
};

export const getRobotsTypeOptions = () => {
  return Object.values(RobotsType).map(robotsType => ({
    label: robotsType,
    value: robotsType,
  }));
};

export const SeoTagsKey = {
  TITLE: 'title',
  META_DESCRIPTION: 'meta_description',
  META_TITLE: 'meta_title',
  META_KEYWORDS: 'meta_keywords',
  META_FACEBOOK_IMAGE: 'meta_facebook_image',
  META_OG_IMAGE: 'meta_og_image',
  META_OG_IMAGE_WIDTH: 'meta_og_image_width',
  META_OG_IMAGE_HEIGHT: 'meta_og_image_height',
  META_THUMBNAIL: 'meta_thumbnail',
  META_OG_TYPE: 'meta_og_type',
  META_OG_TITLE: 'meta_og_title',
  META_OG_URL: 'meta_og_url',
  META_OG_DESCRIPTION: 'meta_og_description',
  META_OG_LOCALE: 'meta_og_locale',
  META_OG_SITENAME: 'meta_og_sitename',
};

export const DEFAULT_SEO_TAGS = {
  title: 'Fina - Your financial advisors',
  description: 'FINA\'s mission is to provide comprehensive financial services to help all Vietnamese people access the most diverse financial resources, address each individual\'s unique needs, and gradually improve improve the quality of life, create a sustainable and happy home.',
  keywords: ['fina', 'real estate', 'financial solutions', 'financial services', 'home loans', 'insurance packages', 'investment products'],
  imageUrl: 'https://storage.googleapis.com/image-fina/upload/fina/fina-seo-image_1640157050553.png',
  type: 'article',
};
