import { DownloadOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HFeature, HTable } from '../../../../schema-form/features';
import { useTableSourceData } from '../../../../schema-form/features/hooks';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { FormUtils } from '../../../../schema-form/utils/form-utils';
import { ORGANIZATION_TYPES, USER_TYPES } from '../../../../types/organization';
import { WithPermission } from '../../../shared/accessibility/with-permission';
import { ExportUserButton } from '../../../shared/user/export-user-button';
import { UserResultSchema } from '../../organizations/users/search-result-schema';
import { UserManagementDetail } from '../customer/user-management-detail-schema-form';

const CollaboratorManagement = (props: any) => {
  const [currentPageBanks, setCurrentPageBanks] = useState<any[]>([]);
  const { t } = useTranslation('common');
  const featureId = 'collaborator-managements';

  const dataSource = useTableSourceData(featureId) || [];

  const handleFetchCurrentPageBanks = useCallback(
    async (currentDataSource: any[]) => {
      if (Array.isArray(currentDataSource) && currentDataSource.length > 0) {
        const uniqueBankIds: string[] = [];

        currentDataSource.forEach((document) => {
          const { banks = [] } = document || {};
          if (Array.isArray(banks) && banks.length > 0) {
            banks.forEach(({ bankId }) => {
              if (!uniqueBankIds.includes(bankId)) uniqueBankIds.push(bankId);
            });
          }
        });
        await FormUtils.submitForm(
          {
            filter: {
              where: { id: { inq: uniqueBankIds } },
            },
          },
          {
            nodeName: 'organizations',
            onGotSuccess: (response) => {
              setCurrentPageBanks(response?.data || []);
            },
          },
        );
      }
    },
    [],
  );
  const type = USER_TYPES.collaborator;

  useEffect(() => {
    handleFetchCurrentPageBanks(dataSource);
  }, [dataSource]);

  return (
    <HFeature
      {...{
        featureId,
        nodeName: 'users',
        documentRelations: ['org', 'createdBy'],
      }}
    >
      <HSearchFormWithCreateButton
        {...{
          withRelations: ['org', 'createdBy'],
          resetIfSuccess: false,
          hiddenFields: {
            or: [{ type }, { positionCodes: 'FINA_COLLABORATOR' }],
          },
          renderRightSuffix: (
            <WithPermission>
              <ExportUserButton
                {...{
                  userType: USER_TYPES.collaborator,
                  size: 'large',
                  shape: 'round',
                  className: 'control-btn m-l-10',
                  icon: <DownloadOutlined />,
                }}
              >
                {t('Export')}
              </ExportUserButton>
            </WithPermission>
          ),
        }}
      />

      <UserManagementDetail
        {...{
          orgId: '',
          orgType: ORGANIZATION_TYPES.SUB_ORG,
          type: USER_TYPES.collaborator,
        }}
      />

      <CollaboratorManagementTable
        {...{
          type: USER_TYPES.collaborator,
          currentPageBanks,
        }}
      />
    </HFeature>
  );
};

export default CollaboratorManagement;

const CollaboratorManagementTable = (props) => {
  const { type, currentPageBanks } = props;
  return (
    <>
      <HTable schema={UserResultSchema({ type, currentPageBanks })} />
    </>
  );
};
