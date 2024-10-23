import { AnyObject } from '@components/shared/atom/type';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { UpdateUserDrawer } from '@components/shared/update-user-drawer';
import { CloseIconSvg, FilterIconSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { HFeature, HTable } from '@schema-form/features';
import { useSearchForm } from '@schema-form/features/hooks';
import HSearchForm, { CreateButton } from '@schema-form/features/search-form';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { FormUtils, RelationUtils } from '@schema-form/utils/form-utils';
import { Form, FormInstance, Input, Row, Tabs } from 'antd';
import classNames from 'classnames';
import { TASK_TYPES } from 'constants/crm/task';
import { useHaveDownloadPermission } from 'dynamic-configuration/hooks';
import pick from 'lodash/pick';
import React, { memo, useState } from 'react';
import { AdvanceSearchTaskSchema } from './advance-search-task-schema';
import {
  ApplyFilterButton,
  ExportTaskButton,
  TaskManagerContext,
} from './components';
import { dataTabForStaff, dataTabForTeller, USER_TYPES } from './constans';
import { TaskDetails } from './edit-form';
import { useGetBelongOrgTypeForTask, useGetTypeForTask } from './hooks';
import { ReopenTaskCounselling } from './reopen-task-counselling';
import { TasksTableSchema } from './search-result-table-schema';
import { mappingPropsTabForTasks } from './utils';
import TaskTeller from './view-teller';

import './task.module.scss';
const { TabPane } = Tabs;

export const TaskManager = ({
  type = undefined,
  featureId = 'tasks',
  status = undefined,
  statusAssign = undefined,
}) => {
  const { t } = useHTranslation('admin-common');
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);
  const [visibleReopen, setVisibleReopen] = useState<boolean>(false);
  const [documentReopen, setDocumentReopen] = useState<AnyObject>();
  const [isVisibleUserUpdate, setIsVisibleUserUpdate] =
    useState<boolean>(false);
  const [selectedUserUpdate, setSelectedUserUpdate] = useState<AnyObject>({});

  const belongOrgType = useGetBelongOrgTypeForTask();
  const {
    isTeller,
    isCollaboratorFina,
    type: newType,
    renderTab,
  } = useGetTypeForTask(type);

  const [searchForm] = Form.useForm();

  const whereConditions = { belongOrgType, type: newType };
  const generateTabItems = () => {
    if (isCollaboratorFina) {
      return <TabPane tab={t('Counselling')} key={TASK_TYPES.COUNSELLING} />;
    }

    if (!isTeller) {
      return dataTabForStaff.map((tabKey) => {
        const tabData = mappingPropsTabForTasks(tabKey);
        if (!tabData.tab || !tabData.key) {
          return null;
        }

        return <TabPane tab={t(tabData.tab)} key={tabData.key} />;
      });
    }

    return null;
  };

  const handleTabChange = (tabKey) => {
    const where = mappingPropsTabForTasks(tabKey);
    searchForm?.setFieldsValue({
      status: undefined,
      statusAssign: undefined,
      ...pick(where, ['status', 'statusAssign']),
    });
    searchForm?.submit();
  };

  const advancedTabSchema = () => {
    if (!renderTab) {
      return null;
    }

    return [
      createSchemaItem({
        Component: Tabs,
        colProps: { span: 24 },
        name: 'setStatus',
        ignore: true,
        componentProps: {
          onChange: handleTabChange,
          children: generateTabItems(),
          className: 'tabs-custom-filter',
          destroyInactiveTabPane: true,
        },
      }),
    ];
  };

  return (
    <TaskManagerContext.Provider
      value={{
        visibleReopenTask: visibleReopen,
        setVisibleReopenTask: setVisibleReopen,
        documentSelected: documentReopen,
        setDocumentSelected: setDocumentReopen,
      }}
    >
      <HFeature
        {...{
          featureId,
          nodeName: 'tasks',
          searchForm,
          documentRelations: ['reasonCloseTask'],
        }}
      >
        <HSearchForm
          annotate={true}
          withRelations={[
            RelationUtils.entity('user', RelationUtils.fieldsInUserRelation()),
            RelationUtils.entity(
              'assignee',
              RelationUtils.fieldsInUserRelation(),
            ),
            'reasonCloseTask',
          ]}
          advancedSchema={AdvancedSchemaSearchForm}
          advancedTabSchema={advancedTabSchema}
          renderRightSuffix={
            <RightActionSearchForm
              status={status}
              statusAssign={statusAssign}
              searchForm={searchForm}
            />
          }
          hiddenValues={{
            filter: {
              where: { ...whereConditions },
              fields: [
                'id',
                'code',
                'userId',
                'assigneeId',
                'rootTask',
                'productType',
                'status',
                'statusAssign',
                'type',
                'orgId',
                'projectId',
                'note',
                'subject',
                'priority',
                'reasonCloseTaskId',
                'createdAt',
                'updatedAt',
              ],
            },
          }}
          resetIfSuccess={false}
          className="search-task-form"
          renderLeftSuffix={
            <LeftActionSearchForm setIsShowFilter={setIsShowFilter} />
          }
          placeholder={t(
            'Enter information about: code, customer, source, staff FINA',
            { vn: 'Nhập thông tin về: mã, khác hàng, nguồn, nhân viên xử lý' },
          )}
        />
        <TaskDetails />
        <ReopenTaskCounselling />
        <div className="manager-table">
          {isShowFilter && (
            <SearchFormAdvanced setIsShowFilter={setIsShowFilter} />
          )}

          <div
            className={classNames('table-of-task', {
              'width-full': !isShowFilter,
            })}
          >
            <HTable
              scroll={{ x: 'max-content' }}
              schema={() =>
                TasksTableSchema({
                  setIsVisibleUserUpdate,
                  setSelectedUserUpdate,
                })
              }
            />
          </div>
        </div>
      </HFeature>
      <UpdateUserDrawer
        setIsVisibleUserUpdate={setIsVisibleUserUpdate}
        isVisibleUserUpdate={isVisibleUserUpdate}
        selectedUserUpdate={selectedUserUpdate}
        setSelectedUserUpdate={setSelectedUserUpdate}
      />
    </TaskManagerContext.Provider>
  );
};

