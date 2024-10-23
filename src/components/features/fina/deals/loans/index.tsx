import {
  DownloadOutlined,
  MenuOutlined,
  UnorderedListOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { HCommentManagementByFeature } from '@components/shared/common-form-elements/h-comment/contexts/h-comment-feature-context';
import {
  HButton,
  HButtonProps,
} from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HFeature, HTable } from '@schema-form/features';
import { HVirtualTable } from '@schema-form/features/data-list/h-virtual-table';
import {
  useSubmitSearchForm,
  useTableSourceData,
} from '@schema-form/features/hooks';
import {
  useDocumentDetail,
  useSetViewTypeOfDeal,
  useViewTypeOfDeal,
} from '@schema-form/features/hooks/document-detail-hooks';
import { useSetDocumentDetailWithoutVisible } from '@schema-form/features/hooks/table-hooks';
import HSearchForm, {
  CreateButton,
  HSearchFormHiddenAble,
} from '@schema-form/features/search-form';
import { SEARCH_MODES } from '@schema-form/features/search-form/schema';
import { createSchemaItem } from '@schema-form/h-types';
import { RelationUtils } from '@schema-form/utils/form-utils';
import { Form, Input, Row, Tabs } from 'antd';
import cls from 'classnames';
import { useHaveDownloadPermission } from 'dynamic-configuration/hooks';
import { CloseIconSvg, FilterIconSvg } from 'icons';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { USER_TYPES } from 'types/organization';
import { DEAL_STATUSES, DEAL_TYPE } from '../utils';
import ShortTableSchema from './deals.short-table-schema';
import { DealsTableSchema } from './deals.table-schema';
import { LoanDetail } from './detail';
import { CreateLoan } from './detail/create-deal-loan';
import { EditLoanWithTabPanel } from './detail/edit-deal-loan';
import { AdvanceSearch } from './search.schema-form';

import './deals-loans.module.scss';

const { TabPane } = Tabs;

export const DEAL_DOCUMENT_ID_NAME = 'dealId';

