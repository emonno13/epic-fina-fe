import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import {
  TASK_RESPONSE_STATUS,
  TASK_STATUSES,
  TASK_STATUSES_ASSIGNED,
  TASK_TYPES,
} from 'constants/crm/task';
import { PRODUCT_TYPES } from 'types/organization';

export const TASK_TYPE = {
  call: 'call',
  counselling: 'counselling',
  CLAIM_INSURANCE: 'claim_insurance',
  BOND: 'BOND',
  FUND: 'FUND',
  INSURANCE: 'INSURANCE',
  REAL_ESTATE: 'REAL_ESTATE',
};

export const TASK_PRODUCT_TYPES = {
  loan: 'loan',
  insurances: 'insurances',
  investment: 'investment',
  real_estate: 'real_estate',
  financial_planning: 'financial_planning',
  other: 'other',
};

export const PRODUCT_TYPES_MIGRATION_MAPPING = {
  [TASK_PRODUCT_TYPES.loan]: PRODUCT_TYPES.loan,
  [TASK_PRODUCT_TYPES.insurances]: PRODUCT_TYPES.insurance,
  [TASK_PRODUCT_TYPES.investment]: PRODUCT_TYPES.investment,
  [TASK_PRODUCT_TYPES.real_estate]: PRODUCT_TYPES.real_estate,
};

export const PRODUCT_TYPES_LABEL_MAPPING = {
  [PRODUCT_TYPES.loan]: TASK_PRODUCT_TYPES.loan,
  [PRODUCT_TYPES.insurance]: TASK_PRODUCT_TYPES.insurances,
  [PRODUCT_TYPES.investment]: TASK_PRODUCT_TYPES.investment,
  [PRODUCT_TYPES.real_estate]: TASK_PRODUCT_TYPES.real_estate,
};

export const SURVEY_RESULT_CODE = {
  QUESTION_LPC_LOAN_DEMAND: 'QUESTION_LPC_LOAN_DEMAND',
};

export const SURVEY_RESULT_FIELD_MAPPING = {
  [SURVEY_RESULT_CODE.QUESTION_LPC_LOAN_DEMAND]: 'loanMoney',
};

export const mapSurveyResultsToField = (surveyDetails: any[]) => {
  const surveyResultContent = {};
  surveyDetails.forEach((el) => {
    surveyResultContent[SURVEY_RESULT_FIELD_MAPPING[el.questionData.code]] =
      el?.content || undefined;
  });
  return surveyResultContent;
};

export const newMappingStatusOfTask = ({ t, status, statusAssign }) => {
  let label = '_';
  if (status === TASK_STATUSES.CREATED) {
    label = t('Ghi nhận', { vn: 'Ghi nhận', en: 'receive' });
  }

  if (status === TASK_STATUSES.DONE) {
    label = t('Đóng yêu cầu tư vấn', {
      vn: 'Đóng yêu cầu tư vấn',
      en: 'Close consultation request',
    });
  }

  if (status === TASK_STATUSES.ASSIGNED) {
    label = t('Thu thập thông tin');
  }

  if (status === TASK_STATUSES.CONSULTED) {
    if (statusAssign === TASK_STATUSES_ASSIGNED.NOT_PROCESSING) {
      label = t('Đã gửi thư chào tín dụng');
    }
  }

  if (statusAssign === TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL) {
    label = t('Chờ đối tác phản hồi');
  }

  if (statusAssign === TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS) {
    label = t('Có đối tác phản hồi');
  }

  if (statusAssign === TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE) {
    label = t('Quá thời hạn phản hồi');
  }

  if (statusAssign === TASK_STATUSES_ASSIGNED.CREATE_PROFILE) {
    label = t('Tạo hồ sơ vay');
  }

  return label;
};

export const mappingStatusOfTask = ({ t, status, statusAssign }) => {
  let label = status;
  if (status === TASK_STATUSES.CREATED) {
    label = t('Ghi nhận', { vn: 'Ghi nhận', en: 'receive' });
  }

  if (status === TASK_STATUSES.DONE) {
    label = t('Đóng yêu cầu tư vấn', {
      vn: 'Đóng yêu cầu tư vấn',
      en: 'Close consultation request',
    });
  }

  if (status === TASK_STATUSES.ASSIGNED) {
    label = t('Thu thập thông tin');
  }

  if (status === TASK_STATUSES.CONSULTED) {
    if (statusAssign === TASK_STATUSES_ASSIGNED.NOT_PROCESSING) {
      label = t('Đã gửi thư chào tín dụng');
    }

    if (statusAssign === TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL) {
      label = t('Chờ đối tác phản hồi');
    }

    if (statusAssign === TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS) {
      label = t('Có đối tác phản hồi');
    }

    if (statusAssign === TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE) {
      label = t('Quá thời hạn phản hồi');
    }

    if (statusAssign === TASK_STATUSES_ASSIGNED.CREATE_PROFILE) {
      label = t('Tạo hồ sơ vay');
    }
  }

  return label;
};

