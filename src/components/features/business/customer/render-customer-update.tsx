import {
  RelatedUserDetail,
  RelateToReferrer,
} from '@components/features/organizations/users';
import { BankInfoDetailSchema } from '@components/features/organizations/users/bank-info-schema-form';
import { UserDetailSchema } from '@components/features/organizations/users/detail-schema-form';
import DocumentManagement from '@components/features/profiles/document-management';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { COMMON_PERMISSIONS } from '@lib/permissions';
import { useCurrentUser, useHasPermissions } from '@lib/providers/auth';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { Empty, Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { isEmpty } from 'underscore';
import HistorySurvey from './history-survey';
import { RenderCallLogByUser } from './user-management-detail-schema-form';

const { TabPane } = Tabs;

const ProfileDocument = dynamic(
  () => import('@components/features/profiles/profile-document'),
  {
    ssr: false,
  },
);

export interface RenderCustomerUpdateProps {
  user?: any;
  orgId?: string;
  orgType?: string;
  type?: string;
  position?: string;
}

const RenderCustomerUpdate: FC<RenderCustomerUpdateProps> = ({
  user: defaultUser,
  orgId,
  orgType,
  type,
  position,
}) => {
  const documentDetail = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  const hasPermissions = useHasPermissions();
  const currentUser = useCurrentUser();

  const user = defaultUser || documentDetail;
  const hasEditRefererPermission = hasPermissions([
    COMMON_PERMISSIONS.EDIT_REFERRER,
  ]);

  if (isEmpty(user))
    return <Empty {...{ description: 'Không có thông tin khách hàng' }} />;

  return (
    <Tabs>
      <TabPane
        tab={t('User information', { vn: 'Thông tin người dùng' })}
        key="info"
      >
        <RelateToReferrer
          hasEditReferrer={hasEditRefererPermission}
          documentDetail={user}
        />

        <HForm
          {...{
            schema: UserDetailSchema,
            transport: { orgType, currentUser, position, type },
            initialValues: {
              ...user,
              orgId: orgId || currentUser.orgId,
              type,
            },
            hiddenFields: {
              orgId,
              type,
            },
            onDataReadyToSubmit: (document) => ({
              ...document,
              title: document.title || '',
            }),
            endpoint: endpoints.endpointWithApiDomain(`/users/${user.id}`),
            method: 'put',
            useDefaultMessage: true,
          }}
        />
      </TabPane>

      <TabPane
        tab={t('Related person information', {
          vn: 'Thông tin người liên quan',
        })}
        key="related_person_info"
      >
        <RelatedUserDetail {...{ user }} />
      </TabPane>

      <TabPane
        tab={t('Bank Info', { vn: 'Thông tin ngân hàng' })}
        key="bankInfo"
      >
        <HForm
          {...{
            className: 'm-t-15',
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
            layout: 'horizontal',
            associationField: 'banks',
            endpoint: endpoints.endpointWithApiDomain(
              `/users/${user.id}/bank-accounts`,
            ),
            method: 'put',
            schema: BankInfoDetailSchema,
            hiddenValues: {
              orgId,
              orgType,
            },
            useDefaultMessage: true,
            initialValues: user,
          }}
        />
      </TabPane>

      <TabPane
        tab={t('Profile Document', { vn: 'Danh sách tài liệu' })}
        key="profileDocument"
      >
        <ProfileDocument userId={user.id} />
      </TabPane>

      <TabPane
        tab={t('Document management', { vn: 'Quản lý hồ sơ' })}
        key={'documentManagement'}
      >
        <DocumentManagement userId={user.id} />
      </TabPane>

      <TabPane
        tab={t('Call logs', { vn: 'Lịch sử cuộc gọi' })}
        key={'callLogs'}
      >
        <RenderCallLogByUser {...{ user }} />
      </TabPane>

      <TabPane
        tab={t('Lịch sử thu thập thông tin', {
          vn: 'Lịch sử thu thập thông tin',
        })}
        key={'historySurvey'}
      >
        <HistorySurvey {...{ user }} />
      </TabPane>
    </Tabs>
  );
};

export default RenderCustomerUpdate;
