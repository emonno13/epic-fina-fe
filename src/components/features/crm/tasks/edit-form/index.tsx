import {
  HistoryOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HSelect } from '@components/shared/common-form-elements/select';
import { HModal } from '@components/shared/common/h-modal';
import { useCheckRoleFinaStaff } from '@dynamic-configuration/hooks';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth, usePermissions } from '@lib/providers/auth';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Form, notification, Tabs } from 'antd';
import {
  ADMIN_PERMISSIONS,
  TASK_ACTIVE_KEY_TABS,
  TASK_STATUSES,
  TASK_STATUSES_ASSIGNED,
} from 'constants/crm/task';
import { isNil } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { CallLogs } from '../../crm-routes';
import TaskAssignManagement from '../../task-assign';
import { ComposeLetterOfCreditModal } from '../compose-letter-of-credit-modal';
import {
  MAPPING_PRODUCT_TYPES_TO_TYPE_TASK,
  PRODUCT_TYPES,
  USER_TYPES,
  USER_TYPES_MAPPING,
} from '../constans';
import Feedbacks from '../feedback';
import TaskDetailSurveyForm from '../survey-form';
import ShareInfoWithBank from '../survey-form/share-info-with-bank';
import { TASK_PRODUCT_TYPES, TASK_TYPE } from '../utils';
import CreateDealLoan from './create-deal-loan';
import { EditTaskSchemaForm } from './edit-task-schema-form';
import EnterFinishRequestCounsellingReasonModal from './finish-request-counselling/confirm-request-counselling-reason-modal';
import FooterControlWithEndCounsellingRequest from './finish-request-counselling/footer-control-with-end-counselling-request';

import './edit-task-form.module.scss';

const { TabPane } = Tabs;

