export const transactionStatus = {
  WAITING: 'Chờ khớp lệnh',
  NOT_MATCHING: 'Không khớp lệnh',
  MATCHED: 'Đã khớp',
};

export const mappingColorBuyOrderStatus = (status) => {
  switch (status) {
    case transactionStatus.WAITING:
      return 'orange';
    case transactionStatus.MATCHED:
      return 'green';
    case transactionStatus.NOT_MATCHING:
      return 'red';
  }
};

export const fundActions = {
  BUY: 'BUY',
  SELL: 'SELL',
};
