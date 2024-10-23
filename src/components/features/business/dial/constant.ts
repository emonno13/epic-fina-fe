export enum USER_TRANSACTION_STATUS {
  BGI = 'BGI', // Bàn giao sản phẩm
  BGS = 'BGS', // Bàn giao sổ
  CDDCO = 'CDDCO', // Chờ duyệt đặt cọc
  CDHDC = 'CDHDC', // Chờ duyệt hợp đồng cọc
  CDHDO = 'CDHDO', // Chờ duyệt hợp đồng
  CDTLY = 'CDTLY', // Chờ duyệt thanh lý hủy
  CDTLYDC = 'CDTLYDC', // Chờ duyệt thanh lý đổi căn
  DCO = 'DCO', // Đặt cọc
  DCOMG = 'DCOMG', // Đặt cọc môi giới
  DDKNN = 'DDKNN', // Đủ điều kiện nhận nền
  DDKNS = 'DDKNS', // Đủ điều kiện nhận sổ
  HDC = 'HDC', // Hợp đồng giữ chỗ đặt cọc
  HDGD = 'HDGD', // Hợp đồng giao dịch
  HDNT = 'HDNT', // Hợp đồng nguyên tắc
  HDO = 'HDO', // Hợp đồng mua bán
  HDOPTO = 'HDOPTO', // Hợp đồng - phong tỏa
  HDT = 'HDT', // Hợp đồng cho thuê
  HDTM = 'HDTM', // Hợp đồng thuê chuyển đổi mua
  INPLTT = 'INPLTT', // In Phụ lục thỏa thuận
  INPLTTDC = 'INPLTTDC', // In Phụ lục thỏa thuận đặt cọc
  InHDC = 'InHDC', // In hợp đồng giữ chỗ đặt cọc
  InHDGD = 'InHDGD', // In Hợp đồng giao dịch
  InHDMB = 'InHDMB', // In hợp đồng mua bán
  InHDNT = 'InHDNT', // In Hợp đồng nguyên tắc
  KyHDO = 'KyHDO', // Ký Hợp đồng mua bán
  NOPPLTTDC = 'NOPPLTTDC', // Nộp Phụ lục thỏa thuận đặt cọc
  NopHDC = 'NopHDC', // Nộp hợp đồng cọc
  NopHDNT = 'NopHDNT', // Nộp hợp đồng nguyên tắc
  NopHDO = 'NopHDO', // Nộp hợp đồng mua bán
  PLTT = 'PLTT', // Phụ lục thỏa thuận
  PLTTDC = 'PLTTDC', // Phụ lục thỏa thuận đặt cọc
  TLHDC = 'TLHDC', // Thanh lý hợp đồng đặt cọc chuyển sang hợp đồng mua bán
  TLYDCOCC = 'TLYDCOCC', // Thanh lý chuyển cọc
  TLYDCODC = 'TLYDCODC', // Thanh lý dồn cọc
  TLYDCOHC = 'TLYDCOHC', // Thanh lý hủy cọc
  TLYDCOTC = 'TLYDCOTC', // Thanh lý trả cọc
  TLYHDC = 'TLYHDC', // Thanh lý hợp đồng giữ chỗ đặt cọc
  TLYHDCCC = 'TLYHDCCC', // Thanh lý hợp đồng giữ chỗ đặt cọc -  chuyển căn
  TLYHDCCT = 'TLYHDCCT', // Thanh lý hợp đồng giữ chỗ đặt cọc -  chuyển tên
  TLYHDNT = 'TLYHDNT', // Thanh lý hợp đồng nguyên tắc
  TLYHDO = 'TLYHDO', // Thanh lý hợp đồng
  TLYHDOCC = 'TLYHDOCC', // Thanh lý hợp đồng -  chuyển căn
  TLYHUY = 'TLYHUY', // Hủy giao dịch (nhập liệu sai...)
}

