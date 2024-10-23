import { BASE_QUESTION_CODE } from '@components/shared/questions/question/types';
import { ConverterUtils } from '@lib/converter';
import { ElementSurveyResult } from './index';

export const questionResultOfPlan = [
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_LOAN_DEMAND,
    addon: 'VND',
    text: 'Số tiền muốn vay:',
    methodFormat: ConverterUtils.formatNumber,
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_EVALUATE_PLAN,
    text: 'Phương án vay:',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_BORROWED_TIME,
    addon: 'năm',
    text: 'Thời gian vay: ',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_EVALUATE_MORTAGE,
    text: 'Tài sản thế chấp',
  },
];
export const questionResultOfRequirement = [
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_TIME_DISBURSE,
    addon: 'ngày/tháng',
    text: 'Thời điểm giải ngân mong muốn: Trong vòng',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_RATE,
    addon: '%',
    text: 'Lãi suất mong muốn:',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_PROPERTY_VALUATION,
    text: 'Định giá tài sản:',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_LOAN_EXPENSE,
    text: 'Thông tin chi tiết khác:',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_OTHER_REQUIREMENTS,
    text: 'Các yêu cầu khác:',
  },
];
export const questionResultOfAsset = [
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_LOAN_RELATIONSHIP,
    text: 'Quan hệ giữa người vay và chủ tài sản:',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_ACCUMULATED_ASETS,
    text: 'Tài sản tích lũy:',
  },
];
export const questionResultOfAdditionalInfo = (surveyResult) => [
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_MARITAL_STATUS,
    text: 'Tình trạng hôn nhân:',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_SOURCE_INCOME,
    addon: 'VND',
    text: 'Nguồn thu:',
    methodFormat: ConverterUtils.formatNumber,
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_COST_PER_MONTH,
    addon: 'tháng',
    text: 'Chi phí ước tính hàng tháng:',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_INCOME,
    addon: 'VND',
    text: 'Thu nhập hàng tháng (sau thuế):',
    methodFormat: ConverterUtils.formatNumber,
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_CREDIT_HISTORY,
    addon: 'VND',
    text: 'Chi tiết lịch sử tín dụng:',
    methodFormat: ConverterUtils.formatNumber,
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_BOROWER_AGE,
    text: 'Tuổi người vay:',
    addon: 'tuổi',
  },
  { code: BASE_QUESTION_CODE.QUESTION_LC_HISTORY, text: 'Lịch sử tín dụng:' },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_CUSTOMER_OUTSTANDING,
    text: 'Dư nợ khách hàng hiện tại:',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_PROPERTY_OWNER_AGE,
    text: 'Tuổi chủ tài sản:',
    addon: 'tuổi',
  },
  {
    code: BASE_QUESTION_CODE.QUESTION_LC_LOAN_RELATIONSHIP,
    children: (
      <ul>
        {questionResultOfAsset.map(({ code, text }) => (
          <ElementSurveyResult
            key={code}
            {...{
              surveyResult,
              code,
              text,
            }}
          />
        ))}
      </ul>
    ),
  },
];
