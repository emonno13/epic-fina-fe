export const NumberUtils = {
  format: (value: number | string): string => {
    if (!value) return value?.toString() || '';

    const parts = value.toString().split('.');

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  },
  toDecimal: (value: number | string, decimalPlaces = 2): number => {
    const decimalDelimiter = '.';
    const stringValue = String(value);
    const parts: string[] = stringValue.split(decimalDelimiter);

    switch (parts.length) {
      case 1: {
        return Number(value);
      }
      case 2: {
        const [integerPart, decimalPart] = parts;

        return Number(
          [
            integerPart.replace(/(,*)/g, ''),
            decimalPart.substr(0, decimalPlaces),
          ].join(decimalDelimiter),
        );
      }
      default:
        return NaN;
    }
  },
  getRandomInt: (min: number, max: number) => {
    const normalizedMin = Math.ceil(min);
    const normalizedMax = Math.floor(max);
    return Math.floor(Math.random() * (normalizedMax - normalizedMin + 1)) + normalizedMin;
  },
  toFixedByInteger: (value: number, number = 100) => {
    return parseFloat(Number((value || 0) / number).toFixed(0)) * number || 0;
  },
  toFixed: (value: number, fractionDigits = 3) => {
    return parseFloat(Number((value || 0)).toFixed(fractionDigits)) || 0;
  },
};
