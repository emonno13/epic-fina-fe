export const ArrayUtils = {
  removeStringElements: (arr: string[] = [], els: string[] = []): string[] => {
    const newArr = [...arr];
    for (const el of els) {
      const index = newArr.indexOf(el);
      if (index > -1) {
        newArr.splice(index, 1);
      }
    }
    return newArr;
  },
};