const Task = () => {
  const currentUser = useCurrentUser();
  const isCollaboratorFina = currentUser.type === USER_TYPES.collaborator;
  const isTeller = currentUser.type === USER_TYPES.teller;

  if (!isTeller || isCollaboratorFina) {
    return <TaskManager />;
  }

  if (isTeller) {
    return (
      <Tabs destroyInactiveTabPane={true} className="tabs-custom-filter">
        {dataTabForTeller.map((item) => {
          const data = mappingPropsTabForTasks(item);
          return (
            <TabPane tab={data?.tab} key={item}>
              <TaskTeller {...{ featureId: item, status: item }} />
            </TabPane>
          );
        })}
      </Tabs>
    );
  }

  return <></>;
};
export default Task;

const RightActionSearchForm = memo(
  ({
    statusAssign,
    searchForm,
    status,
  }: {
    statusAssign?: string;
    status?: string;
    searchForm: FormInstance;
  }) => {
    const haveDownloadPermission = useHaveDownloadPermission();
    return (
      <Row>
        <CreateButton />
        {haveDownloadPermission && (
          <ExportTaskButton
            searchForm={searchForm}
            statusAssign={statusAssign}
            status={status}
          />
        )}
      </Row>
    );
  },
);

const LeftActionSearchForm = memo(
  ({
    setIsShowFilter,
  }: {
    setIsShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return (
      <HButton
        {...{
          onClick: () => setIsShowFilter((prevState) => !prevState),
          className: 'btn-filter',
        }}
      >
        <FilterIconSvg />
      </HButton>
    );
  },
);

const SearchFormAdvanced = memo(
  ({
    setIsShowFilter,
  }: {
    setIsShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const { t } = useHTranslation('admin-common');
    const searchForm = useSearchForm();
    const [filterForm] = Form.useForm();

    const handleApplyFilter = () => {
      const filterValues = filterForm?.getFieldsValue();
      const searchFormValues = searchForm?.getFieldsValue();
      console.log('searchFormValues: ', searchFormValues);
      console.log('filterValues: ', filterValues);
      searchForm?.setFieldsValue({
        ...searchFormValues,
        ...filterValues,
        createdAt: FormUtils.getQueryBetweenDays(
          filterValues?.createdAt?.[0],
          filterValues?.createdAt?.[1],
        ),
        updatedAt: FormUtils.getQueryBetweenDays(
          filterValues?.updatedAt?.[0],
          filterValues?.updatedAt?.[1],
        ),
      });
      searchForm?.submit();
    };

    return (
      <div className="tasks-filter">
        <div className="title-advanced-filter">
          <div className="title">{t('advancedFilter')}</div>
          <CloseIconSvg
            onClick={() => setIsShowFilter((prevState) => !prevState)}
            className="cursor-pointer"
          />
        </div>
        <HForm
          {...{
            form: filterForm,
            schema: AdvanceSearchTaskSchema,
            resetIfSuccess: false,
            hideControlButton: true,
            className: 'filter-form',
          }}
        />
        <div className="wrapper-btn-apply-filter">
          <ApplyFilterButton onSubmit={handleApplyFilter} />
        </div>
      </div>
    );
  },
);

const AdvancedSchemaSearchForm = () => {
  return [
    createSchemaItem({
      Component: Input,
      name: 'status',
      className: 'display-none-i',
    }),
    createSchemaItem({
      Component: Input,
      name: 'statusAssign',
      className: 'display-none-i',
    }),
    createSchemaItem({
      Component: Input,
      name: 'rootTask',
      className: 'display-none-i',
    }),
    createSchemaItem({
      Component: Input,
      className: 'display-none-i',
      name: 'assigneeId',
    }),
    createSchemaItem({
      Component: Input,
      className: 'display-none-i',
      name: 'productType',
    }),
    createSchemaItem({
      Component: Input,
      className: 'display-none-i',
      name: 'createdAt',
    }),
    createSchemaItem({
      Component: Input,
      className: 'display-none-i',
      name: 'updatedAt',
    }),
  ];
};
