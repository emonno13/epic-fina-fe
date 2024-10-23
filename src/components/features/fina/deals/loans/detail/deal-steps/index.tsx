import React from 'react';
import { Steps } from 'antd';
import { WaitProcessIcon, ProcessIcon, BankIcon, AppraisalProgressIcon, ReceivedIcon,
  LendApprovalIcon, TripartiteBlockadeIcon, DisbursingIcon, DisbursedIcon } from 'icons';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { DEAL_DETAIL_STATUSES, DEAL_STATUSES } from '../../../utils';

import './deal-step.module.scss';

const { Step } = Steps;

export const RenderDealSteps = (props: any) => {
  const { t } = useHTranslation('admin-common');
  const {
    currentStep = 0, 
    steps = [], 
    getIcon = MapIconBySteps,
    dealDetail,
  } = props;
  let width = 0, height = 0;
  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  }
	
  return (
    <div className={'deal-steps'}>
      <Steps 
        current={+currentStep} 
        labelPlacement={'vertical'} 
        size={'small'}
        direction={width < 768 ? 'vertical' : 'horizontal'}
      >
        {steps.map((step, index) => (
          <Step key={`${step}-${index}`} {...{
            icon: getIcon(step?.value),
            title:
							<div>
							  <div>{t(step?.name)}</div>
							  <div className={'time-updatedAt'}>{ConverterUtils.dateConverterToString(step?.updatedAt)}</div>
							</div>,
            status: dealDetail?.subStatus ? 'error' : step?.status,
            disabled: step?.disable || false,
          }} />
        ))}
      </Steps>
    </div>
  );
};

export const MapIconBySteps = (steps) => {
  switch (steps) {
    case DEAL_STATUSES.WAIT_PROCESSING:
      return <WaitProcessIcon />;
    case DEAL_STATUSES.PROCESSING:
      return <ProcessIcon />;
    case DEAL_STATUSES.MOVED_TO_FINANCIAL_ORGANIZATION:
      return <BankIcon />;
    case DEAL_STATUSES.LEND_APPROVAL:
      return <LendApprovalIcon />;
    case DEAL_STATUSES.TRIPARTITE_BLOCKADE:
      return <TripartiteBlockadeIcon />;
    case DEAL_STATUSES.DISBURSING:
      return <DisbursingIcon />;
    case DEAL_STATUSES.DISBURSED:
      return <DisbursedIcon />;
    case DEAL_DETAIL_STATUSES.RECEIVED:
      return <ReceivedIcon />;
    case DEAL_DETAIL_STATUSES.APPRAISAL_PROGRESS:
      return <AppraisalProgressIcon />;
    default:
      return <WaitProcessIcon />;
  }
};