export const ImportButton = memo((props: HButtonProps) => {
  const { t } = useTranslation('common');
  const { push } = useRouter();
  const handleCreateNewDocument = () => {
    push('/admin/deals/import');
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

export const ExportButton = memo((props: HButtonProps) => {
  const { t } = useTranslation('common');
  const currentUser = useCurrentUser();
  const handleCreateNewDocument = () => {
    (window as any).open(
      `${process.env.NEXT_PUBLIC_STATIC_CDN}/deals/export/${currentUser.id}`,
    );
  };
  const haveDownloadPermission = useHaveDownloadPermission();

  if (!haveDownloadPermission) {
    return <></>;
  }

  return (
    <HButton
      {...{
        ...props,
        size: 'large',
        shape: 'round',
        className: 'control-btn m-l-10',
        onClick: handleCreateNewDocument,
        icon: <DownloadOutlined />,
      }}
    >
      {t('Export')}
    </HButton>
  );
});

export const VIEW_TYPE_OF_DEAL = {
  GRID: 'GRID',
  LIST: 'LIST',
};

const DealLoanManager = ({ status = [], featureId, ...props }) => {
  const { t } = useHTranslation('admin-common');
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const isCollaboratorFina = currentUser.type === USER_TYPES.collaborator;

  const endpoint =
    currentUser.type === USER_TYPES.teller
      ? endpoints.endpointWithApiDomain('/deals/bank')
      : endpoints.endpointWithApiDomain('/deals');
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [documentDetailVisible, setDocumentDetailVisible] =
    useState<boolean>(false);
  const [searchForm] = Form.useForm();
  const dataTabForStaff = [
    {
      key: 'All',
      status: { inq: [] },
    },
    {
      key: 'Chờ xử lý',
      status: {
        inq: [DEAL_STATUSES.WAIT_PROCESSING, DEAL_STATUSES.PROCESSING],
      },
    },
    {
      key: isOrgStaff ? 'Financial Organization' : 'processing_deals',
      status: { inq: [DEAL_STATUSES.MOVED_TO_FINANCIAL_ORGANIZATION] },
    },
    {
      key: 'loan approval',
      status: { inq: [DEAL_STATUSES.LEND_APPROVAL] },
    },
    {
      key: 'Phong tỏa 3 bên',
      status: { inq: [DEAL_STATUSES.TRIPARTITE_BLOCKADE] },
    },
    {
      key: 'Đang giải ngân',
      status: { inq: [DEAL_STATUSES.DISBURSING] },
    },
    {
      key: 'Đã giải ngân',
      status: { inq: [DEAL_STATUSES.DISBURSED] },
    },
    {
      key: 'Cancellation',
      status: { inq: [DEAL_STATUSES.CANCELLED] },
    },
  ];
  return (
    <>
      <HFeature
        {...{
          searchForm,
          featureId: featureId || 'deals',
          nodeName: 'deals',
          documentIdName: DEAL_DOCUMENT_ID_NAME,
          documentRelations: [
            'user',
            'category',
            'assignee',
            'source',
            'dealProgress',
            'product',
            'task',
            {
              relation: 'dealDetails',
              scope: {
                include: [
                  { relation: 'partnerStaff' },
                  { relation: 'partner' },
                ],
              },
            },
          ],
          initialValues: { searchingRule: SEARCH_MODES.SINGLE },
        }}
      >
        <HSearchForm
          endpoint={endpoint}
          advancedTabSchema={() => [
            createSchemaItem({
              Component: ({ onChange, value }) => {
                return (
                  <Tabs
                    destroyInactiveTabPane={true}
                    className="tabs-custom-filter"
                    activeKey={value}
                    onChange={onChange}
                  >
                    {dataTabForStaff?.map((item: any) => {
                      if (
                        !isOrgStaff &&
                        !isCollaboratorFina &&
                        item?.key === 'Fina'
                      ) {
                        return undefined;
                      }
                      return (
                        <TabPane tab={t(item?.key)} key={item?.key}></TabPane>
                      );
                    })}
                  </Tabs>
                );
              },
              colProps: { span: 24 },
              name: 'setStatus',
              ignore: true,
              componentProps: {
                onChange: (key) => {
                  const statusMapping = dataTabForStaff?.find(
                    (el) => el?.key === key,
                  );
                  searchForm?.setFieldsValue({
                    status: {
                      inq: statusMapping?.status?.inq,
                      nin: [DEAL_STATUSES.DELETED],
                    },
                  });
                  searchForm?.submit();
                },
              },
            }),
            createSchemaItem({
              Component: Input,
              name: 'status',
              className: 'display-none',
              componentProps: {
                style: {
                  display: 'none',
                },
              },
            }),
          ]}
          withRelations={[
            RelationUtils.entity(
              'source',
              RelationUtils.fieldsInUserRelation(),
            ),
            RelationUtils.entity(
              'assignee',
              RelationUtils.fieldsInUserRelation(),
            ),
            RelationUtils.entity('task', ['id', 'code']),
            'category',
            'product',
            'user',
            {
              relation: 'dealDetails',
              scope: {
                include: [
                  { relation: 'partnerStaff' },
                  { relation: 'partner' },
                ],
              },
            },
          ]}
          initialValues={{ searchingRule: SEARCH_MODES.SINGLE }}
          resetIfSuccess={false}
          layout="horizontal"
          className="deals-custom deals-loans-search"
          // hiddenFields={{ status }}
          hiddenValues={{
            filter: {
              where: {
                type: {
                  nin: [DEAL_TYPE.INSURANCES, DEAL_TYPE.CLAIM_INSURANCE],
                },
                // status: { nin: [DEAL_STATUSES.DELETED]},
              },
            },
          }}
          renderLeftSuffix={
            <HButton
              {...{
                onClick: () => setIsShowFilter(!isShowFilter),
                className: 'btn-filter',
              }}
            >
              <FilterIconSvg />
            </HButton>
          }
          renderRightSuffix={
            isOrgStaff ? (
              <Row>
                <CreateButton onClick={() => setDocumentDetailVisible(true)} />
                <ImportButton />
                <ExportButton />
              </Row>
            ) : (
              <ExportButton />
            )
          }
          placeholder={t(
            'Enter information about: customer, handler, profile code',
            { vn: 'Nhập thông tin về: khách hàng, nhân viên FINA, mã hồ sơ' },
          )}
          annotate={true}
        />
        <HCommentManagementByFeature>
          <LoanDetail />
          <div className="deals-loans-wrapper">
            {isShowFilter && (
              <div className="deals-loans-filter">
                <HSearchFormHiddenAble
                  {...{
                    endpoint,
                    schema: AdvanceSearch,
                    resetIfSuccess: false,
                    isAppendData: true,
                    hiddenFields: { status: props?.status },
                    withRelations: [
                      'user',
                      'category',
                      'assignee',
                      'product',
                      'source',
                      {
                        relation: 'dealDetails',
                        scope: {
                          include: [
                            { relation: 'partnerStaff' },
                            { relation: 'partner' },
                          ],
                        },
                      },
                    ],
                    renderLeftSuffix: (
                      <div className="title-advanced-filter">
                        <div className="title">{t('advancedFilter')}</div>
                        <CloseIconSvg
                          onClick={() => setIsShowFilter(!isShowFilter)}
                          className="cursor-pointer"
                        />
                      </div>
                    ),
                  }}
                />

                <div className="wrapper-btn-apply-filter">
                  <ApplyFilterButton />
                </div>
              </div>
            )}
            <div
              className={`deals-loans-content ${!isShowFilter ? 'width-full' : ''} `}
            >
              <DealsLoansContent {...props} />
            </div>
          </div>
        </HCommentManagementByFeature>
      </HFeature>
      <CreateLoan
        {...{
          documentDetailVisible,
          setDocumentDetailVisible,
          searchForm,
        }}
      />
    </>
  );
};

const DealLoanView = () => {
  return <DealLoanManager featureId={'deals-data'} />;
};

const DealsLoansContent = (props) => {
  const { t } = useHTranslation('admin-common');
  const dataSource = useTableSourceData();
  const setViewTypeOfDeal = useSetViewTypeOfDeal();
  const viewTypeOfDeal = useViewTypeOfDeal('view-type-of-deal');
  const documentDetail = useDocumentDetail();
  const setDocumentDetailWithoutVisible = useSetDocumentDetailWithoutVisible();

  useEffect(() => {
    if (dataSource?.length && viewTypeOfDeal === VIEW_TYPE_OF_DEAL.GRID) {
      setDocumentDetailWithoutVisible(dataSource[0]);
    }
  }, [dataSource, viewTypeOfDeal]);

  return (
    <Tabs
      className={cls('tabs-switch-menu', {
        'table-no-data': !dataSource?.length,
      })}
      activeKey={viewTypeOfDeal}
      onChange={(key: string) => {
        setViewTypeOfDeal({ featureId: 'view-type-of-deal', type: key });
      }}
    >
      <TabPane tab={<UnorderedListOutlined />} key={VIEW_TYPE_OF_DEAL.LIST}>
        <HTable
          bordered={true}
          schema={() => DealsTableSchema(props)}
          className="deals-loans-table"
          scroll={{ x: 'max-content' }}
        />
      </TabPane>
      <TabPane tab={<MenuOutlined />} key={VIEW_TYPE_OF_DEAL.GRID}>
        <div className="deals-loans-table-wrapper">
          {documentDetail && (
            <>
              <div
                className={cls({
                  'deals-loans-table-left': !!documentDetail,
                })}
              >
                <HVirtualTable
                  scrollY={1200}
                  bordered={true}
                  scrollToTop={true}
                  className="deals-loans-table"
                  schema={ShortTableSchema}
                />
              </div>
              {dataSource?.length > 0 && (
                <div className="deals-loans-table-right">
                  <div className="deals-loans-table-right__header">
                    <p>
                      {t('Detail information', { vn: 'Thông tin chi tiết' })}
                    </p>
                  </div>

                  <Scrollbars {...{ autoHeight: true, autoHeightMax: 1200 }}>
                    <div className="deals-loans-table-right__content">
                      <EditLoanWithTabPanel />
                    </div>
                  </Scrollbars>
                </div>
              )}
            </>
          )}
        </div>
      </TabPane>
    </Tabs>
  );
};

export default DealLoanView;

const ApplyFilterButton = () => {
  const { t } = useHTranslation('admin-common');
  const advanceSearch = useSubmitSearchForm();

  return (
    <HButton type="primary" onClick={() => advanceSearch()}>
      {t('Apply filter')}
    </HButton>
  );
};
