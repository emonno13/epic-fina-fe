export const TYPE_OF_FUND = {
  STOCK: 'stock',
  BOND: 'bond',
  BALANCED: 'balanced',
  IPO: 'ipo',
};

export const mappingTypeOfFund = {
  [TYPE_OF_FUND.STOCK]: 'Quỹ cổ phiếu',
  [TYPE_OF_FUND.BOND]: 'Quỹ trái phiếu',
  [TYPE_OF_FUND.BALANCED]: 'Quỹ cân bằng',
  [TYPE_OF_FUND.IPO]: 'Quỹ tiền tệ',
};

export enum ORDER_MATCHING_DAY {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export const ORDER_MATCHING_DAY_OPTIONS = [
  { value: ORDER_MATCHING_DAY.MONDAY, label: 'Thứ 2' },
  { value: ORDER_MATCHING_DAY.TUESDAY, label: 'Thứ 3' },
  { value: ORDER_MATCHING_DAY.WEDNESDAY, label: 'Thứ 4' },
  { value: ORDER_MATCHING_DAY.THURSDAY, label: 'Thứ 5' },
  { value: ORDER_MATCHING_DAY.FRIDAY, label: 'Thứ 6' },
  { value: ORDER_MATCHING_DAY.SATURDAY, label: 'Thứ 7' },
  { value: ORDER_MATCHING_DAY.SUNDAY, label: 'Chủ nhật' },
];

export const ORDER_MATCHING_DAY_MAPPING: any = {
  [ORDER_MATCHING_DAY.MONDAY]: 'Thứ 2',
  [ORDER_MATCHING_DAY.TUESDAY]: 'Thứ 3',
  [ORDER_MATCHING_DAY.WEDNESDAY]: 'Thứ 4',
  [ORDER_MATCHING_DAY.THURSDAY]: 'Thứ 5',
  [ORDER_MATCHING_DAY.FRIDAY]: 'Thứ 6',
  [ORDER_MATCHING_DAY.SATURDAY]: 'Thứ 7',
  [ORDER_MATCHING_DAY.SUNDAY]: 'Chủ nhật',
};

export const FUND_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const TYPE_FEE = {
  SELL: 'SELL',
  BUY: 'BUY',
  TRANSFER: 'TRANSFER',
};

export const TYPE_FEE_MAPPING_COLOR = {
  [TYPE_FEE.SELL]: 'green',
  [TYPE_FEE.BUY]: 'magenta',
  [TYPE_FEE.TRANSFER]: 'red',
};

export const TYPE_FEE_MAPPING_LABEL = {
  [TYPE_FEE.SELL]: 'Bán',
  [TYPE_FEE.BUY]: 'Mua',
  [TYPE_FEE.TRANSFER]: 'Chuyển giao',
};

export const STATUS_PRODUCT_FUND = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const STATUS_PRODUCT_FUND_MAPPING = {
  [STATUS_PRODUCT_FUND.ACTIVE]: { label: 'Đang mở bán', color: 'green' },
  [STATUS_PRODUCT_FUND.INACTIVE]: { label: 'Chưa mở bán', color: 'red' },
};
