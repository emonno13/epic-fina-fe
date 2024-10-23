import { DownloadOutlined, FilterFilled } from '@ant-design/icons';
import { WithPermission } from '@components/shared/accessibility/with-permission';
import { HSelect } from '@components/shared/common-form-elements/select';
import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import { ExportUserButton } from '@components/shared/user/export-user-button';
import { ImportButton } from '@components/shared/user/import-user-button';
import { Alert, Button, Col, Empty, Form, Row, Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'underscore';

import { COMMON_PERMISSIONS } from '@lib/permissions';
import { HFeature, HTable } from '@schema-form/features';
import { SEARCH_MODES } from '@schema-form/features/search-form/schema';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';
import { usePositionByCode } from '../../../../dynamic-configuration/hooks';
import { ConverterUtils } from '../../../../lib/converter';
import { useHTranslation } from '../../../../lib/i18n';
import { endpoints } from '../../../../lib/networks/endpoints';
import { useAuth, useHasPermissions } from '../../../../lib/providers/auth';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import {
  useDetailForm,
  useDocumentDetail,
  useSearchForm,
  useSetDocumentDetail,
  useTableSourceData,
} from '../../../../schema-form/features/hooks';
import {
  HDocumentDrawerPanel,
  HDocumentModalPanel,
} from '../../../../schema-form/features/panels';
import {
  CreateButton,
  HSearchForm,
  HSearchFormHiddenAble,
  HSearchFormWithCreateButton,
} from '../../../../schema-form/features/search-form';
import { ORGANIZATION_TYPES, USER_TYPES } from '../../../../types/organization';
import { RouteUtils } from '../../../shared/layout/router-contaner/utils';
import { PopupNotification } from '../../crm/notification/';
import { AdvancedInformation } from '../../profiles/advanced';
import { AccountSchema } from './account-schema-form';
import { UserAdvanceSearchPlus } from './advance-search/user-advance-search-plus.shema-form';
import { BankInfoDetailSchema } from './bank-info-schema-form';
import { UserDetailSchema } from './detail-schema-form';
import { EmailSchemaItemForm } from './email-schema-form-item';
import { useFetchChildrenUserIds, useFetchReferralUser } from './hooks';
import { ListReferrer } from './list-referrer';
import { RelatedPersonSchemaForm } from './related-person-schema-form';
import { RelatedPersonSearchResultSchema } from './related-person-search-result-schema';
import { AddRelatedUser } from './related-user';
import { RolePermissionDetailSchema } from './role-permissions-schema-form';
import { UserResultSchema } from './search-result-schema';

const ProfileDocument = dynamic(
  () => import('components/features/profiles/profile-document'),
  {
    ssr: false,
  },
);

const { TabPane } = Tabs;

export const RelatedUserDetail = ({ user: defaultUser = undefined }: any) => {
  const documentDetail = useDocumentDetail();
  const [searchForm] = Form.useForm();

  const user = defaultUser || documentDetail;

  if (isEmpty(user)) return <Empty />;

  return (
    <HFeature
      {...{
        featureId: 'related-person',
        documentIdName: 'relatedUserId',
        useQueryParams: false,
        searchForm,
        endpoint: endpoints.endpointWithApiDomain(
          `/users/${user.id}/related-person`,
        ),
      }}
    >
      <HSearchForm
        {...{
          withRelations: ['org', 'createdBy'],
          initialValues: { searchingRule: SEARCH_MODES.MULTIPLE },
          resetIfSuccess: false,
          renderRightSuffix: (
            <Row>
              <CreateButton />
              <AddRelatedUser {...{ documentDetail: user, searchForm }} />
            </Row>
          ),
        }}
      />
      <HDocumentModalPanel width={'80%'}>
        <HFeatureForm
          {...{
            schema: RelatedPersonSchemaForm,
            transport: { mainUser: user },
            hiddenValues: {
              type: USER_TYPES.customer,
            },
            onDataReadyToSubmit: (data) => {
              if (data.relationship) {
                data.relatedPerson = [
                  {
                    userId: user.id,
                    relationship: data.relationship,
                  },
                ];

                delete data.relationship;
              }

              return data;
            },
          }}
        />
      </HDocumentModalPanel>

      <HTable
        schema={() => RelatedPersonSearchResultSchema({ mainUser: user })}
      />
      <PopupNotification />
    </HFeature>
  );
};

export const UserDetail = ({
  orgId,
  orgType,
  type,
  PanelComponent = HDocumentDrawerPanel,
  position = undefined,
}) => {
  const hasPermissions = useHasPermissions();
  const hasEditReffererPermission = hasPermissions([
    COMMON_PERMISSIONS.EDIT_REFERRER,
  ]);
  const documentDetail = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  const { currentUser } = useAuth();
  const detailForm = useDetailForm();
  const [accountForm] = Form.useForm();
  const [bankInfoForm] = Form.useForm();
  const [roleAndPermissionForm] = Form.useForm();
  const [emailPersonalizationForm] = Form.useForm();

  useEffect(() => {
    handleEmailPersonalization();
  }, [documentDetail]);

  const handleEmailPersonalization = () => {
    if (emailPersonalizationForm) {
      emailPersonalizationForm.resetFields();
    }
  };
  const getInitDetailAccount = () => {
    const values = detailForm?.getFieldsValue() || {};
    return {
      tels: values.tels || [],
      email: values.emails || [],
    };
  };
  const getInitDetailBankInfo = () => {
    return documentDetail?.banks?.length > 0 ? documentDetail?.banks[0] : [];
  };
  const [accountDetail, setAccountDetail] = useState(getInitDetailAccount());
  const [bankInfoDetail, setBankInfoDetail] = useState(getInitDetailBankInfo());
  const setUserDetail = useSetDocumentDetail();
  const handleUserCreated = (user) => {
    if (!user?.id || orgId) {
      return;
    }
    RouteUtils.redirectToDocumentDetail(user.id);
    setUserDetail(user);
  };

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
    if (activeTab === 'account') {
      detailForm?.resetFields();
      setAccountDetail(getInitDetailAccount());
    }
    if (activeTab === 'bankInfo') {
      detailForm?.resetFields();
      setBankInfoDetail(getInitDetailBankInfo());
    }
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

        <TabPane tab={t('Account', { vn: 'Tài khoản' })} key="account">
          <Alert
            message="If you set the password for this user, that mean user can login to the system with role site user. You can set more roles and permissions"
            type="warning"
          />
          <HFeatureForm
            {...{
              className: 'm-t-15',
              labelCol: { span: 3 },
              wrapperCol: { span: 12 },
              endpoint: endpoints.endpointWithApiDomain(
                `/users/${documentDetail.id}/account`,
              ),
              layout: 'horizontal',
              initialValues: accountDetail,
              schema: AccountSchema,
              submitButtonLabel: 'Set password',
              hideControlButton: false,
              form: accountForm,
              transport: { user: documentDetail },
              hiddenValues: {
                orgId,
                orgType,
              },
            }}
          />
        </TabPane>
        {currentUser.type === USER_TYPES.staff && (
          <TabPane
            tab={t('Roles and Permissions', { vn: 'Vai trò và Quyền' })}
            key="roleAndPermission"
          >
            <Alert
              message="Provides roles and permissions, users can access a limited number of features"
              type="warning"
            />
            <HFeatureForm
              {...{
                className: 'm-t-15',
                labelCol: { span: 3 },
                wrapperCol: { span: 24 },
                layout: 'horizontal',
                schema: RolePermissionDetailSchema,
                hideControlButton: false,
                form: roleAndPermissionForm,
                hiddenValues: {
                  orgId,
                  orgType,
                },
              }}
            />
          </TabPane>
        )}
        <TabPane
          tab={t('Email personalization', { vn: 'Cá nhân hóa email' })}
          key="emailPersonalization"
        >
          <HFeatureForm
            {...{
              schema: EmailSchemaItemForm,
              hideControlButton: false,
              resetIfSuccess: true,
              form: emailPersonalizationForm,
              hiddenValues: {
                orgId,
                orgType,
              },
            }}
          />
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
          tab={t('List referrer', { vn: 'Danh sách người giới thiệu' })}
          key="listReferrer"
        >
          <RelateToReferrer
            hasEditReferrer={hasEditReffererPermission}
            documentDetail={documentDetail}
          />
          <ListReferrer canEdit={true} documentDetail={documentDetail} />
        </TabPane>
        {hasPermissions(['UPDATE_ADVANCED_USER_INFO']) && (
          <TabPane
            tab={t('Advanced information', { vn: 'Thông tin nâng cao' })}
            key="advanced"
          >
            <AdvancedInformation {...{ documentDetail }} />
          </TabPane>
        )}
        <TabPane
          tab={t('Profile Document', { vn: 'Tài liệu của tôi' })}
          key="profileDocument"
        >
          <ProfileDocument {...{ userId: documentDetail?.id }} />
        </TabPane>
      </Tabs>
    </PanelComponent>
  );
};

