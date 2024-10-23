import React from 'react';
import { Col, Row, Tabs } from 'antd';
import { ContainerOutlined, SettingOutlined } from '@ant-design/icons';

import { CategoryDetailSchemaForm } from './detail-schema-form';
import { NewsTableSchema, PositionTableSchema } from './search-result-table-schema';
import { FinaLoanStepsSettingSchemaForm } from './settings/fina-loan-steps-setting-schema-form';
import { PartnerLoanStepsSettingSchemaForm } from './settings/partner-loan-steps-setting-schema-form';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';
import { PRODUCT_TYPES } from '../../../../types/organization';
import { useHTranslation } from '../../../../lib/i18n';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../schema-form/h-types';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';
import { HSubForm } from '../../../../schema-form/h-form';

const { TabPane } = Tabs;

const TabLabel = ({ Icon, label }) => (<><Icon/> {label} </>);

const getTitle = (type) => {
  switch (type) {
    case PRODUCT_TYPES.loan:
      return 'Loan product';
    case PRODUCT_TYPES.insurance:
      return 'Insurance product';
    case PRODUCT_TYPES.investment:
      return 'Investment product';
    case PRODUCT_TYPES.real_estate:
      return 'Real Estate product';
    case PRODUCT_TYPES.news:
      return 'News';
  }
  return '';
};

export const CategoryDetailGroupSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const documentDetail = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  const { hiddenValues } = props;

  return [
    createSchemaItem({
      Component: () => (
        <Tabs>
          <TabPane tab={<span><ContainerOutlined/>{t('Information')}</span>} key={'information'}>
            <HSubForm schema={() => [...CategoryDetailSchemaForm(props)]}/>
          </TabPane>
          {hiddenValues?.type === PRODUCT_TYPES.loan ? <TabPane
            key={'settings'}
            {...{
              tab: <TabLabel Icon={SettingOutlined} label={t('Cài đặt thời gian xử lý hồ sơ')}/>,
              closable: false,
              disabled: !documentDetail,
            }}
          >
            <Row gutter={24}>
              <Col md={24} lg={12}>
                <HSubForm schema={() => [...FinaLoanStepsSettingSchemaForm(props)]}/>
              </Col>
              <Col md={24} lg={12}>
                <HSubForm schema={() => [...PartnerLoanStepsSettingSchemaForm(props)]}/>
              </Col>
            </Row>
          </TabPane> : ''}
        </Tabs>
      ),
    }),
  ];
};

export const CategoryManagement = ({ type, featureId, ...props }) => {
  const { t } = useHTranslation('admin-common');

  return (
    <HFeature
      {...{
        featureId: featureId || 'categories',
        nodeName: 'categories',
        documentIdName: `${featureId}Id`,
      }}>
      <HSearchFormWithCreateButton hiddenFields={{ type }}/>
      <HDocumentModalPanel title={t(getTitle(type))}>
        <HFeatureForm {...{
          schema: CategoryDetailGroupSchemaForm,
          hiddenValues: { type },
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentModalPanel>
      <HTable schema={type === PRODUCT_TYPES?.news ? NewsTableSchema : PositionTableSchema}/>
    </HFeature>
  );
};

const CategoryViewer = () => {
  const { t } = useHTranslation('admin-common');
  return (
    <Tabs>
      <TabPane tab={t('loan_products')} key={PRODUCT_TYPES.loan}>
        <CategoryManagement type={PRODUCT_TYPES.loan} featureId={PRODUCT_TYPES.loan}/>
      </TabPane>
      <TabPane tab={t('insurance_products')} key={PRODUCT_TYPES.insurance}>
        <CategoryManagement type={PRODUCT_TYPES.insurance} featureId={PRODUCT_TYPES.insurance}/>
      </TabPane>
      <TabPane tab={t('investment_products')} key={PRODUCT_TYPES.investment}>
        <CategoryManagement type={PRODUCT_TYPES.investment} featureId={PRODUCT_TYPES.investment}/>
      </TabPane>
      <TabPane tab={t('real_estate_products')} key={PRODUCT_TYPES.real_estate}>
        <CategoryManagement type={PRODUCT_TYPES.real_estate} featureId={PRODUCT_TYPES.real_estate}/>
      </TabPane>
    </Tabs>
  );
};

export default CategoryViewer;
