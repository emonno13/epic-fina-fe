export const ImportUtils = {
  getValue: (record: any, field: string) => {
    const data: any = record?.data || {};
    return data[field];
  },
};