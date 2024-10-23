import { EditLoanWithTabPanel } from './edit-deal-loan';
import { HDocumentDrawerPanel } from '../../../../../../schema-form/features/panels';

import './deal-loan-detail.module.scss';

export const LoanDetail = () => {
  return (
    <HDocumentDrawerPanel className="deal-loan-detail" destroyOnClose={true} footer={null}>
      <EditLoanWithTabPanel/>
    </HDocumentDrawerPanel>
  );
};
