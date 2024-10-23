import { TFunction } from 'next-i18next';

export const PROPERTIES_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const PROPERTIES_TYPE = {
  APARTMENT: 'apartment',
  GROUND_HOUSE: 'ground_house',
};

export const DEMAND = {
  INACTIVE: 'inactive',
  SALE: 'sale',
  LEASE: 'lease',
};

export const BALCONYDIRECTION = {
  EAST: 'east',
  WEST: 'west',
  SOUTH: 'south',
  NORTH: 'north',
  SOUTH_EAST: 'south-east',
  NORTH_EAST: 'north-east',
  SOUTH_WEST: 'south-west',
  NORTH_WEST: 'north-west',
};

export const UTILITY_PROPERTIES = {
  BASIC: 'basic',
  FINISHED: 'finished',
  FULLY: 'fully',
};

export const getValue = (type: string) => {
  
};

export const getOptionStatus = (t: TFunction) => [
  { label: t(PROPERTIES_STATUS.INACTIVE, { vn: 'Không kích hoạt' }), value: PROPERTIES_STATUS.INACTIVE },
  { label: t(PROPERTIES_STATUS.ACTIVE, { vn: 'Kích hoạt' }), value: PROPERTIES_STATUS.ACTIVE },
];

export const getOptionPropertiesType = (t: TFunction) => [
  { label: t(PROPERTIES_TYPE.APARTMENT, { vn: 'Chung cư' }), value: PROPERTIES_TYPE.APARTMENT },
  { label: t(PROPERTIES_TYPE.GROUND_HOUSE, { vn: 'Nhà mặt đất' }), value: PROPERTIES_TYPE.GROUND_HOUSE },
];

export const getOptionDemand = (t: TFunction) => [
  { label: t(DEMAND.INACTIVE, { vn: 'Không có nhu cầu' }), value: DEMAND.INACTIVE },
  { label: t(DEMAND.SALE, { vn: 'Bán nhà' }), value: DEMAND.SALE },
  { label: t(DEMAND.LEASE, { vn: 'Cho thuê' }), value: DEMAND.LEASE },
];

export const getOptionUtilityProperties = (t: TFunction) => [
  { label: t(UTILITY_PROPERTIES.BASIC, { vn: 'Cơ bản' }), value: UTILITY_PROPERTIES.BASIC },
  { label: t(UTILITY_PROPERTIES.FINISHED, { vn: 'Bán hoàn thiện' }), value: UTILITY_PROPERTIES.FINISHED },
  { label: t(UTILITY_PROPERTIES.FULLY, { vn: 'Đầy đủ' }), value: UTILITY_PROPERTIES.FULLY },
];

export const getOptionBalconyDirection = (t: TFunction) => [
  { label: t(BALCONYDIRECTION.EAST, { vn: 'Đông' }), value: BALCONYDIRECTION.EAST },
  { label: t(BALCONYDIRECTION.WEST, { vn: 'Tây' }), value: BALCONYDIRECTION.WEST },
  { label: t(BALCONYDIRECTION.SOUTH, { vn: 'Nam' }), value: BALCONYDIRECTION.SOUTH },
  { label: t(BALCONYDIRECTION.NORTH, { vn: 'Bắc' }), value: BALCONYDIRECTION.NORTH },
  { label: t(BALCONYDIRECTION.SOUTH_EAST, { vn: 'Đông Nam' }), value: BALCONYDIRECTION.SOUTH_EAST },
  { label: t(BALCONYDIRECTION.NORTH_EAST, { vn: 'Đông Bắc' }), value: BALCONYDIRECTION.NORTH_EAST },
  { label: t(BALCONYDIRECTION.SOUTH_WEST, { vn: 'Tây Nam' }), value: BALCONYDIRECTION.SOUTH_WEST },
  { label: t(BALCONYDIRECTION.NORTH_WEST, { vn: 'Tây Bắc' }), value: BALCONYDIRECTION.NORTH_WEST },
];