export const USER_TRANSACTION_STATUS_LABEL_MAPPING = {
  [USER_TRANSACTION_STATUS.BGI]: 'Bàn giao sản phẩm',
  [USER_TRANSACTION_STATUS.BGS]: 'Bàn giao sổ',
  [USER_TRANSACTION_STATUS.CDDCO]: 'Chờ duyệt đặt cọc',
  [USER_TRANSACTION_STATUS.CDHDC]: 'Chờ duyệt hợp đồng cọc',
  [USER_TRANSACTION_STATUS.CDHDO]: 'Chờ duyệt hợp đồng',
  [USER_TRANSACTION_STATUS.CDTLY]: 'Chờ duyệt thanh lý hủy',
  [USER_TRANSACTION_STATUS.CDTLYDC]: 'Chờ duyệt thanh lý đổi căn',
  [USER_TRANSACTION_STATUS.DCO]: 'Đặt cọc',
  [USER_TRANSACTION_STATUS.DCOMG]: 'Đặt cọc môi giới',
  [USER_TRANSACTION_STATUS.DDKNN]: 'Đủ điều kiện nhận nền',
  [USER_TRANSACTION_STATUS.DDKNS]: 'Đủ điều kiện nhận sổ',
  [USER_TRANSACTION_STATUS.HDC]: 'Hợp đồng giữ chỗ đặt cọc',
  [USER_TRANSACTION_STATUS.HDGD]: 'Hợp đồng giao dịch',
  [USER_TRANSACTION_STATUS.HDNT]: 'Hợp đồng nguyên tắc',
  [USER_TRANSACTION_STATUS.HDO]: 'Hợp đồng mua bán',
  [USER_TRANSACTION_STATUS.HDOPTO]: 'Hợp đồng - phong tỏa',
  [USER_TRANSACTION_STATUS.HDT]: 'Hợp đồng cho thuê',
  [USER_TRANSACTION_STATUS.HDTM]: 'Hợp đồng thuê chuyển đổi mua',
  [USER_TRANSACTION_STATUS.INPLTT]: 'In Phụ lục thỏa thuận',
  [USER_TRANSACTION_STATUS.INPLTTDC]: 'In Phụ lục thỏa thuận đặt cọc',
  [USER_TRANSACTION_STATUS.InHDC]: 'In hợp đồng giữ chỗ đặt cọc',
  [USER_TRANSACTION_STATUS.InHDGD]: 'In Hợp đồng giao dịch',
  [USER_TRANSACTION_STATUS.InHDMB]: 'In hợp đồng mua bán',
  [USER_TRANSACTION_STATUS.InHDNT]: 'In Hợp đồng nguyên tắc',
  [USER_TRANSACTION_STATUS.KyHDO]: 'Ký Hợp đồng mua bán',
  [USER_TRANSACTION_STATUS.NOPPLTTDC]: 'Nộp Phụ lục thỏa thuận đặt cọc',
  [USER_TRANSACTION_STATUS.NopHDC]: 'Nộp hợp đồng cọc',
  [USER_TRANSACTION_STATUS.NopHDNT]: 'Nộp hợp đồng nguyên tắc',
  [USER_TRANSACTION_STATUS.NopHDO]: 'Nộp hợp đồng mua bán',
  [USER_TRANSACTION_STATUS.PLTT]: 'Phụ lục thỏa thuận',
  [USER_TRANSACTION_STATUS.PLTTDC]: 'Phụ lục thỏa thuận đặt cọc',
  [USER_TRANSACTION_STATUS.TLHDC]: 'Thanh lý hợp đồng đặt cọc chuyển sang hợp đồng mua bán',
  [USER_TRANSACTION_STATUS.TLYDCOCC]: 'Thanh lý chuyển cọc',
  [USER_TRANSACTION_STATUS.TLYDCODC]: 'Thanh lý dồn cọc',
  [USER_TRANSACTION_STATUS.TLYDCOHC]: 'Thanh lý hủy cọc',
  [USER_TRANSACTION_STATUS.TLYDCOTC]: 'Thanh lý trả cọc',
  [USER_TRANSACTION_STATUS.TLYHDC]: 'Thanh lý hợp đồng giữ chỗ đặt cọc',
  [USER_TRANSACTION_STATUS.TLYHDCCC]: 'Thanh lý hợp đồng giữ chỗ đặt cọc - chuyển căn',
  [USER_TRANSACTION_STATUS.TLYHDCCT]: 'Thanh lý hợp đồng giữ chỗ đặt cọc - chuyển tên',
  [USER_TRANSACTION_STATUS.TLYHDNT]: 'Thanh lý hợp đồng nguyên tắc',
  [USER_TRANSACTION_STATUS.TLYHDO]: 'Thanh lý hợp đồng',
  [USER_TRANSACTION_STATUS.TLYHDOCC]: 'Thanh lý hợp đồng - chuyển căn',
  [USER_TRANSACTION_STATUS.TLYHUY]: 'Hủy giao dịch (nhập liệu sai...)',
};
