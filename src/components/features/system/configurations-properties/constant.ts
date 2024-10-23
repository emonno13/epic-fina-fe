import { TFunction } from 'next-i18next';

export const OPTIONS_PROPERTIES = {
  BASIC: 'basic',
  FINISHED: 'finished',
  FULLY: 'fully',
};

export const getPropertiesOptions = (t: TFunction) => [
  { label: t(OPTIONS_PROPERTIES.BASIC, { vn: 'Cơ bản' }), value: OPTIONS_PROPERTIES.BASIC },
  { label: t(OPTIONS_PROPERTIES.FINISHED, { vn: 'Hoàn thiện' }), value: OPTIONS_PROPERTIES.FINISHED },
  // {label: t(OPTIONS_PROPERTIES.FULLY, {vn: 'Đầy đủ'}), value: OPTIONS_PROPERTIES.FULLY},
];