export const TaskDetails = (props) => {
  const { t } = useHTranslation('admin-common');
  const { currentUser } = useAuth();
  const task = useDocumentDetail();
  const isFinaStaff = useCheckRoleFinaStaff();
  const [isShowShareInfoButton, setIsShowShareInfoButton] =
    useState<boolean>(false);
  const [
    isVisibleFinishRequestCounselling,
    setIsVisibleFinishRequestCounselling,
  ] = useState<boolean>(false);
  const [isVisibleComposeLetter, setIsVisibleComposeLetter] =
    useState<boolean>(false);
  const [isVisibleCreateLoan, setIsVisibleCreateLoan] =
    useState<boolean>(false);
  const [visibleShareInfoWithBank, setVisibleShareInfoWithBank] =
    useState<boolean>(false);
  const [isShowModalCloneTask, setIsShowModalCloneTask] =
    useState<boolean>(false);
  const [formCloneTask] = Form.useForm();

  const [activeTab, setActiveTab] = useState<string>(
    TASK_ACTIVE_KEY_TABS.TASK_INFORMATION,
  );
  const [surveyQuestionForm] = Form.useForm();
  const [formShare] = Form.useForm();
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const permissions = [
    ADMIN_PERMISSIONS.SITE_OWNER,
    ADMIN_PERMISSIONS.SUPPER_ADMIN,
    ADMIN_PERMISSIONS.ADMIN,
  ];
  const allowed = usePermissions(permissions);
  const documentDetail = useDocumentDetail();

  const isVisibleButtonComposeLetter =
    isFinaStaff && task?.statusAssign === TASK_STATUSES_ASSIGNED.NOT_PROCESSING;
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const isCustomer = currentUser.type === USER_TYPES.customer;
  const isCollaboratorFina = currentUser.type === USER_TYPES.collaborator;
  const type = currentUser?.type;
  const staffAssign = allowed || task?.assigneeId === currentUser?.id;

  const handleCreditOfferLetterPreview = () => {
    surveyQuestionForm?.submit();
  };

  const initialValues = {
    type: TASK_TYPE.counselling,
    sourceId: currentUser.id,
    rootTask: USER_TYPES_MAPPING[type],
    startAt: moment(),
  };

  const documentDrawerPanelProps = {
    destroyOnClose: true,
    hiddenDocumentButtonControls: isCollaboratorFina && task?.assigneeId,
  };

  useEffect(() => {
    setIsShowShareInfoButton(
      task?.status === TASK_STATUSES.CONSULTED &&
        [
          TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE,
          TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL,
          TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS,
          TASK_STATUSES_ASSIGNED.NOT_PROCESSING,
        ].includes(task?.statusAssign) &&
        task?.surveyResultId &&
        task?.productId &&
        isFinaStaff,
    );
  }, [
    task?.status,
    task?.statusAssign,
    task?.surveyResultId,
    task?.productId,
    isFinaStaff,
  ]);

  useEffect(() => {
    setSelectedProductId(task?.productId);
  }, [task?.productId]);

  if (!task?.id) {
    return (
      <HDocumentDrawerPanel destroyOnClose={true}>
        <HFeatureForm
          {...{
            initialValues,
            schema: EditTaskSchemaForm,
            hideSubmitAndContinueButton: true,
            onDataReadyToSubmit: (saveRecord) => {
              delete saveRecord.reasonCloseTask;
              if (saveRecord?.productType) {
                saveRecord.type =
                  MAPPING_PRODUCT_TYPES_TO_TYPE_TASK[saveRecord?.productType];
              }
              return saveRecord;
            },
          }}
        />
      </HDocumentDrawerPanel>
    );
  }

  return (
    <HDocumentDrawerPanel
      {...documentDrawerPanelProps}
      footer={
        activeTab === TASK_ACTIVE_KEY_TABS.CALL_LOG ||
        [TASK_STATUSES_ASSIGNED.CREATE_PROFILE].includes(task?.statusAssign) ||
        !staffAssign ? (
          <></>
        ) : task?.status === TASK_STATUSES.DONE ? (
          <div className="footer-control-custom">
            {staffAssign && (
              <HButton
                className={'m-r-10'}
                type={'primary'}
                onClick={() => setIsShowModalCloneTask(true)}
              >
                Sao chép yêu cầu tư vấn
              </HButton>
            )}
          </div>
        ) : (
          <FooterControlWithEndCounsellingRequest
            {...documentDrawerPanelProps}
            {...{
              setIsVisibleFinishRequestCounselling,
              setIsVisibleComposeLetter,
              isVisibleButtonComposeLetter,
              isShowShareInfoButton,
              setVisibleShareInfoWithBank,
              handleCreditOfferLetterPreview,
              setIsVisibleCreateLoan,
            }}
          />
        )
      }
    >
      <HModal
        {...{
          visible: isShowModalCloneTask,
          onCancel: () => setIsShowModalCloneTask(false),
          footer: null,
          width: 400,
        }}
      >
        <div className="task-edit-modal-clone">
          <p className="task-edit-modal-clone-title">
            * Chức năng sao chép sẽ tạo ra 1 yêu cầu tư vấn mới với phân loại
            được chọn.{' '}
          </p>
          <HForm
            {...{
              form: formCloneTask,
              method: 'put',
              endpoint: endpoints.generateNodeEndpoint(
                `/tasks/${documentDetail?.id}`,
              ),
              schema: () => [
                createSchemaItem({
                  Component: HSelect,
                  label: t('Classify', { vn: 'Phân loại' }),
                  rules: [
                    {
                      required: true,
                      message: 'Phân loại là bắt buộc',
                    },
                  ],
                  colProps: { xs: 24, sm: 24, md: 24 },
                  rowProps: { gutter: { xs: 24, md: 24 } },
                  name: 'productType',
                  componentProps: {
                    placeholder: t('Please enter classify', {
                      vn: 'Phân loại',
                    }),
                    options: PRODUCT_TYPES(t),
                  },
                }),
              ],
              onDataReadyToSubmit: (values) => {
                return {
                  isCreateNewTask: true,
                  status: TASK_STATUSES.DONE,
                  productType: values?.productType,
                  type: MAPPING_PRODUCT_TYPES_TO_TYPE_TASK[values?.productType],
                };
              },
              onGotSuccess: () => {
                formCloneTask.resetFields();
                setIsShowModalCloneTask(false);
                notification.success({
                  message: t('Copy successful !', {
                    vn: 'Sao chép thành công !',
                  }),
                });
              },
              initialValues: { productType: documentDetail?.productType },
              hideSubmitAndContinueButton: true,
              submitButtonLabel: 'Sao chép',
            }}
          />
        </div>
      </HModal>

      <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <span>
              <MenuUnfoldOutlined />
              {t('Task Information', { vn: 'Thông tin nhiệm vụ' })}
            </span>
          }
          key={TASK_ACTIVE_KEY_TABS.TASK_INFORMATION}
        >
          {activeTab === TASK_ACTIVE_KEY_TABS.TASK_INFORMATION && (
            <>
              <HFeatureForm
                {...{
                  schema: EditTaskSchemaForm,
                  initialValues,
                  onDataReadyToSubmit: (saveRecord) => {
                    if (isNil(saveRecord.assignToPartnerId)) {
                      saveRecord.assignToPartnerId = '';
                    }

                    delete saveRecord.reasonCloseTask;

                    if (task?.productType !== saveRecord?.productType) {
                      saveRecord.surveyResultId = '';
                      saveRecord.questionGroupId = '';
                    }

                    if (saveRecord?.productType) {
                      saveRecord.type =
                        MAPPING_PRODUCT_TYPES_TO_TYPE_TASK[
                          saveRecord?.productType
                        ];
                    }

                    return saveRecord;
                  },
                  transport: {
                    setIsVisibleCreateLoan,
                  },
                }}
              />
            </>
          )}
        </TabPane>
        <TabPane
          tab={
            <span>
              <QuestionCircleOutlined />
              Câu hỏi khảo sát
            </span>
          }
          key={TASK_ACTIVE_KEY_TABS.SURVEY_QUESTION}
        >
          {activeTab === TASK_ACTIVE_KEY_TABS.SURVEY_QUESTION && (
            <TaskDetailSurveyForm
              {...{
                setIsShowShareInfoButton,
                visibleShareInfoWithBank,
                setVisibleShareInfoWithBank,
                surveyQuestionForm,
                setSelectedProductId,
                selectedProductId,
                formShare,
              }}
            />
          )}
        </TabPane>
        {isOrgStaff && (
          <TabPane
            tab={
              <span>
                <PhoneOutlined />
                {t('Call logs', { vn: 'Lịch sử cuộc gọi' })}
              </span>
            }
            key={TASK_ACTIVE_KEY_TABS.CALL_LOG}
          >
            {activeTab === TASK_ACTIVE_KEY_TABS.CALL_LOG && (
              <CallLogs
                {...{
                  useQueryParams: false,
                  documentIdName: 'callLogId',
                  hiddenValues: {
                    belongToId: task?.id,
                  },
                }}
              />
            )}
          </TabPane>
        )}
        {isOrgStaff && (
          <TabPane
            tab={
              <span>
                <HistoryOutlined />
                {t('Lịch sử chia sẻ task')}
              </span>
            }
            key={TASK_ACTIVE_KEY_TABS.TASK_ASSIGN}
          >
            {activeTab === TASK_ACTIVE_KEY_TABS.TASK_ASSIGN && (
              <TaskAssignManagement
                {...{
                  hiddenValues: {
                    taskId: task?.id,
                  },
                }}
              />
            )}
          </TabPane>
        )}
        {(isCustomer || isOrgStaff || isCollaboratorFina) &&
          documentDetail?.productType === TASK_PRODUCT_TYPES.loan && (
            <TabPane
              tab={
                <span>
                  <MailOutlined />
                  {t('Feedbacks from banks', { vn: 'Phản hồi của ngân hàng' })}
                </span>
              }
              key={TASK_ACTIVE_KEY_TABS.FEEDBACK}
            >
              {activeTab === TASK_ACTIVE_KEY_TABS.FEEDBACK && <Feedbacks />}
            </TabPane>
          )}
      </Tabs>
      <EnterFinishRequestCounsellingReasonModal
        {...{
          isVisibleFinishRequestCounselling,
          setIsVisibleFinishRequestCounselling,
        }}
      />
      <ComposeLetterOfCreditModal
        {...{
          isVisibleComposeLetter,
          setIsVisibleComposeLetter,
          taskId: task?.id,
          handleCreditOfferLetterPreview,
        }}
      />
      <ShareInfoWithBank
        {...{
          visibleShareInfoWithBank,
          setVisibleShareInfoWithBank,
          surveyQuestionForm,
          formShare,
          selectedProductId,
        }}
      />
      <CreateDealLoan
        {...{
          isVisibleCreateLoan,
          setIsVisibleCreateLoan,
        }}
      />
    </HDocumentDrawerPanel>
  );
};
