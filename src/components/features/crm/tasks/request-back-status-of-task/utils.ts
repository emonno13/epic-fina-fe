import { TASK_STATUSES } from '../../../../../constants/crm/task';
import { mappingPropsTabForTasks, mappingStatusOfTask } from '../utils';
import { useHTranslation } from '../../../../../lib/i18n';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { dataTabForStaffRevert } from '../constans';

export const STATUS_REQUEST_BACK_STATUS_OF_TASK = {
  WAIT_PROCESSING: 'wait_processing',
  APPROVE: 'approve',
  REJECT: 'reject',
};

export const optionsBackTaskStatus = (t) => {
  const options: any[] = [];

  for (const item of dataTabForStaffRevert) {
    if (item === TASK_STATUSES.DONE || item === 'All') continue;

    const data: any = mappingPropsTabForTasks(item);
    options.push({
      value: `${data?.status}${data?.statusAssign ? ` ${data.statusAssign}` : ''}`,
      label: t(data?.tab),
    });
  }

  return options;
};

export const useRequestBackStatusOfTaskTabs = () => {
  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();

  return {
    ADMIN: {
      tab: t('Request need process', { vn: 'Yêu cầu cần xử lý' }),
      key: 'REQUEST_NEED_PROCESS',
      permission: 'BACK_STATUS_OF_TASK',
    },
    OWN: {
      tab: t('Own request', { vn: 'Yêu cầu của bản thân' }),
      key: 'OWN_REQUEST',
      hiddenValues: { createdById: currentUser?.id },
    },
  };
};

export const mappingStatusOfRequestBackStatusOfTask = (status) => {
  switch (status) {
    case STATUS_REQUEST_BACK_STATUS_OF_TASK.WAIT_PROCESSING: return { label: 'Chờ xử lý', color: '#36cfc9' };
    case STATUS_REQUEST_BACK_STATUS_OF_TASK.APPROVE: return { label: 'Chấp nhận', color: '#bae637' };
    case STATUS_REQUEST_BACK_STATUS_OF_TASK.REJECT: return { label: 'Từ chối', color: '#ff4d4f' };
    default: return {};
  }
};

export const useGenerateLabelTaskStatus = (document, optionsConverter) => {
  const { t } = useHTranslation('admin-common');
  const newDocument = optionsConverter ? optionsConverter(document) : document;
  const statusOfTask = document.split(' ')?.[0];
  const statusAssignOfTask = document.split(' ')?.[1];
  newDocument.label = mappingStatusOfTask({ t, status: statusOfTask, statusAssign: statusAssignOfTask });
  return newDocument;
};

export const OPTIONS_REQUEST_BACK_STATUS_OF_TASK = Object.values(STATUS_REQUEST_BACK_STATUS_OF_TASK).map(item => {
  return {
    label: mappingStatusOfRequestBackStatusOfTask(item)?.label || '',
    value: item,
  };
});

