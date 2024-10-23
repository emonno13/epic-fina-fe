import { SendLetterCreditSvg } from 'icons';
import { BankerReceivesRequestIcon } from 'icons/rsvgs/banker-receives-request';
import { ClientIcon } from 'icons/rsvgs/client';
import { ConsultationRequestIcon } from 'icons/rsvgs/consultation-request';
import { CreateLoanApplicationIcon } from 'icons/rsvgs/create-loan-application';
import { CustomerConsultingChooseBankIcon } from 'icons/rsvgs/customer-consulting-choose-bank';
import { MakeCallIcon } from 'icons/rsvgs/make-call';
import { ReceiveIcon } from 'icons/rsvgs/receive';
import { ResultAnnouncementIcon } from 'icons/rsvgs/result-announcement';
import { CreditOfferLetterProcedureItemProps } from '.';

export const getCreditOfferLetterProcedureGenerateArray = (): CreditOfferLetterProcedureItemProps[] => {
  return [
    {
      step: 1,
      bodyText: 'Tư vấn khả năng vay sơ bộ:',
      textList: [
        'Tính nhu cầu vay',
        'Hồ sơ pháp lý (check CIC)',
        'Nguồn thu nhập',
        'Tài sản thế chấp',
      ],
      beginningText: 'Khách hàng',
      beginningBackground: '#673AB7',
    },
    {
      step: 2,
      textList: [
        'Chuyển thông tin và hồ sơ khách hàng cho nhân viên ngân hàng',
        'Tiếp tục hỗ trợ NVNH thu thập thông tin và hồ sơ khách hàng (nếu cần)',
        'Theo dõi tiến trình hồ sơ của khách',
      ],
      beginningText: 'Nhân viên FINA',
      beginningBackground: '#064DD6',
    },
    {
      step: 3,
      textList: [
        'Nhân viên ngân hàng nhận thông tin và hồ sơ từ khách hàng và FINA',
        'Tương tác với nhân viên FINA để tháo gỡ vướng mắc khó khăn',
        'Đánh giá và đề xuất tài trợ',
        'Thông báo kết quả phê duyệt',
      ],
      beginningText: 'Nhân viên ngân hàng',
      beginningBackground: '#9C27B0',
    },
    {
      step: 4,
      textList: [
        'NVNH thông báo cho khách hàng các thủ tục cần thiết để giải ngân',
        'Khách hàng bổ sung hồ sơ theo điều kiện phê duyệt (nếu có)',
        'Thực hiện công chứng, thế chấp, ký HĐTD',
        'Tiến hành giải ngân',
      ],
      beginningText: 'Đơn vị phê duyệt ngân hàng',
      beginningBackground: '#00BCD4',
      endText: 'Giải ngân',
      endBackground: '#4CAF50',
    },
  ];
};

export const WORKING_PROCESS = [
  { title: 'Khách hàng', content: '', icon: <ClientIcon /> },
  { title: 'Tạo yêu cầu tư vấn', content: 'Gửi thông tin về yêu cầu của khách hàng', icon: <ConsultationRequestIcon /> },
  { title: 'Tiếp nhận', content: 'Thực hiện liên hệ sớm trong vòng 5-10p', icon: <ReceiveIcon /> },
  { title: 'Thực hiện cuộc gọi', content: 'Đưa ra giá trị khách hàng sẽ nhận được và thu thập thông tin đầy đủ', icon: <MakeCallIcon /> },
  { title: 'Gửi thư chào tín dụng', content: 'Nhân viên tư vấn của FINA sẽ gửi bản thư chào tín dụng cho khách hàng', icon: <SendLetterCreditSvg /> },
  { title: 'Banker tiếp nhận yêu cầu', content: 'Banker thực hiện kiểm tra thông tin khách hàng và phản hồi lại cho FINA', icon: <BankerReceivesRequestIcon /> },
  { title: 'Tư vấn khách hàng chọn bank', content: 'Tư vấn khách hàng lựa chọn các ngân hàng đã tiếp nhận', icon: <CustomerConsultingChooseBankIcon /> },
  { title: 'Tạo hồ sơ vay', content: 'Tạo và theo dõi quy trình xử lý hồ sơ vay tại ngân hàng', icon: <CreateLoanApplicationIcon /> },
  { title: 'Thông báo kết Quả', content: 'Gửi thư chúc mừng khách hàng được duyệt và giải ngân thành công', icon: <ResultAnnouncementIcon /> },
];