const UserManagement = (props: any) => {
  const { t } = useHTranslation('common');
  const {
    documentIdName = 'documentId',
    orgType,
    PanelComponent,
    useQueryParams = true,
    orgId,
    position = '',
    match,
    customType,
    featureId: defaultFeatureId,
  } = props;
  const positionByCode = usePositionByCode(position);
  const [currentPageBanks, setCurrentPageBanks] = useState<any[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  const [searchForm] = Form.useForm();

  const styleFilterButton = {
    width: '36px',
    height: '36px',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1',
  } as any;

  const type = useMemo(() => {
    const typeParam = match?.params?.type || '';
    if (customType) {
      return customType;
    }
    if (typeParam === 'customers') {
      return USER_TYPES.customer;
    }
    if (typeParam === 'insurances') {
      return USER_TYPES.insurance_agent;
    }
    if (typeParam === 'sellers') {
      return USER_TYPES.seller;
    }
    if (typeParam === 'collaborators') {
      return USER_TYPES.collaborator;
    }
    if (typeParam === 'tellers') {
      return USER_TYPES.teller;
    }
    return undefined;
  }, [match, customType]);

  const featureIdByType = useMemo(() => (type ? 'user' : 'allUser'), [type]);
  const featureId = defaultFeatureId || featureIdByType;
  const dataSource = useTableSourceData(featureId) || [];

  const searchHiddenFields = useMemo(() => {
    let result: any = { type };

    if (type === USER_TYPES.collaborator) {
      result = {
        or: [{ type }, { positionCodes: 'FINA_COLLABORATOR' }],
      };
    }
    if (type === USER_TYPES.teller && position === 'CONTACT_PERSON') {
      result.positionCodes = 'CONTACT_PERSON';
    }
    return result;
  }, [type]);

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
        documentIdName,
        useQueryParams,
        documentRelations: ['org', 'createdBy'],
        searchForm,
      }}
    >
      <HSearchFormWithCreateButton
        {...{
          withRelations: ['org', 'createdBy'],
          hiddenValues: {
            ...FormUtils.createSearchHiddenValues(searchHiddenFields),
            toppedOrgId: orgId,
          },
          resetIfSuccess: false,
          initialValues: {
            type: type === USER_TYPES.collaborator ? undefined : type,
          },
          renderRightSuffix: (
            <WithPermission>
              <ExportUserButton
                {...{
                  userType: type,
                  size: 'large',
                  shape: 'round',
                  className: 'control-btn m-l-10',
                  icon: <DownloadOutlined />,
                }}
              >
                {t('Export')}
              </ExportUserButton>
              <ImportButton />
            </WithPermission>
          ),
        }}
      />
      <UserDetail
        {...{
          orgType,
          orgId,
          type,
          PanelComponent,
          position: positionByCode?.id,
        }}
      />
      <div style={showFilterPanel ? { display: 'flex', gap: '20px' } : {}}>
        {
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <Button
              {...{
                style: showFilterPanel
                  ? styleFilterButton
                  : { ...styleFilterButton, marginBottom: '-46px' },
                onClick: () => {
                  setShowFilterPanel(!showFilterPanel);
                },
              }}
            >
              <FilterFilled style={{ color: '#064DD6', fontSize: '16px' }} />
            </Button>
            {showFilterPanel && (
              <HSearchFormHiddenAble
                {...{
                  withRelations: ['org'],
                  schema: UserAdvanceSearchPlus,
                  resetIfSuccess: false,
                  hiddenValues: {
                    ...FormUtils.createSearchHiddenValues(searchHiddenFields),
                    toppedOrgId: orgId,
                  },
                  isAppendData: true,
                  style: { width: '300px' },
                  onDataReadyToSubmit: (value) => {
                    return {
                      ...value,
                      createdAt: FormUtils.getQueryBetweenDays(
                        value?.createdAt?.[0],
                        value?.createdAt?.[1],
                      ),
                    };
                  },
                }}
              />
            )}
          </div>
        }
        <HTable
          {...{
            scroll: { x: 'max-content' },
            style:
              !type && showFilterPanel
                ? { width: 'calc(100% - 300px)' }
                : { width: '100%' },
            schema: UserResultSchema({
              type,
              currentPageBanks,
              searchForm,
              defaultFeatureId: featureId,
              useQueryParams,
            }),
            bordered: true,
          }}
        />
      </div>
    </HFeature>
  );
};

