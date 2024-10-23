import { TFunction } from 'next-i18next';

export const STATUS_VEHICLES = {
  new: 'new',
  used: 'used',
};

export const getStatusVehicle = (t: TFunction) => [
  { label: t('New vehicle'), value: STATUS_VEHICLES.new },
  { label: t('Used vehicle'), value: STATUS_VEHICLES.used },
];