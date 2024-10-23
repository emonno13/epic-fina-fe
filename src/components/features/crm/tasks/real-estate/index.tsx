import { DownloadOutlined } from '@ant-design/icons';
import { AnyObject } from '@components/shared/atom/type';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { UpdateUserDrawer } from '@components/shared/update-user-drawer';
import { downloadFormURI } from '@components/shared/utils/download';
import { tkManager } from '@lib/networks/http';
import { useCurrentUser } from '@lib/providers/auth';
import { HFeature, HTable } from '@schema-form/features';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { RelationUtils } from '@schema-form/utils/form-utils';
import { Row } from 'antd';
import { TASK_STATUSES } from 'constants/crm/task';
import { useHaveDownloadPermission } from 'dynamic-configuration/hooks';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { memo, useCallback, useState } from 'react';
import { TaskDetails } from '../edit-form';
import { TASK_TYPE } from '../utils';
import { useRealEstateTaskSchemaTable } from './schemas/schema-table';

export const REAL_ESTATE_TASK_FEATURE_ID = 'real-estate-task';

const RealEstateTaskManagement = memo(() => {
  const haveDownloadPermission = useHaveDownloadPermission();
  const currentUser = useCurrentUser();
  const { t } = useTranslation('common');
  const [isVisibleUserUpdate, setIsVisibleUserUpdate] =
    useState<boolean>(false);
  const [selectedUserUpdate, setSelectedUserUpdate] = useState<AnyObject>({});
  const realEstateTaskSchemaTable = useRealEstateTaskSchemaTable();

  const handleExportTask = useCallback(async () => {
    try {
      const token = await tkManager.getToken();
      const filterQueryParam = {
        where: {
          type: TASK_TYPE.REAL_ESTATE,
          status: { nin: [TASK_STATUSES.DELETED] },
        },
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STATIC_CDN}/tasks/export/${currentUser.id}?filter=${encodeURIComponent(JSON.stringify(filterQueryParam))}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      downloadFormURI(
        url,
        `[FINA][Tasks] Dữ liệu YCTV ngày ${moment().format('DD MM YYYY')}.xlsx`,
      );
    } catch (err: any) {
      console.log('download users error', err.message);
    }
  }, [currentUser.id]);

  return (
    <HFeature nodeName="tasks" featureId={REAL_ESTATE_TASK_FEATURE_ID}>
      <HSearchFormWithCreateButton
        withRelations={[
          'user',
          'assignee',
          'reasonCloseTask',
          RelationUtils.entity('assignToPartner', ['code']),
        ]}
        hiddenValues={{
          filter: {
            where: {
              type: TASK_TYPE.REAL_ESTATE,
            },
          },
        }}
        resetIfSuccess={false}
        renderRightSuffix={
          <Row>
            {haveDownloadPermission && (
              <HButton
                {...{
                  size: 'large',
                  shape: 'round',
                  className: 'control-btn m-l-10',
                  onClick: handleExportTask,
                  icon: <DownloadOutlined />,
                }}
              >
                {t('Export')}
              </HButton>
            )}
          </Row>
        }
      />
      <TaskDetails />
      <HTable
        schema={() =>
          realEstateTaskSchemaTable({
            setIsVisibleUserUpdate,
            setSelectedUserUpdate,
          })
        }
      />
      <UpdateUserDrawer
        setIsVisibleUserUpdate={setIsVisibleUserUpdate}
        isVisibleUserUpdate={isVisibleUserUpdate}
        selectedUserUpdate={selectedUserUpdate}
        setSelectedUserUpdate={setSelectedUserUpdate}
      />
    </HFeature>
  );
});

export default RealEstateTaskManagement;