export const UserStaffManagement = (props) => {
  return (
    <UserManagement
      {...{
        ...props,
        customType: USER_TYPES.staff,
        orgType: ORGANIZATION_TYPES.SUB_ORG,
      }}
    />
  );
};

export const RelateToReferrer = ({
  hasEditReferrer = false,
  documentDetail,
}) => {
  const { t } = useHTranslation('admin-common');
  const [form] = Form.useForm();
  const { referralCode, id } = documentDetail || {};
  const searchForm = useSearchForm();
  const referralUser = useFetchReferralUser(referralCode);
  const childrenUserIds = useFetchChildrenUserIds(documentDetail);

  return (
    <div>
      <FiledViewer
        label={t('Current referrer', { vn: 'Người giới thiệu hiện tại' })}
        value={`${ConverterUtils.getFullNameUser(
          referralUser,
        )} - ${ConverterUtils.showUserEmail(referralUser?.emails || [])}`}
        widthLabel={'15%'}
      />

      {hasEditReferrer && (
        <HForm
          method="put"
          endpoint={endpoints.generateNodeEndpoint(`users/${id}`)}
          form={form}
          schema={() => [
            createSchemaItem({
              Component: HSelect,
              name: 'referralCode',
              colProps: { xs: 24, sm: 24, md: 8 },
              rowProps: { gutter: { xs: 16, md: 16 } },
              label: t('Change', { vn: 'Thay đổi người giới thiệu' }),
              componentProps: {
                endpoint: 'users/suggestion',
                searchWhenHidenValueChange: true,
                hiddenValues: {
                  status: { ne: 'deleted' },
                  id: { nin: [...childrenUserIds] },
                },
                optionsConverter: (document) => ({
                  ...document,
                  label:
                    `${ConverterUtils.getFullNameUser(document)} - ${
                      document?.emails?.[0]?.email || ''
                    }` || '',
                  value: document?.refCode || document?.code,
                }),
                allowClear: true,
                showSearch: true,
                placeholder: t('Change referrer', {
                  vn: 'Thay đổi người giới thiệu',
                }),
              },
            }),
            createSchemaItem({
              Component: Button,
              colProps: { xs: 24, sm: 24, md: 12 },
              label: ' ',
              componentProps: {
                children: t('Save'),
                onClick: () => form?.submit(),
                type: 'primary',
              },
            }),
          ]}
          useDefaultMessage={true}
          onGotSuccess={() => searchForm?.submit()}
          hideControlButton={true}
        />
      )}
    </div>
  );
};

export default UserManagement;
