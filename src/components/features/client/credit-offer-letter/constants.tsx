export const getCreditOfferLetterPlanInfoGenerateArray = () => {
  return [
    {
      label: 'Nhu cầu vay',
      value: 'Số tiền',
    },
    {
      label: 'Phương án vay',
      value: 'Mua BĐS/xây dựng/tiêu dùng/sản xuất kinh doanh…',
    },
    {
      label: 'Lịch sử tín dụng',
      value: 'Không có nợ quá hạn/đã từng có nợ quá hạn nhóm…',
    },
    {
      label: 'Nguồn thu',
      value: 'Liệt kê nguồn thu',
    },
    {
      label: 'Tài sản tích lũy',
      value: 'Loại hình tài sản, giấy tờ pháp lý',
    },
    {
      label: 'Thời gian vay và trả nợ dự kiến',
      value: 'Thời gian vay và trả nợ dự kiến',
    },
  ];
};

export const getCreditOfferLetterEvaluateGenerateArray = () => {
  return [
    {
      label: 'Phương án',
      value: 'Cần hỗ trợ/không cần hỗ trợ',
    },
    {
      label: 'Nguồn thu',
      value: 'Chứng minh được/không chứng minh được Đặc điểm',
    },
    {
      label: 'Loại hình tài sản thế chấp',
      value: 'Đặc điểm, cấu trúc bình thường hay không bình thường',
    },
    {
      label: 'Lịch sử tín dụng',
      value: 'Đáp ứng/không đáp ứng tiêu chuẩn chung. Đặc thù hay không đặc thù',
    },
    {
      label: 'Độ tuổi vay vốn và độ tuổi chủ tài sản',
      value: 'Đáp ứng thời gian vay/không đáp ứng.',
    },
  ];
};

export const getCreditOfferLetterProvideGenerateArray = () => {
  return [
    'Đề nghị mức lãi suất tốt nhất từ phía ngân hàng',
    'Hỗ trợ xử lý hồ sơ ưu tiên',
    'Đàm phán về việc đồng ý trình hồ sơ vay với các nội dung ngoại lệ/khác biệt.',
    'Hỗ trợ xử lý các nội dung cụ thể khác (trao đổi qua điện thoại các nội dung không liệt kê bằng văn bản).',
    'Các dịch vụ đi kèm (công chứng tại chỗ/ứng vốn/ra giấy nhanh…) các dịch vụ có thể triển khai được trong thời gian sắp tới.',
  ];
};

export const KEY_TO_SCROLL = {
  INTRO: 'intro',
  WELCOME: 'welcome',
  PLAN: 'plan',
  CALCULATION: 'calculation',
  POLICY_AND_CONDITION: 'policy-and-condition',
  COMPARE_PRODUCT: 'compare-product',
  FLOW: 'flow',
  NEXT_STEP: 'next-step',
  INTRODUCE_FINA: 'introduce-fina',
  POLICY: 'policy',
};