export const getDocumentsByDocumentTemplateCode = async (code) => {
  let documents = [];
  await FormUtils.submitForm(
    {},
    {
      method: 'get',
      endpoint: endpoints.generateNodeEndpoint('/documents'),
      hiddenValues: {
        filter: {
          where: {
            code: { like: `${code}.*` },
          },
        },
      },
      onGotSuccess: (value) => {
        documents = value.data;
      },
    },
  );

  return documents;
};

export interface ITabForTask {
  tab?: string;
  key?: string | number;
  featureId?: string;
  status?: string | object;
  statusAssign?: string | object;
}
export const mappingPropsTabForTasks = (tab: string): ITabForTask => {
  switch (tab) {
    case 'All':
      return {
        tab: 'All',
        key: 'all',
        featureId: 'task-all',
        status: { nin: [TASK_STATUSES.DELETED] },
      };
    case TASK_STATUSES.CREATED:
      return {
        tab: 'Task created',
        key: TASK_STATUSES.CREATED,
        featureId: 'task-created',
        status: TASK_STATUSES.CREATED,
      };
    case TASK_STATUSES.ASSIGNED:
      return {
        tab: 'Collect information',
        key: TASK_STATUSES.ASSIGNED,
        featureId: 'task-assigned',
        status: TASK_STATUSES.ASSIGNED,
        statusAssign: TASK_STATUSES_ASSIGNED.NOT_PROCESSING,
      };
    case TASK_STATUSES.CONSULTED:
      return {
        tab: 'Consulted',
        key: TASK_STATUSES.CONSULTED,
        featureId: 'consulted',
        status: TASK_STATUSES.CONSULTED,
        statusAssign: TASK_STATUSES_ASSIGNED.NOT_PROCESSING,
      };
    case TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL:
      return {
        tab: 'Waiting for bank approval',
        key: TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL,
        featureId: 'waiting_for_bank_approval',
        status: TASK_STATUSES.CONSULTED,
        statusAssign: TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL,
      };
    case TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE:
      return {
        tab: 'Overdue for bank response',
        key: TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE,
        featureId: 'overdue_for_bank_response',
        status: TASK_STATUSES.CONSULTED,
        statusAssign: TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE,
      };
    case TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS:
      return {
        tab: 'Waiting for bank process',
        key: TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS,
        featureId: 'waiting_for_bank_process',
        status: TASK_STATUSES.CONSULTED,
        statusAssign: TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS,
      };
    case TASK_STATUSES_ASSIGNED.CREATE_PROFILE:
      return {
        tab: 'Create profile',
        key: TASK_STATUSES_ASSIGNED.CREATE_PROFILE,
        featureId: 'create_profile',
        status: TASK_STATUSES.CONSULTED,
        statusAssign: TASK_STATUSES_ASSIGNED.CREATE_PROFILE,
      };
    case TASK_STATUSES.DONE:
      return {
        tab: 'Close task',
        key: TASK_STATUSES.DONE,
        featureId: 'task-done',
        status: TASK_STATUSES.DONE,
      };
    case TASK_TYPES.DEAL_PROCESSING_TASK:
      return {
        tab: 'Tất cả',
        key: TASK_TYPES.DEAL_PROCESSING_TASK,
      };
    case TASK_RESPONSE_STATUS.WAITING_TO_RECEIVE:
      return {
        tab: 'Chờ tiếp nhận',
        key: TASK_RESPONSE_STATUS.WAITING_TO_RECEIVE,
      };
    case TASK_RESPONSE_STATUS.RECEIVED:
      return {
        tab: 'Đã phản hồi',
        key: TASK_RESPONSE_STATUS.RECEIVED,
      };
    case TASK_RESPONSE_STATUS.REJECT:
      return {
        tab: 'Đã từ chối',
        key: TASK_RESPONSE_STATUS.REJECT,
      };
    default:
      return {};
  }
};
