import { useAuth } from '@lib/providers/auth';
import Form from 'antd/lib/form';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { HFeature } from '../../../schema-form/features';
import { useFeature } from '../../../schema-form/features/hooks';
import { HDocumentDrawerPanel } from '../../../schema-form/features/panels';
import { HSearchFormWithCreateButton } from '../../../schema-form/features/search-form';
import {
  ORGANIZATION_TYPES,
  ORGANIZATION_TYPES_MAPPING,
} from '../../../types/organization';
import { CreateOrganization } from './components/create-org';
import { EditOrganization } from './components/edit-org';
import { OrganizationResultTable } from './components/organization-result-table';

const OrganizationManagement = (props) => {
  const { type, position } = props;
  const [searchForm] = Form.useForm();
  const feature = useFeature(); // if use in the feature, that mean we create the sub-org
  const [activeTab, setActiveTab] = useState('info');
  const { t } = useTranslation('admin-common');
  const hiddenValues: any = { type };
  const { currentUser } = useAuth();
  const initialValues: any = {};
  const isPartner = type !== ORGANIZATION_TYPES.SUB_ORG;

  if (isPartner) {
    hiddenValues.orgId = feature.documentId || currentUser.orgId;
  } else {
    initialValues.parentOrgId = currentUser['orgId'] || '';
  }

  const orgFilters = {
    filter: { where: { ...hiddenValues } },
  };

  return (
    <HFeature
      {...{
        featureId: ORGANIZATION_TYPES_MAPPING[type] || 'organization',
        nodeName: 'organizations',
        searchForm,
      }}
    >
      <HSearchFormWithCreateButton
        {...{
          hiddenValues: orgFilters,
          resetIfSuccess: false,
          withRelations: ['children'],
        }}
      />
      <CreateOrganization {...{ hiddenValues, initialValues }} />
      <HDocumentDrawerPanel
        title={t('Organization Management')}
        className="drawer-no-padding-top"
        footer={<span />}
      >
        <EditOrganization
          {...{
            hiddenValues,
            initialValues,
            orgType: type,
            activeTab,
            setActiveTab,
            position,
          }}
        />
      </HDocumentDrawerPanel>

      <OrganizationResultTable />
    </HFeature>
  );
};

export default OrganizationManagement;
