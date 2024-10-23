import { DEAL_STATUS } from '@components/features/fina/deals/utils';
import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import HCard from '@components/shared/common/h-card';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { Divider, Tabs } from 'antd';
import { memo } from 'react';
import { useCurrentUser } from '../../../../../../lib/providers/auth';
import { generateTabPanelByBank } from '../../../../fina/deals/loans/detail/edit-deal-loan/loan-detail-generate-tab-pane';

interface DealLoanDetailResultProps {
  dealData?: any;
}

export const DealLoanDetailResult = memo((props: DealLoanDetailResultProps) => {
  const { dealData = {} } = props;
  const { t } = useHTranslation('admin-common');
  const { status, updatedAt } = dealData;
  const currentUser = useCurrentUser();

  return (
    <div className={'deal-loan-detail-result'}>
      <HCard title={'FINA'}>
        <FiledViewer
          label={t('Status', { vn: 'Trạng thái' })}
          value={t(DEAL_STATUS[status]?.name)}
          widthLabel={'90px'}
        />
        <FiledViewer
          label={t('Update', { vn: 'Cập nhật' })}
          value={ConverterUtils.fullDatetimeConverter(updatedAt)}
          widthLabel={'90px'}
        />
      </HCard>

      <Divider />

      <h3 className={'m-b-20'}>{t('Banks', { vn: 'Ngân hàng' })}</h3>
      <Tabs>
        {generateTabPanelByBank({ t, currentUser, document: dealData })}
      </Tabs>
    </div>
  );
});
