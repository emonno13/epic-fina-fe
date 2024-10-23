export const getUserIdFromSlug = (slug) => {
  if (!slug || typeof slug !== 'string') {
    return '';
  }
  const splitSlug = slug.split('-');
  return splitSlug[splitSlug.length - 1];
};
