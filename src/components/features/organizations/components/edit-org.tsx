import { useHTranslation } from '@lib/i18n';
import { Col, Row, Tabs } from 'antd';
import { useTranslation } from 'next-i18next';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { getUserTypeByOrgType } from '../../../../types/organization';
import { OrgDetailSchemaForm } from '../detail-schemas/org-detail-schema-form';
import { OrgTableSchema } from '../org-search-result-table-schema';
import UserManagement from '../users';

const { TabPane } = Tabs;

const SubOrganizationFeatures = () => {
  const documentDetail = useDocumentDetail();
  const hiddenValues = {
    parentOrgId: documentDetail.id,
    type: documentDetail.type,
  };
  const orgFilters = {
    filter: { where: hiddenValues },
  };
  const initialValues = hiddenValues;
  const { t } = useTranslation('admin');

  return (
    <HFeature
      {...{
        useQueryParams: false,
        documentIdName: 'subOrgId',
        featureId: 'sub-organization',
        nodeName: 'organizations',
      }}
    >
      <HSearchFormWithCreateButton
        {...{
          hiddenValues: orgFilters,
        }}
      />
      <HDocumentModalPanel
        title={`${t('Organization')} ${documentDetail.name}`}
        className="drawer-no-padding-top"
      >
        <HFeatureForm
          {...{
            schema: OrgDetailSchemaForm,
            hiddenValues,
            showResetButton: true,
            transport: { isSubOrg: true },
            initialValues,
          }}
        />
      </HDocumentModalPanel>
      <HTable schema={OrgTableSchema} />
    </HFeature>
  );
};

export const EditOrganization = ({
  hiddenValues,
  orgType,
  initialValues,
  activeTab,
  setActiveTab,
  position = '',
}) => {
  const documentDetail = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  if (!documentDetail?.id) {
    return null;
  }
  return (
    <div>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab={t('Edit info', { vn: 'Sửa thông tin' })} key="info">
          <Row>
            <Col span={24}>
              <HFeatureForm
                {...{
                  schema: OrgDetailSchemaForm,
                  hiddenValues,
                  showResetButton: true,
                  hideControlButton: false,
                  hideSubmitAndContinueButton: false,
                  initialValues,
                }}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={t('Sub Organizations', { vn: 'Tổ chức cấp dưới' })}
          key="sub-organizations"
        >
          <SubOrganizationFeatures />
        </TabPane>
        <TabPane tab={t('Users', { vn: 'Người dùng' })} key="users">
          <UserManagement
            {...{
              documentIdName: 'userManagementInOrganizationScreen',
              useQueryParams: false,
              type: getUserTypeByOrgType(orgType),
              featureId: 'userOrg',
              PanelComponent: HDocumentModalPanel,
              orgId: documentDetail?.id,
              orgType: orgType,
            }}
          />
        </TabPane>
        <TabPane
          tab={t('Contact person', { vn: 'Người liên hệ' })}
          key="contact_person"
        >
          <UserManagement
            {...{
              documentIdName: 'contactPersonId',
              useQueryParams: false,
              type: getUserTypeByOrgType(orgType),
              featureId: 'userOrgContactPerson',
              PanelComponent: HDocumentModalPanel,
              orgId: documentDetail?.id,
              orgType: orgType,
              position,
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};
