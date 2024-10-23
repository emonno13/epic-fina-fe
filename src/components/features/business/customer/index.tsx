import { DownloadOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WithPermission } from '@components/shared/accessibility/with-permission';
import { ExportUserButton } from '@components/shared/user/export-user-button';
import { HFeature, HTable } from '@schema-form/features';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useHTranslation } from '../../../../lib/i18n';
import { endpoints } from '../../../../lib/networks/endpoints';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { useTableSourceData } from '../../../../schema-form/features/hooks';
import {
  HSearchFormHiddenAble,
  HSearchFormWithCreateButton,
} from '../../../../schema-form/features/search-form';
import { ORGANIZATION_TYPES, USER_TYPES } from '../../../../types/organization';
import { HButton } from '../../../shared/common-form-elements/h-confirmation-button';
import { HModal } from '../../../shared/common/h-modal';
import { UserResultSchema } from '../../organizations/users/search-result-schema';
import { UserManagementDetail } from './user-management-detail-schema-form';
import { UserSharingSchemaForm } from './user-sharing-schema-form';

const CustomerManagementTable = (props) => {
  const { t } = useHTranslation('admin-common');
  const { type, currentPageBanks } = props;
  const [searchForm] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectUserForm] = Form.useForm();

  const onSelectChange = (selectedRowKeysData) => {
    setSelectedRowKeys(selectedRowKeysData);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleShareContact = () => {
    if (selectedRowKeys.length === 0) {
      // TODO: show alert message force select record
      return;
    }

    setShowModal(true);
  };

  return (
    <>
      <div style={{ marginTop: 16 }}>
        <HButton
          {...{
            type: 'primary',
            onClick: handleShareContact,
          }}
        >
          {t('Share', { vn: 'Chia sẻ' })}
        </HButton>
        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length > 0
            ? `Đã chọn ${selectedRowKeys.length} bản ghi`
            : ''}
        </span>
      </div>

      <HModal
        onCancel={() => setShowModal(false)}
        width={props.width || '100%'}
        visible={showModal}
        footer={null}
      >
        <>
          <HFeatureForm
            {...{
              endpoint: endpoints.endpointWithApiDomain('/users/sharing'),
              layout: 'horizontal',
              schema: UserSharingSchemaForm,
              submitButtonLabel: t('Share', { vn: 'Chia sẻ' }),
              hideControlButton: false,
              form: selectUserForm,
              onGotSuccess: () => {
                setShowModal(false);
                setSelectedRowKeys([]);
              },
              hiddenValues: {
                userIds: selectedRowKeys,
              },
            }}
          />

          <HFeature
            {...{
              featureId: 'share-users',
              nodeName: 'users',
              documentIdName: 'shareUserId',
              useQueryParams: true,
              documentRelations: ['org', 'createdBy'],
            }}
          >
            <HSearchFormHiddenAble
              {...{
                withRelations: ['org', 'createdBy'],
                hiddenValues: {
                  ...FormUtils.createSearchHiddenValues({
                    id: { inq: selectedRowKeys },
                  }),
                },
                resetIfSuccess: false,
              }}
            />

            <HTable
              scroll={{ y: 300 }}
              schema={UserResultSchema({ type, currentPageBanks, searchForm })}
            />
          </HFeature>
        </>
      </HModal>

      <HTable
        rowSelection={rowSelection}
        schema={UserResultSchema({ type, currentPageBanks })}
      />
    </>
  );
};

const CustomerManagement = (props: any) => {
  const [currentPageBanks, setCurrentPageBanks] = useState<any[]>([]);
  const { t } = useTranslation('common');
  const featureId = 'customer-managements';

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
          hiddenFields: { type: USER_TYPES.customer },
          renderRightSuffix: (
            <WithPermission>
              <ExportUserButton
                {...{
                  userType: USER_TYPES.customer,
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
          type: USER_TYPES.customer,
        }}
      />

      <CustomerManagementTable
        {...{
          type: USER_TYPES.customer,
          currentPageBanks,
        }}
      />
    </HFeature>
  );
};

export default CustomerManagement;
