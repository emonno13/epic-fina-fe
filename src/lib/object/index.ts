export const ObjectUtils = {
  deleteProperties: (obj: object = {}, properties: string[] = []): object => {
    if (!obj) return obj;
    properties.map(property => {
      delete obj[property];
    });
    return obj;
  },
  isEmptyObject: (obj: object = {}): boolean => {
    return Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
  },
  isStringified: (strJson: string) => {
    try {
      const parsed = JSON.parse(strJson);
      if (parsed && typeof parsed === 'object') {
        return true;
      }
    } catch { 
      return false; 
    }
    return false;
  },
};
