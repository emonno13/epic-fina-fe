import { getStepByDealInsuranceStatus } from './health-insurance/health-insurance-staff-schema-detail';

export const appendStepContent = (steps, statusHistories) => {
  const newSteps: any[] = [];
  for (let i  = 0; i < steps.length; ++i) {
    const historyStep = statusHistories?.find(history => history?.status === steps[i]);
    newSteps.push({
      name: getStepByDealInsuranceStatus[steps[i]]?.name,
      value: steps[i],
      status: historyStep?.status,
      updatedAt: historyStep?.updatedAt,
      icon: getStepByDealInsuranceStatus[steps[i]]?.icon,
    });
  }
  return newSteps;
};
