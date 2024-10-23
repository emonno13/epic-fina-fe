import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Tabs } from 'antd';
import { TabPane } from 'rc-tabs';
import * as XLSX from 'xlsx';
import { DownloadOutlined } from '@ant-design/icons';

import { ProductDetailSchemaForm } from './product-detail-schema-form';
import { HistoryTimelineViewer } from './history-timeline/history-timeline';
import { ProductDetailCommissionSetting } from './commission-setting/commission-setting';
import { ProductCommissionHistoryTimelineViewer } from './commission-history/proudct-commission-history-timeline';
import { FooterControls } from '../../../../../../schema-form/features/panels/popover-footer-controls';
import { HFeatureForm } from '../../../../../../schema-form/features/forms/h-feature-form';
import { ADMIN_PERMISSIONS } from '../../../../../shared/accessibility/constant';
import { HDocumentModalPanel } from '../../../../../../schema-form/features/panels';
import { useHTranslation } from '../../../../../../lib/i18n';
import { useDocumentDetail } from '../../../../../../schema-form/features/hooks';
import { LOAN_STATUS } from '../../utils';
import { HButton, HButtonProps } from '../../../../../shared/common-form-elements/h-confirmation-button';
import { ConverterUtils } from '../../../../../../lib/converter';
import { usePermissions } from '../../../../../../lib/providers/auth';

const exportHeaderFieldsMapping = {
  partner: 'Tổ chức tài chính',
  productDetailCode: 'Mã khoản vay',
  productDetailName: 'Tên khoản vay',
  preferentialTime: 'Thời gian ưu đãi (tháng)',
  preferentialRate: 'Lãi suất ưu đãi (%)',
  afterPreferentialRate: 'Lãi suất sau ưu đãi (%)',
  preferentialReference: 'Lãi suất tham chiếu (%)',
  amplitude: 'Biên độ (%)',
  createdBy: 'Tạo bởi',
  createdAt: 'Thời gian tạo',
  updatedBy: 'Cập nhật bởi',
  updatedAt: 'Thời gian cập nhật',
};

const ExportButtonInterestRateHistory = (props: HButtonProps) => {
  const { t } = useTranslation('common');
  const productDetail = useDocumentDetail();

  const handleExport = () => {
    const fileName = '[FINA] Interest rate history.xlsx';
    const dataExport: any[] = [];
    const histories = productDetail.interestRateHistories || [];

    histories.push(productDetail);

    dataExport.push(
      ...histories.map((item: any) => ({
        [exportHeaderFieldsMapping.partner]: productDetail?.org?.name || '',
        [exportHeaderFieldsMapping.productDetailCode]: item?.code || '',
        [exportHeaderFieldsMapping.productDetailName]: item?.name || '',
        [exportHeaderFieldsMapping.preferentialTime]: item?.info?.preferentialTime || 0,
        [exportHeaderFieldsMapping.preferentialRate]: item?.info?.preferentialRate || 0,
        [exportHeaderFieldsMapping.afterPreferentialRate]: item?.info?.afterPreferentialRate || 0,
        [exportHeaderFieldsMapping.preferentialReference]: item?.info?.preferentialReference || 0,
        [exportHeaderFieldsMapping.amplitude]: item?.info?.amplitude || 0,
        [exportHeaderFieldsMapping.createdBy]: item?.createdBy?.fullName || `${item?.createdBy?.lastName || ''} ${item?.createdBy?.firstName || ''}`,
        [exportHeaderFieldsMapping.createdAt]: ConverterUtils.dateFormatter(item.createdAt, 'DD/MM/YYYY'),
        [exportHeaderFieldsMapping.updatedBy]: item?.updatedBy?.fullName || `${item?.updatedBy?.lastName || ''} ${item?.updatedBy?.firstName || ''}`,
        [exportHeaderFieldsMapping.updatedAt]: ConverterUtils.dateFormatter(item.updatedAt, 'DD/MM/YYYY'),
      })),
    );

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Interest rate history');

    XLSX.writeFile(wb, fileName);
  };

  return (
    <HButton {...{
      ...props,
      className: 'control-btn m-r-10',
      onClick: handleExport,
      icon: <DownloadOutlined/>,
    }}>
      {t('Export')}
    </HButton>
  );
};


export const ProductDetailViewer = (props: any) => {
  const { t } = useHTranslation('admin-common');
  const [currentTab, setCurrentTab] = useState('product_detail');

  const productDetail = useDocumentDetail();
  const product = props?.product || productDetail?.product;

  if (!product || !product?.id) {
    return <span/>;
  }

  const initialValues = {
    documentTemplateId: product?.documentTemplateId,
    status: LOAN_STATUS.ACTIVE,
  };
  const handleTabChange = (tabName: string) => {
    // setCurrentTab(tabName);
  };

  const permissions = [ADMIN_PERMISSIONS.SITE_OWNER, ADMIN_PERMISSIONS.SUPPER_ADMIN, ADMIN_PERMISSIONS.ADMIN];
  const visibleCommissionTab = usePermissions(permissions);

  return (
    <HDocumentModalPanel
      width={'80%'}
      style={{ top: '15px' }}
      footer={<FooterControls customButton={currentTab === 'interest_rate_history' ? <ExportButtonInterestRateHistory /> : <span/>}/>}
    >
      <Tabs onTabClick={handleTabChange}>
        <TabPane tab={t('Chi tiết khoản vay')} key={'product_detail'}>
          <HFeatureForm {...{
            schema: (ProductDetailSchemaForm),
            hiddenValues: {
              productId: product?.id,
              categoryId: product?.categoryId,
            },
            initialValues,
          }}/>
        </TabPane>

        {productDetail?.id && (
          <>
            <TabPane tab={t('Lịch sử thay đổi lãi suất')} key={'interest_rate_history'}>
              <HistoryTimelineViewer documentDetailHistoryProperty={'interestRateHistories'}/>
            </TabPane>

            {visibleCommissionTab && (
              <>
                <TabPane tab={t('Cài đặt hoa hồng')} key={'commission_setting'} forceRender={false}>
                  <ProductDetailCommissionSetting/>
                </TabPane>

                <TabPane tab={t('Lịch sử thay đổi hoa hồng')} key={'commission_setting_history'} forceRender={false}>
                  <ProductCommissionHistoryTimelineViewer />
                </TabPane>
              </>
            )}
          </>
        )}
      </Tabs>
    </HDocumentModalPanel>
  );
};
