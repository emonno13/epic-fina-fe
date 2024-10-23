import { ActivitySvg, CommissionSvg, RaiseIncomeSvg } from './icons';
import ClockSvg from './icons/clock-svg';
import CardSvg from './icons/card-svg';
import PhoneSvg from './icons/phone-svg';
import PercentSvg from './icons/percent-svg';
import MoneySvg from './icons/money-svg';
import NoteSvg from './icons/note-svg';

export const MAKE_MONEY_PROCESS = [
  {
    icon: <ActivitySvg />,
    title: 'Hoạt động',
    content :'Cộng tác viên giới thiệu và giúp khách hàng tiếp cận các sản phẩm/dịch vụ của FINA trên nền tảng.',
  },
  {
    icon: <RaiseIncomeSvg />,
    title: 'Gia tăng thu nhập',
    content: 'Tăng thêm thu nhập với khoản phí hoa hồng hấp dẫn lên đến 56% giá trị giao dịch.',
  },
  {
    icon: <CommissionSvg />,
    title: 'Nhận hoa hồng',
    content: 'Sau khi giao dịch được FINA xác nhận là thành công,  khi đó hoa hồng được trả trực tiếp qua phương thức TIỀN MẶT hoặc CHUYỂN KHOẢN.',
  },
];

export const JOB_CONTENT = [
  {
    content: 'Tìm kiếm, cung cấp thông tin của Khách Hàng có nhu cầu sử dụng các sản phẩm của FINA lên Nền tảng.',
  },
  {
    content: 'Đăng bài về các sản phẩm của FINA trên internet, mạng xã hội…',
  },
  {
    content: 'Kết nối, giới thiệu Khách Hàng về các Sản Phẩm trên Nền tảng FINA.',
  },
  {
    content: 'Hỗ trợ khách Hàng chuẩn bị các tài liệu/văn bản theo hướng dẫn của FINA.',
  },
];

export const FaqData = t => [
  {
    question: t('how-to-register', { vn: 'Quy trình đăng ký như thế nào?' }),
    answer: 'Điền thông tin cơ bản (Họ và tên, sđt, email) -> Tiến hành xác thực thông tin cá nhân -> Ký hợp đồng CTV online.',
  },
  {
    question: t('agent-requirement', { vn: 'Yêu cầu để trở thành CTV của FINA?' }),
    answer: 'Là công dân Việt Nam, trên 18 tuổi, có CMND/CCCD (hoặc những giấy tờ tương tự chứng minh thân phận).',
  },
  {
    question: t('FINA có những sản phẩm gì?', { vn: 'FINA có những sản phẩm gì?' }),
    answer: '',
  },
  {
    question: t('agent-payment', { vn: 'CTV nhận thông tin về sản phẩm của FINA bằng ở đâu?' }),
    answer: 'Tất cả thông tin sản phẩm của FINA được công bố trên website chính thức của công ty fina.com.vn hoặc ứng dụng FINA trên App Store hoặc CH Play)',
  },
  {
    question: t('agent-payment-time', { vn: 'Thế nào gọi là giao dịch thành công?' }),
    answer: 'Giao dịch thành công là giao dịch được FINA xác nhận thành công (khách hàng giải ngân xong khoản vay; yêu cầu bảo hiểm được chấp thuận; khách hàng nhận được sản phẩm tài chính như trái phiếu, BĐS,...).',
  },
  {
    question: t('transaction-success', { vn: 'CTV cần làm gì để nhận được thù lao' }),
    answer: 'CTV chỉ cần đã ký HĐ cộng tác viên trên hệ thống.',
  },
  {
    question: t('Khi giao dịch thành công thì khi nào CTV nhận được nhận được thù lao?', { vn: 'Khi giao dịch thành công thì khi nào CTV nhận được nhận được thù lao?' }),
    answer: 'Thù lao của CTV được nhận vào tháng kế tiếp tháng giải ngân sau khi NH thanh toán cho FINA.',
  },
  {
    question: t('Phương thức thanh toán thù lao CTV như thế nào?', { vn: 'Phương thức thanh toán thù lao CTV như thế nào?' }),
    answer: 'FINA sẽ thanh toán thù lao theo hình thức TIỀN MẶT hoặc CHUYỂN KHOẢN (Lưu ý: thù lao của CTV được nhận là thù lao đã bao gồm Thuế thu nhập cá nhân)',
  },
];

export const JoinReasonData = (t, isMobile) => [
  {
    icon: <ClockSvg {...{ isMobile }} />,
    title: t('dynamic-time', { vn: 'Thời gian linh hoạt, ' }),
    content: t('online-everytime', { vn: 'mọi lúc, mọi nơi, hoàn toàn trực tuyến' }),
  },
  {
    icon: <CardSvg {...{ isMobile }} />,
    title: t('zero-fee', { vn: 'Không tốn phí gia nhập ' }),
    content: t('zero-risk', { vn: 'nên rủi ro của bạn bằng 0' }),
  },
  {
    icon: <PhoneSvg {...{ isMobile }} />,
    title: t('profession', { vn: 'Đội ngũ chuyên nghiệp ' }),
    content: t('24/7', { vn: 'luôn túc trực 24/7 để hỗ trợ bạn' }),
  },
  {
    icon: <PercentSvg {...{ isMobile }} />,
    title: t('received-commission', { vn: 'Nhận hoa hồng ' }),
    content: t('up-to', { vn: 'lên đến 56% giá trị sản phẩm' }),
  },
  {
    icon: <MoneySvg {...{ isMobile }} />,
    title: t('received-all', { vn: 'Nhận trực tiếp 100% ' }),
    content: t('commission', { vn: 'hoa hồng không qua trung gian' }),
  },
  {
    icon: <NoteSvg {...{ isMobile }} />,
    title: t('sign-contract', { vn: 'Ký hợp đồng ' }),
    content: t('online-cooperate', { vn: 'cộng tác online, mang đến cho bạn sự an toàn' }),
  },
];
