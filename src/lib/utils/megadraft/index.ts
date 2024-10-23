export const MegadraftUtils = {
  combineTextFromContent: (content: any = {}) => {
    const contentBlocks = content?.blocks;
    if (!Array.isArray(contentBlocks) || contentBlocks.length < 1) {
      return '';
    }
    return contentBlocks.reduce((acc, block) => `${acc}${block?.text || ''} \n`, '');
  },
};
