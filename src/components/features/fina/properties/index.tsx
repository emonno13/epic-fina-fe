import { ContainerOutlined, UploadOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { Row } from 'antd';
import Tabs from 'antd/lib/tabs';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels';
import HSearchForm, {
  CreateButton,
} from '../../../../schema-form/features/search-form';
import {
  HButton,
  HButtonProps,
} from '../../../shared/common-form-elements/h-confirmation-button';
import { PROPERTIES_STATUS } from './contansr';
import { RealEstateProductTableSchema } from './search-result-table-schema';
import { PropertiesAdvanceSearch } from './search.schema-form';
import { RealEstateDetailSchemaForm } from './view-detail-schema-form';

const { TabPane } = Tabs;

export const ImportButton = memo((props: HButtonProps) => {
  const { t } = useTranslation('common');
  const { push } = useRouter();
  const handleCreateNewDocument = () => {
    push('/admin/products/properties/import');
  };
  return (
    <HButton
      {...{
        ...props,
        size: 'large',
        shape: 'round',
        className: 'control-btn m-l-10',
        onClick: handleCreateNewDocument,
        icon: <UploadOutlined />,
      }}
    >
      {t('Import')}
    </HButton>
  );
});

export const ViewRealEstateDetail = () => {
  const { t } = useHTranslation('admin-common');
  return (
    <Tabs>
      <TabPane
        tab={
          <span>
            <ContainerOutlined />
            {t('Properties Information', { vn: 'Thông tin sản phẩm' })}
          </span>
        }
        key={'information'}
      >
        <HFeatureForm
          {...{
            schema: RealEstateDetailSchemaForm,
            hideSubmitAndContinueButton: true,
            initialValues: {
              status: PROPERTIES_STATUS.ACTIVE,
              publish: true,
            },
          }}
        />
      </TabPane>
    </Tabs>
  );
};

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'properties',
        nodeName: 'properties',
      }}
    >
      <HSearchForm
        withRelations={['org', 'category', 'project']}
        advancedSchema={PropertiesAdvanceSearch}
        renderRightSuffix={
          <Row>
            <CreateButton />
            <ImportButton />
          </Row>
        }
      />
      <HDocumentDrawerPanel>
        <ViewRealEstateDetail />
      </HDocumentDrawerPanel>
      <HTable schema={RealEstateProductTableSchema} />
    </HFeature>
  );
};
