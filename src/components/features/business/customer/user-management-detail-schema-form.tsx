import { Col, Form, Row, Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { memo, useEffect, useMemo } from 'react';
import { ConverterUtils } from '../../../../lib/converter';
import { useHTranslation } from '../../../../lib/i18n';
import { endpoints } from '../../../../lib/networks/endpoints';
import { COMMON_PERMISSIONS } from '../../../../lib/permissions';
import { useAuth, useHasPermissions } from '../../../../lib/providers/auth';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import {
  useDetailForm,
  useDocumentDetail,
  useSetDocumentDetail,
} from '../../../../schema-form/features/hooks';
import {
  HDocumentDrawerPanel,
  HDocumentModalPanel,
} from '../../../../schema-form/features/panels';
import HSearchForm from '../../../../schema-form/features/search-form';
import { RelationUtils } from '../../../../schema-form/utils/form-utils';
import { RouteUtils } from '../../../shared/layout/router-contaner/utils';
import {
  CallLogAdvancedSearchSchemaDetail,
  getDefaultExpandableCallLogManagement,
} from '../../crm/call-logs';
import { CallLogsTableSchema } from '../../crm/call-logs/search-result-table-schema';
import { RelatedUserDetail, RelateToReferrer } from '../../organizations/users';
import { BankInfoDetailSchema } from '../../organizations/users/bank-info-schema-form';
import { UserDetailSchema } from '../../organizations/users/detail-schema-form';
import DocumentManagement from '../../profiles/document-management';
import HistorySurvey from './history-survey';

const ProfileDocument = dynamic(
  () => import('@components/features/profiles/profile-document'),
  {
    ssr: false,
  },
);

const { TabPane } = Tabs;

export const UserManagementDetail = ({
  orgId,
  orgType,
  type,
  PanelComponent = HDocumentDrawerPanel,
  position = undefined,
}) => {
  const documentDetail = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  const hasPermissions = useHasPermissions();
  const hasEditRefererPermission = hasPermissions([
    COMMON_PERMISSIONS.EDIT_REFERRER,
  ]);
  const setUserDetail = useSetDocumentDetail();
  const detailForm = useDetailForm();

  const { currentUser } = useAuth();
  const [bankInfoForm] = Form.useForm();
  const [emailPersonalizationForm] = Form.useForm();

  const handleEmailPersonalization = () => {
    if (emailPersonalizationForm) {
      emailPersonalizationForm.resetFields();
    }
  };
  const handleUserCreated = (user) => {
    if (!user?.id || orgId) {
      return;
    }
    RouteUtils.redirectToDocumentDetail(user.id);
    setUserDetail(user);
  };

  useEffect(() => {
    handleEmailPersonalization();
  }, [documentDetail]);

  const userForm = useMemo(
    () => (
      <HFeatureForm
        {...{
          schema: UserDetailSchema,
          transport: { orgType, currentUser, position, type },
          initialValues: {
            orgId: orgId || currentUser.orgId,
            type,
          },
          hiddenFields: {
            orgId,
            type,
          },
          hideControlButton: !documentDetail?.id,
          onGotSuccess: handleUserCreated,
          onDataReadyToSubmit: (document) => ({
            ...document,
            title: document.title || '',
          }),
        }}
      />
    ),
    [documentDetail],
  );

  if (!documentDetail?.id) {
    return (
      <HDocumentModalPanel title={t('Create a New User')}>
        {userForm}
      </HDocumentModalPanel>
    );
  }

  const handleTabChange = (activeTab) => {
    detailForm?.resetFields();
  };

  return (
    <PanelComponent
      footer={<span />}
      title={`${t('User')}: ${ConverterUtils.getFullNameUser(documentDetail)}`}
    >
      <Tabs onChange={handleTabChange}>
        <TabPane
          tab={t('User information', { vn: 'Thông tin người dùng' })}
          key="info"
        >
          <RelateToReferrer
            hasEditReferrer={hasEditRefererPermission}
            documentDetail={documentDetail}
          />
          <Row>
            <Col span={24}>{userForm}</Col>
          </Row>
        </TabPane>

        <TabPane
          tab={t('Related person information', {
            vn: 'Thông tin người liên quan',
          })}
          key="related_person_info"
        >
          <RelatedUserDetail />
        </TabPane>

        <TabPane
          tab={t('Bank Info', { vn: 'Thông tin ngân hàng' })}
          key="bankInfo"
        >
          <HFeatureForm
            {...{
              className: 'm-t-15',
              labelCol: { span: 3 },
              wrapperCol: { span: 12 },
              layout: 'horizontal',
              associationField: 'banks',
              endpoint: endpoints.endpointWithApiDomain(
                `/users/${documentDetail.id}/bank-accounts`,
              ),
              schema: BankInfoDetailSchema,
              hideControlButton: false,
              form: bankInfoForm,
              hiddenValues: {
                orgId,
                orgType,
              },
            }}
          />
        </TabPane>

        <TabPane
          tab={t('Profile Document', { vn: 'Danh sách tài liệu' })}
          key="profileDocument"
        >
          <ProfileDocument userId={documentDetail?.id} />
        </TabPane>

        <TabPane
          tab={t('Document management', { vn: 'Quản lý hồ sơ' })}
          key={'documentManagement'}
        >
          <DocumentManagement userId={documentDetail?.id} />
        </TabPane>

        <TabPane
          tab={t('Call logs', { vn: 'Lịch sử cuộc gọi' })}
          key={'callLogs'}
        >
          <RenderCallLogByUser {...{ user: documentDetail }} />
        </TabPane>

        <TabPane
          tab={t('Call logs', { vn: 'Lịch sử thu thập thông tin' })}
          key={'info_survey'}
        >
          <HistorySurvey {...{ user: documentDetail }} />
        </TabPane>
      </Tabs>
    </PanelComponent>
  );
};

export const RenderCallLogByUser = memo(({ user }: any) => {
  const { t } = useHTranslation('admin-common');
  const expandable = getDefaultExpandableCallLogManagement(t);
  return (
    <HFeature
      {...{
        documentIdName: 'call-log-by-customer',
        featureId: 'call-logs',
        nodeName: 'call-logs',
      }}
    >
      <HSearchForm
        {...{
          advancedSchema: CallLogAdvancedSearchSchemaDetail,
          resetIfSuccess: false,
          hiddenValues: {
            filter: {
              where: {
                userId: user.id,
              },
              include: [
                RelationUtils.entity('staff', [
                  'id',
                  'firstName',
                  'lastName',
                  'fullName',
                ]),
              ],
            },
          },
        }}
      />

      <HTable schema={CallLogsTableSchema} expandable={expandable} />
    </HFeature>
  );
});
