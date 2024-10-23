import { FormUtils } from '@schema-form/utils/form-utils';
import { Tabs } from 'antd';
import notification from 'antd/lib/notification';
import { useHTranslation } from '../../../../../lib/i18n';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import {
  useDocumentDetail,
  useFeatureId,
  useSetDocumentDetail,
} from '../../../../../schema-form/features/hooks';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { HSearchForm } from '../../../../../schema-form/features/search-form';
import { HButton } from '../../../../shared/common-form-elements/h-confirmation-button';
import { AccessPermissionUserDetailViewer } from './access-permission-user-detail-viewer';
import { AccessPermissionUserDetailSchemaForm } from './access-permission-user-detail.schem-form';
import { AccessPermissionUserTableSchema } from './access-permission-user.table';
import { AdvanceSearch } from './advanced-search.schema-form';
import { REQUEST_ACCESS_USER_STATUSES } from './constan';

const { TabPane } = Tabs;

export const ACCESS_PERMISSION_TYPE = {
  REQUEST_PROCESSED: 'request-processed',
  MY_REQUEST: 'my-request',
};

export const AccessPermissionUserDetailForm = () => {
  const { t } = useHTranslation('admin-common');
  const documentDetail = useDocumentDetail();
  const documentId = documentDetail?.id;
  const setDocumentDetail = useSetDocumentDetail();
  const onAccessPermissionUser = (status, type) => {
    setDocumentDetail({ ...documentDetail, type, status });
  };
  const featureId = useFeatureId();
  if (documentDetail?.type === 'viewer') {
    return (
      <HDocumentModalPanel
        width="80%"
        footer={
          featureId === ACCESS_PERMISSION_TYPE.REQUEST_PROCESSED &&
          (documentDetail.status ===
            REQUEST_ACCESS_USER_STATUSES.WAIT_PROCESSING ||
            documentDetail.status === REQUEST_ACCESS_USER_STATUSES.RESEND) ? (
            <>
              <HButton
                {...{
                  className: 'm-t-10 m-l-5 m-r-5',
                  type: 'primary',
                  onClick: () => onAccessPermissionUser('approve', 'submit'),
                }}
              >
                {t('Accept', { vn: 'Chấp thuận' })}
              </HButton>
              <HButton
                danger
                {...{
                  className: 'm-t-10 m-l-5 m-r-5',
                  type: 'primary',
                  onClick: () => onAccessPermissionUser('reject', 'submit'),
                }}
              >
                {t('Reject', { vn: 'Từ chối' })}
              </HButton>
            </>
          ) : (
            <span />
          )
        }
      >
        <AccessPermissionUserDetailViewer />
      </HDocumentModalPanel>
    );
  }
  return (
    <HDocumentModalPanel
      width="450px"
      {...{
        hideSubmitAndContinueButton: true,
      }}
    >
      <HFeatureForm
        {...{
          nodeName: `request-access-user/${documentId}`,
          schema: AccessPermissionUserDetailSchemaForm,
          hideControlButton: true,
          showSuccessMessage: false,
          hiddenValues: { status: documentDetail?.status },
          onGotSuccess: () => {
            notification.info({
              message: t('Response request access user', {
                vn: 'Phản hồi yêu cầu truy cập',
              }),
              description: t('Response to the access request success.', {
                vn: 'Phản hồi yêu cầu truy cập thành công.',
              }),
            });
          },
        }}
      />
    </HDocumentModalPanel>
  );
};

export const AccessPermissionUser = ({ featureId }) => {
  const currentUser = useCurrentUser();
  const handleSearchDataByDate = (data) => {
    data.createdAt =
      data?.createdAt &&
      FormUtils.getQueryBetweenDays(data?.createdAt?.[0], data?.createdAt?.[1]);
  };
  return (
    <HFeature
      {...{
        featureId: featureId,
        nodeName: 'request-access-user',
      }}
    >
      <HSearchForm
        {...{
          hiddenFields:
            featureId === ACCESS_PERMISSION_TYPE.REQUEST_PROCESSED
              ? { ownerId: { neq: currentUser.id } }
              : { senderId: currentUser.id },
          withRelations: ['customer', 'sender', 'approve', 'user'],
          advancedSchema: AdvanceSearch,
          resetIfSuccess: false,
          onDataReadyToSubmit: handleSearchDataByDate,
        }}
      />
      <AccessPermissionUserDetailForm />
      <HTable schema={AccessPermissionUserTableSchema(featureId)} />
    </HFeature>
  );
};

const AccessPermissionUserViewer = () => {
  const { t } = useHTranslation('admin-common');
  return (
    <Tabs>
      <TabPane
        tab={t('Request processed', { vn: 'Yêu cầu cần xử lý' })}
        key={ACCESS_PERMISSION_TYPE.REQUEST_PROCESSED}
      >
        <AccessPermissionUser
          featureId={ACCESS_PERMISSION_TYPE.REQUEST_PROCESSED}
        />
      </TabPane>
      <TabPane
        tab={t('My request', { vn: 'Yêu cầu của tôi' })}
        key={ACCESS_PERMISSION_TYPE.MY_REQUEST}
      >
        <AccessPermissionUser featureId={ACCESS_PERMISSION_TYPE.MY_REQUEST} />
      </TabPane>
    </Tabs>
  );
};
export default AccessPermissionUserViewer;
