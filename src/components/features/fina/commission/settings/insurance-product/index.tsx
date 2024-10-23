import { useState } from 'react';

import { Tabs } from 'antd';

import { InsuranceProductCommissionSettingTableSchema } from './search-result-table-schema';
import { InsuranceProductCommissionSettingSchemaForm } from './detail-schema-form';
import { InsurancesCommissionHistoryTimelineViewer } from './commission-history/commission-history-timeline';
import { useHTranslation } from '../../../../../../lib/i18n';
import { HFeature, HTable } from '../../../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../../../schema-form/features/search-form';
import { HDocumentDrawerPanel } from '../../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../../schema-form/features/forms/h-feature-form';
import { FooterControls } from '../../../../../../schema-form/features/panels/popover-footer-controls';
import { COMMISSION_SETTING_TYPES } from '../loan-product/constant';

const { TabPane } = Tabs;

export default () => {
  const { t } = useHTranslation('admin-common');
  const [footer, setFooter] = useState(<FooterControls/>);

  const handleBeforeSubmit = (form: any) => {
    const formulaSetting = form.getFieldValue('formula');

    console.log('form: ', form);

    // if (totalPercentWithGreaterThanRate > 100 || totalPercentWithLessThanRate > 100) {
    // 	notification.error({message: 'Tổng phần trăm chi cho các đối tượng không được lớn hơn 100%'});
    // 	return false;
    // }

    return true;
  };

  return (
    <HFeature
      {...{
        featureId: 'insuranceCommissionSettings',
        documentIdName: 'insuranceCommissionSettingId',
        nodeName: 'commission-settings',
        documentRelations: ['createdBy', 'updatedBy'],
      }}>
      <HSearchFormWithCreateButton withRelations={['category', 'createdBy', 'updatedBy']} hiddenFields={{ type: COMMISSION_SETTING_TYPES.INSURANCES }} />
      <HDocumentDrawerPanel title={t('Thêm mới')} footer={footer}>
        <Tabs onTabClick={(e) => {if (e === 'history_change') setFooter(<></>); else setFooter(<FooterControls />);}}>
          <TabPane tab={t('Thông tin cài đặt')} key={'setting_info'}>
            <HFeatureForm {...{
              schema: () => InsuranceProductCommissionSettingSchemaForm(),
              hideSubmitAndContinueButton: true,
              hiddenValues: { type: COMMISSION_SETTING_TYPES.INSURANCES },
              beforeSubmit: handleBeforeSubmit,
              withRelations: ['createdBy', 'updatedBy'],
            }}/>
          </TabPane>

          <TabPane tab={t('Lịch sử thay đổi')} key={'history_change'}>
            <InsurancesCommissionHistoryTimelineViewer />
          </TabPane>
        </Tabs>
      </HDocumentDrawerPanel>
      <HTable schema={InsuranceProductCommissionSettingTableSchema}/>
    </HFeature>
  );
};
