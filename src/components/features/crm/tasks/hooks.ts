/* eslint-disable react-hooks/exhaustive-deps */
import { TASK_TYPES } from 'constants/crm/task';
import { useContext, useMemo } from 'react';

import { useCurrentUser } from '@lib/providers/auth';
import { ORGANIZATION_TYPES, USER_TYPES } from 'types/organization';
import { TaskManagerContext } from './components';

export const useTaskManagerContext = () => {
  const context = useContext(TaskManagerContext);
  if (context === undefined) {
    throw new Error('Must be inside task manager context');
  }
  return context;
};

export const useVisibleReopenTask = () => {
  const context = useTaskManagerContext();
  return context.visibleReopenTask || false;
};

export const useSetVisibleReopenTask = () => {
  const context = useTaskManagerContext();
  const setVisibleReopenTask = context.setVisibleReopenTask;
  return setVisibleReopenTask;
};

export const useDocumentSelected = () => {
  const context = useTaskManagerContext();
  return context.documentSelected;
};

export const useSetDocumentSelected = () => {
  const context = useTaskManagerContext();
  return context.setDocumentSelected;
};

export const useGetBelongOrgTypeForTask = () => {
  const currentUser = useCurrentUser();
  return useMemo(() => {
    return currentUser.type === USER_TYPES.teller
      ? ORGANIZATION_TYPES.BANK
      : ORGANIZATION_TYPES.SUB_ORG;
  }, [currentUser]);
};

export const useGetTypeForTask = (type?: any) => {
  const currentUser = useCurrentUser();

  const isCollaboratorFina = currentUser.type === USER_TYPES.collaborator;
  const isTeller = currentUser.type === USER_TYPES.teller;
  const renderTab = !isTeller;
  let finalType: any = type;

  return useMemo(() => {
    if (finalType) {
      return { isTeller, isCollaboratorFina, type: finalType, renderTab };
    }

    if (!isTeller) {
      finalType = {
        inq: [
          TASK_TYPES.COUNSELLING,
          TASK_TYPES.INTRODUCE_BUYER,
          TASK_TYPES.WANT_TO_BUY,
          TASK_TYPES.BOND,
          TASK_TYPES.FUND,
          TASK_TYPES.FINANCIAL_PLANNING,
        ],
      };
    }

    if (isCollaboratorFina) {
      type = { inq: [TASK_TYPES.COUNSELLING] };
    }

    return { isTeller, isCollaboratorFina, type: finalType, renderTab };
  }, [isTeller, isCollaboratorFina, finalType]);
};
