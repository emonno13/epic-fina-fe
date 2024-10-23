export enum RobotsType {
  NOINDEX_NOFOLLOW = 'NOINDEX, NOFOLLOW',
  INDEX_FOLLOW = 'INDEX, FOLLOW',
  INDEX_NOFOLLOW = 'INDEX, NOFOLLOW',
  NOINDEX_FOLLOW = 'NOINDEX, FOLLOW',
}

export const getRobotsTypeOptions = () => {
  return Object.values(RobotsType).map(robotsType => ({
    label: robotsType,
    value: robotsType,
  }));
};

export const DEFAULT_FIELD_NAME_OF_SEO = 'seo';
