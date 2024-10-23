import { useState } from 'react';

import { notification, Tabs } from 'antd';

import { LoanProductCommissionSettingReceiveSchemaForm } from './commission-receive/detail-schema-form';
import { LoanProductCommissionSettingTableSchema } from './commission-receive/search-result-table-schema';
import { LoanProductCommissionSettingSpendTableSchema } from './commission-spend/search-result-table-schema';
import { LoanProductCommissionSettingSpendSchemaForm } from './commission-spend/detail-schema-form';
import { CommissionHistoryTimelineViewer } from './commission-history/commission-history-timeline';
import { useHTranslation } from '../../../../../../lib/i18n';
import { HFeature, HTable } from '../../../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../../../schema-form/features/search-form';
import { HDocumentDrawerPanel } from '../../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../../schema-form/features/forms/h-feature-form';
import { FooterControls } from '../../../../../../schema-form/features/panels/popover-footer-controls';
import { useDocumentDetail } from '../../../../../../schema-form/features/hooks';

const { TabPane } = Tabs;

const CommissionDetailViewer = ({ type = '' }) => {
  const { t } = useHTranslation('admin-common');
  const [footer, setFooter] = useState(<FooterControls/>);
  const commissionSetting = useDocumentDetail();

  const handleBeforeSubmit = (form: any) => {
    const formulaSetting = form.getFieldValue('formula');
    const greaterThanRateInfo: any = formulaSetting.greaterThanRateInfo;
    const lessThanRateInfo: any = formulaSetting.lessThanRateInfo;

    let totalPercentWithGreaterThanRate = (+greaterThanRateInfo?.source || 0) + (+greaterThanRateInfo?.handlingStaff || 0);
    let totalPercentWithLessThanRate = (+lessThanRateInfo?.source || 0) + (+lessThanRateInfo?.handlingStaff || 0);

    if (greaterThanRateInfo?.receivers?.length) {
      totalPercentWithGreaterThanRate += greaterThanRateInfo?.receivers
        ?.map(item => +item?.commissionPercent || 0)
        ?.reduce((accumulator, current) => {
          return accumulator + current;
        });
    }

    if (lessThanRateInfo?.receivers?.length) {
      totalPercentWithLessThanRate += lessThanRateInfo?.receivers
        ?.map(item => +item?.commissionPercent || 0)
        ?.reduce((accumulator, current) => {
          return accumulator + current;
        });
    }

    if (totalPercentWithGreaterThanRate > 100 || totalPercentWithLessThanRate > 100) {
      notification.error({ message: 'Tổng phần trăm chi cho các đối tượng không được lớn hơn 100%' });
      return false;
    }

    return true;
  };

  return (
    <HDocumentDrawerPanel title={t(!commissionSetting?.id ? 'Thêm mới' : 'Chỉnh sửa')} footer={footer}>
      <Tabs onTabClick={(e) => {if (e === 'history_change') setFooter(<></>); else setFooter(<FooterControls />);}}>
        <TabPane tab={t('Thông tin cài đặt')} key={'setting_info'}>
          <HFeatureForm {...{
            schema: () => type === 'receive' ? LoanProductCommissionSettingReceiveSchemaForm() : LoanProductCommissionSettingSpendSchemaForm(),
            hiddenValues: { type },
            hideSubmitAndContinueButton: true,
            beforeSubmit: handleBeforeSubmit,
            withRelations: ['createdBy', 'updatedBy'],
            resetIfSuccess: false,
          }}/>
        </TabPane>

        <TabPane tab={t('Lịch sử thay đổi')} key={'history_change'}>
          <CommissionHistoryTimelineViewer type={type} />
        </TabPane>
      </Tabs>
    </HDocumentDrawerPanel>
  );
};

const CommissionTabViewer = ({ type = '', featureId = '', documentIdName = '', ...props }) => {
  return (
    <HFeature
      {...{
        featureId: featureId || 'commission-settings',
        documentIdName: documentIdName || 'commissionSettingId',
        nodeName: 'commission-settings',
        documentRelations: ['createdBy', 'updatedBy'],
      }}>
      <HSearchFormWithCreateButton withRelations={['category', 'createdBy', 'updatedBy']} hiddenFields={{ type }}/>

      <CommissionDetailViewer type={type}/>

      <HTable schema={type === 'receive' ? LoanProductCommissionSettingTableSchema : LoanProductCommissionSettingSpendTableSchema}/>
    </HFeature>
  );
};

export default () => {
  const { t } = useHTranslation('admin-common');
  return (
    <Tabs>
      <TabPane tab={t('Hoa hồng FINA nhận')} key={'fina_receive'}>
        <CommissionTabViewer type={'receive'} featureId={'commissionReceive'} documentIdName={'receiveId'}/>
      </TabPane>
      <TabPane tab={t('Hoa hồng FINA trả')} key={'fina_spend'}>
        <CommissionTabViewer type={'spend'} featureId={'commissionSpend'} documentIdName={'spendId'}/>
      </TabPane>
    </Tabs>
  );
};
