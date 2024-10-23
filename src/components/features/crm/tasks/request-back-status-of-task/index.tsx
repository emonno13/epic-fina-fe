import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useHasPermissions } from '@lib/providers/auth';
import { ValidationMessages } from '@lib/validation-message';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm, {
  HSearchFormWithCreateButton,
} from '@schema-form/features/search-form';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Form, Input, Modal, Tabs } from 'antd';
import { FC, useEffect, useState } from 'react';
import { RequestBackStatusOfTaskDetail } from './request-back-status-of-task-detail';
import { RequestBackStatusOfTaskTableSchemaDetail } from './schemas-detail/request-back-status-of-task.table-schema-detail';
import {
  mappingStatusOfRequestBackStatusOfTask,
  OPTIONS_REQUEST_BACK_STATUS_OF_TASK,
  STATUS_REQUEST_BACK_STATUS_OF_TASK,
  useRequestBackStatusOfTaskTabs,
} from './utils';

const { TabPane } = Tabs;

const RequestBackStatusOfTask: FC = () => {
  const { t } = useHTranslation('admin-common');
  const tabsConfig = useRequestBackStatusOfTaskTabs();
  const hasPermissions = useHasPermissions();
  const [activeTab, setActiveTab] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [searchForm] = Form.useForm();

  const haveBackTaskStatusPermission = hasPermissions([
    tabsConfig.ADMIN.permission,
  ]);

  useEffect(() => {
    setActiveTab(
      haveBackTaskStatusPermission ? tabsConfig.ADMIN.key : tabsConfig.OWN.key,
    );
  }, [haveBackTaskStatusPermission]);

  const advancedSchema = (initialValue: string | undefined = undefined) => [
    createSchemaItem({
      Component: HSelect,
      name: 'status',
      label: t('Status'),
      colProps: { xs: 24, sm: 24, md: 8 },
      initialValue,
      componentProps: {
        placeholder: t('Status'),
        options: OPTIONS_REQUEST_BACK_STATUS_OF_TASK,
        optionsConverter: (document) => {
          const mappingStatus = mappingStatusOfRequestBackStatusOfTask(
            document.value,
          );
          document.label = mappingStatus?.label || '';
          return document;
        },
      },
    }),
  ];

  return (
    <>
      <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        {haveBackTaskStatusPermission && (
          <TabPane key={tabsConfig.ADMIN.key} tab={tabsConfig.ADMIN.tab}>
            {activeTab === tabsConfig.ADMIN.key && (
              <HFeature
                nodeName={'requests-back-task-status'}
                featureId={'requests-back-task-status'}
                documentRelations={[
                  {
                    relation: 'task',
                    scope: {
                      include: [{ relation: 'user' }, { relation: 'assignee' }],
                    },
                  },
                  'createdBy',
                  'updatedBy',
                ]}
                searchForm={searchForm}
              >
                <HSearchForm
                  withRelations={[
                    {
                      relation: 'task',
                      scope: {
                        include: [
                          { relation: 'user' },
                          { relation: 'assignee' },
                        ],
                      },
                    },
                    'createdBy',
                    'updatedBy',
                  ]}
                  advancedSchema={() =>
                    advancedSchema(
                      STATUS_REQUEST_BACK_STATUS_OF_TASK.WAIT_PROCESSING,
                    )
                  }
                  resetIfSuccess={false}
                />
                <RequestBackStatusOfTaskDetail />
                <HTable
                  scroll={{ x: 'max-content' }}
                  schema={() =>
                    RequestBackStatusOfTaskTableSchemaDetail(
                      tabsConfig.ADMIN.key,
                      setVisible,
                      setRequestId,
                      setStatus,
                    )
                  }
                />
              </HFeature>
            )}
          </TabPane>
        )}
        <TabPane key={tabsConfig.OWN.key} tab={tabsConfig.OWN.tab}>
          {activeTab === tabsConfig.OWN.key && (
            <HFeature
              nodeName={'requests-back-task-status'}
              featureId={'requests-back-task-status'}
              documentRelations={[
                {
                  relation: 'task',
                  scope: { include: [{ relation: 'user' }] },
                },
                'createdBy',
                'updatedBy',
              ]}
            >
              <HSearchFormWithCreateButton
                withRelations={[
                  {
                    relation: 'task',
                    scope: { include: [{ relation: 'user' }] },
                  },
                  'createdBy',
                  'updatedBy',
                ]}
                hiddenValues={{
                  filter: { where: { ...tabsConfig.OWN.hiddenValues } },
                }}
                advancedSchema={() => advancedSchema()}
                resetIfSuccess={false}
              />
              <RequestBackStatusOfTaskDetail />
              <HTable
                scroll={{ x: 'max-content' }}
                schema={() =>
                  RequestBackStatusOfTaskTableSchemaDetail(
                    tabsConfig.OWN.key,
                    setVisible,
                    setRequestId,
                    setStatus,
                  )
                }
              />
            </HFeature>
          )}
        </TabPane>
      </Tabs>

      {visible && (
        <ResponseRequestBackStatusOfTaskModal
          {...{ status, visible, setVisible, requestId, searchForm }}
        />
      )}
    </>
  );
};

export default RequestBackStatusOfTask;

const ResponseRequestBackStatusOfTaskModal = ({
  status,
  visible,
  setVisible,
  requestId,
  searchForm,
}) => {
  const { t } = useHTranslation('admin-common');
  const [form] = Form.useForm();
  const requiredMessage = ValidationMessages.useRequiredMessage();

  const responseMessageSchema = [
    createSchemaItem({
      Component: Input.TextArea,
      name: 'responseMsg',
      label: t('Response message', { vn: 'Tin nhắn phản hồi' }),
      rowProps: { gutter: { xs: 24, sm: 24, md: 24 } },
      colProps: { xs: 24, sm: 24, md: 24 },
      componentProps: {
        placeholder: t('Response message', { vn: 'Tin nhắn phản hồi' }),
        rows: 4,
      },
    }),
  ];

  const statusRequestSchema = (status) => {
    return [
      createSchemaItem({
        Component: HSelect,
        name: 'status',
        initialValue: status,
        colProps: { xs: 24, sm: 24, md: 24 },
        label: t('Status'),
        rules: [{ required: true, message: requiredMessage(t('Status')) }],
        componentProps: {
          disabled: true,
          options: OPTIONS_REQUEST_BACK_STATUS_OF_TASK,
          optionsConverter: (document) => {
            const mappingStatus = mappingStatusOfRequestBackStatusOfTask(
              document.value,
            );
            document.label = mappingStatus?.label || '';
            return document;
          },
        },
      }),
    ];
  };

  return (
    <Modal
      title={t('Respone', { vn: 'Phản hồi' })}
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={() => form?.submit()}
    >
      <HForm
        schema={() => [
          ...responseMessageSchema,
          ...statusRequestSchema(status),
        ]}
        form={form}
        hideControlButton={true}
        method={'put'}
        endpoint={endpoints.generateNodeEndpoint(
          `requests-back-task-status/${requestId}`,
        )}
        useDefaultMessage={true}
        onGotSuccess={() => {
          setVisible(false);
          searchForm?.submit();
        }}
      />
    </Modal>
  );
};
