import { Col, Row, Tabs } from 'antd';
import { ContainerOutlined, FileOutlined, SettingOutlined } from '@ant-design/icons';

import { ProductDetailsSchema } from './tab-applied-banks';
import { LoanInformationTab } from './tab-loan-information';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import { useHTranslation } from '../../../../../lib/i18n';
import { HSubForm } from '../../../../../schema-form/h-form';
import { FinaLoanStepsSettingSchemaForm } from '../../../finance/categories/settings/fina-loan-steps-setting-schema-form';
import { PartnerLoanStepsSettingSchemaForm } from '../../../finance/categories/settings/partner-loan-steps-setting-schema-form';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../schema-form/h-types';

const { TabPane } = Tabs;

export const TabLabel = ({ Icon, label }) => (<><Icon/> {label} </>);

export const ProductSettingSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const documentDetail = useDocumentDetail();

  if (!documentDetail.settings && documentDetail.category?.settings) {
    documentDetail.settings = documentDetail.category?.settings;
  }

  return [
    createSchemaItem({
      Component: () => (
        <Row gutter={24}>
          <Col md={24} lg={12}>
            <HSubForm schema={() => [...FinaLoanStepsSettingSchemaForm(props)]}/>
          </Col>
          <Col md={24} lg={12}>
            <HSubForm schema={() => [...PartnerLoanStepsSettingSchemaForm(props)]}/>
          </Col>
        </Row>
      ),
    }),
  ];
};

export const LoanProductViewTabs = (props: any) => {
  const documentDetail = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  return (
    <Tabs hideAdd type="editable-card">
      <TabPane
        key={'info'}
        {...{
          tab: <TabLabel Icon={ContainerOutlined} label={t('Loan Information')}/>,
          closable: false,
        }}>
        <LoanInformationTab/>
      </TabPane>
      <TabPane
        key={'Loans'}
        {...{
          tab: <TabLabel Icon={FileOutlined} label={t('Loans')}/>,
          closable: false,
          disabled: !documentDetail,
        }}
      >
        <ProductDetailsSchema/>
      </TabPane>
      <TabPane
        key={'settings'}
        {...{
          tab: <TabLabel Icon={SettingOutlined} label={t('Cài đặt thời gian xử lý hồ sơ')}/>,
          closable: false,
          disabled: !documentDetail,
        }}
      >
        <HFeatureForm {...{
          schema: ProductSettingSchemaForm,
          resetIfSuccess: false,
          showResetButton: false,
          hideControlButton: false,
          hideSubmitAndContinueButton: false,
        }}/>
      </TabPane>
    </Tabs>
  );
};
