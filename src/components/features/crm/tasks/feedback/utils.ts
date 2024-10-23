import { RESPONSE_STATUS_SEEN_BY_FINA_STAFF } from 'constants/crm/task';

const ROOT_ORG_POSITION = 2;

export const isRecordDisable = (data: { record, orgPathsSelected, selectedRowKeys }) => {
  const { record = {}, orgPathsSelected = [], selectedRowKeys = [] } = data;
  const orgIidRoots = [...new Set(orgPathsSelected.map(el => el?.split(',')[ROOT_ORG_POSITION] || ''))];
  let isDisable = record?.responseStatus !== RESPONSE_STATUS_SEEN_BY_FINA_STAFF.RECEIVED;
  const orgPaths = record?.partner?.orgPaths || '';
  if (isDisable || !selectedRowKeys.length) {
    return isDisable;
  }

  for (const orgIidRoot of orgIidRoots) {
    if (orgPaths.includes(orgIidRoot)) {
      isDisable = orgPaths.includes(orgIidRoot);
      break;
    }
  }
  if (selectedRowKeys.map(el => el.id).includes(record.id) && isDisable) {
    isDisable = false;
  }

  return isDisable;
};

export const unCheckedFeedBacksSameOrg = (feedbacks) => {
  const uniqueFeedbackByRootOrg: string[] = [];
  const rootOrgsOfFeedback: string[] = [];
  for (const feedback of feedbacks) {
    const rootOrg = feedback?.partner?.orgPaths?.split(',')[ROOT_ORG_POSITION] || '';
    if (rootOrgsOfFeedback.includes(rootOrg)) {
      continue;
    }

    rootOrgsOfFeedback.push(rootOrg);
    uniqueFeedbackByRootOrg.push(feedback);
  }
  return [...new Set(uniqueFeedbackByRootOrg)];
}; 
