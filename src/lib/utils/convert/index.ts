export const ConvertUtils = {
  convertStringToArray: (value: string): string[] => {
    const regexSplit = new RegExp(/\n|\r|[,.; ]/g);
    const serialsSplited = value.split(regexSplit);
    return serialsSplited.filter((value) => value !== '');
  },
  replaceWhiteSpaceAndUpperString: (value = '') => {
    return value.replace(/\r|[ ]/g, '').toUpperCase();
  },
  escapeRegex(value: string) {
    if (!value) return value;
    return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  },
  slugify: (value: string) => {
    return ConvertUtils.normalizeString(value)
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  },
  normalizeString: (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D'),
  hexToRgbA: (hex, opacity = 1) => {
    let color;
    const isHex = /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex);
    // convert color is hex to  => rgba (FFF => ...)
    if (isHex) {
      color = hex.substring(1).split('');
      const lengthColorTypeHex = 3;

      if (color?.length === lengthColorTypeHex) {
        // convert index of color to rgba, duplicate value of color
        color = [
          color[0], color[0],
          color[1], color[1],
          color[2], color[2],
        ];
      }

      color = '0x' + color.join('');
      return `rgba(${[(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',')},${opacity})`;
    }
    return 'rgb(0, 0, 0, 0.1)';
  },
};
