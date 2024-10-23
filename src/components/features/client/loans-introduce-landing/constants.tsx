import { CheckFillIconSvg, ClipboardTextIconSvg, DollarSquareIconSvg, FavoriteChartIconSvg, SearchFillIconSvg, TicketFillIconSvg, TimeFillIconSvg, UserSquareIconSvg } from 'icons';

export const ACHIEVEMENTS = [
  { icon: <FavoriteChartIconSvg />, value: '98,1%', description: 'Tỷ lệ hồ sơ giải ngân thành công' },
  { icon: <UserSquareIconSvg />, value: '+10.000', description: 'Khách hàng sử dụng nền tảng dịch vụ' },
  { icon: <ClipboardTextIconSvg />, value: '+5000', description: 'Hồ sơ vay được thẩm định' },
  { icon: <DollarSquareIconSvg />, value: '+5.000 tỷ', description: 'Giải ngân thành công' },
];

export const REASONS_CHOOSE_FINA = [
  { icon: <TimeFillIconSvg />, value: 'Tiết kiệm thời gian', description: 'FINA chủ động tìm kiếm, so sánh và lựa chọn giải pháp tài chính tốt nhất.' },
  { icon: <SearchFillIconSvg />, value: 'Đa dạng lựa chọn', description: 'FINA mang đến hàng loạt lựa chọn về giải pháp tài chính mà không thuộc sở hữu của bất kỳ tổ chức nào.' },
  { icon: <TicketFillIconSvg />, value: 'Lãi suất ưu đãi', description: 'Tiếp cận được những khoản vay với lãi suất cạnh tranh thấp hơn thị trường từ phía ngân hàng.' },
  { icon: <CheckFillIconSvg />, value: 'Hoàn toàn miễn phí', description: 'FINA tư vấn và hỗ trợ khách hàng cho đến khi hoàn tất quy trình vay vốn, với mức phí là 0đ.' },
];

export const PRODUCT_DETAIL = (value) => [
  {
    image: 'mortgage-loan.png',
    contents : [
      `Lãi suất siêu cạnh tranh chỉ từ <span class="text-loans-hightlight">${value}%/năm</span>`,
      'Số tiền vay lên đến <span class="text-loans-hightlight">90%</span> giá trị tài sản bảo đảm',
      'Thời hạn vay lâu dài đến  <span class="text-loans-hightlight">30 năm</span>',
      'Phương thức trả nợ linh hoạt phù hợp nguồn trả nợ khách hàng',
    ],
  },
  {
    image: 'unsecured-loan.png',
    contents : [
      'Lãi suất ưu đãi chỉ từ <span class="text-loans-hightlight">0,99%/tháng</span>',
      'Hạn mức phê duyệt lên đến <span class="text-loans-hightlight">70 triệu đồng</span>',
      'Thời gian vay từ <span class="text-loans-hightlight">03 - 36 tháng</span>',
      'Thủ tục hồ sơ đơn giản chỉ cần CMND, SHK Hoặc Giấy phép lái xe',
    ],
  },
  {
    image: 'open-credit-card.png',
    contents : [
      'Lựa chọn linh hoạt phát hành thẻ và vay tín dụng <span class="text-loans-hightlight">hạn mức đến 49 triệu đồng</span>',
      '<span class="text-loans-hightlight">Miễn phí thường niên 5 năm </span> liên tiếp khi phát hành theo Combo',
      '<span class="text-loans-hightlight">Miễn phí thường niên cho năm đầu tiên</span> khi phát hành thẻ tín dụng',
      '<span class="text-loans-hightlight">Miễn phí lãi suất 55 ngày</span> kể từ ngày kích hoạt thẻ',
    ],
  },
  {
    image: 'fina-care-insurance.png',
    contents : [
      'Quyền lợi bảo hiểm chi trả một năm lên <span class="text-loans-hightlight">đến 1 tỷ đồng</span>.',
      '<span class="text-loans-hightlight">Ưu đãi đến 70% chi phí bảo hiểm</span> khi trở thành CTV của FINA',
      'Mua bảo hiểm cho bản thân và gia đình chưa tới <span class="text-loans-hightlight">5 phút</span>.',
      'Khám chữa bệnh tại <span class="text-loans-hightlight">286 hệ thống bệnh</span> viện trên toàn quốc.',
    ],
  },
];

export const FINA_BANKS = [
  'ABBank.png', 'ACB.png', 'BIDV.png', 'Argibank.png', 'GCCS.png', 'HongleongBank.png', 'MBBank.png', 'MSB.png', 'OCB.png', 'OCBCBank.png',
  'OceanBank.png', 'PVcomBank.png', 'Sacombank.png', 'SeABank.png', 'ShinhanBank.png', 'SMBC.png', 'StandardChartered.png', 'Techcombank.png',
  'TPBank.png', 'VIB.png', 'Vietcombank.png', 'VietinBank.png', 'VPBank.png', 'WooriBank.png',
];

export const FINA_PARTNERS = [
  'Datxanhgroup.png', 'realbox.png', 'realagent.png', 'linkgroup.png', 'nhaongay.png', 'propcom.png', 'ihouzz.png', 'Asahi.png', 'namproperty.png',
  'sencapital.png', 'tuan123.png', 'congchungtructuyen.png', 'chotot.png', 'Baoviet.png', 'BSH.png', 'gotrust.png', 'chubb.png', 'mic.png',
  'PVIPartner.png', 'toancau.png',
];

