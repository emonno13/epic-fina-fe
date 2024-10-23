import { TFunction } from 'next-i18next';

export const PRODUCT_SOURCE = {
  GLOBAL_CARE: 'global-care',
  PVI: 'pvi',
  GOTRUST: 'go-trust',
};

export const QUESTION_PVI_KEY = {
  PVI_ATCD_ONE: 'pvi_atcd_one',
  PVI_ATCD_TWO: 'pvi_atcd_two',
  PVI_ATCD_THREE: 'pvi_atcd_three',
  PVI_ATCD_FOUR: 'pvi_atcd_four',
};

export const QUESTION_PVI = {
  [QUESTION_PVI_KEY.PVI_ATCD_ONE]: '1. Bạn đã từng mắc phải, hoặc được thông báo rằng bạn mắc phải, hoặc đang trong quá trình kiểm tra hoặc điều trị bất kỳ bệnh/ tình trạng nào dưới đây không: - Bệnh tâm thần - Bệnh ung thư - Bệnh phong - Bị tàn tật hoặc thương tật vĩnh viễn từ 50% trở lên?',
  [QUESTION_PVI_KEY.PVI_ATCD_TWO]: '2. Bạn có đang trong quá trình điều trị bệnh tật, thương thật và/ hoặc được bác sĩ theo dõi sức khỏe không?',
  [QUESTION_PVI_KEY.PVI_ATCD_THREE]: '3. Bạn có dự định hay đang trong thời gian chuẩn bị để được làm các xét nghiệm, chẩn đoán y khoa cho các triệu chứng bệnh hay một căn bệnh chưa rõ không?',
  [QUESTION_PVI_KEY.PVI_ATCD_FOUR]: '4. NĐBH đang có nguy cơ lấy nhiễm cao và đang được yêu cầu cách ly tập trung/ tại nhà (thuộc diện F1, F2) do dịch bệnh không?',
};

export const getInsurancePackageOptions = (t: TFunction) => [
  { label: 'Cơ bản - 199.000', value: 199000 },
  { label: 'Nâng cao - 319.000', value: 319000 },
  { label: 'Toàn diện - 599.000', value: 599000 },
];

export const VIEW_CONFIRM_COL_LAYOUT = {
  xs: 24,
  sm: 24,
  md: 12,
};