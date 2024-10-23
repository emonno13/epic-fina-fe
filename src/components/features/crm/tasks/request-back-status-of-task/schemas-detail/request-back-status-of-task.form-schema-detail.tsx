import { PreViewUser } from '@components/features/fina/deals/deals-component-common/preview-user';
import { HSelect } from '@components/shared/common-form-elements/select';
import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import HCard from '@components/shared/common/h-card';
import {
  TASK_STATUSES,
  TASK_STATUSES_COLOR_MAPPING,
  TASK_TYPES,
} from '@constants/crm/task';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { useIsNewDocument } from '@schema-form/features/hooks/document-detail-hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Col, Input, Row, Tag, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import { isEmpty } from 'underscore';
import { mappingStatusOfTask } from '../../utils';
import {
  mappingStatusOfRequestBackStatusOfTask,
  optionsBackTaskStatus,
  STATUS_REQUEST_BACK_STATUS_OF_TASK,
  useGenerateLabelTaskStatus,
} from '../utils';

const { TextArea } = Input;
const { Text } = Typography;

export const RequestBackStatusOfTaskFormSchemaDetail = (
  props: HFormProps,
): HFormItemProps[] => {
  const { form } = props;

  const { t } = useHTranslation('admin-common');
  const documentDetail = useDocumentDetail();
  const isNewDocument = useIsNewDocument();
  const requiredMessage = ValidationMessages.useRequiredMessage();

  const { statusOfTask, statusAssignOfTask } = documentDetail || {};
  const contentProps = { style: { backgroundColor: '#fff' } };
  const initialValueOfStatus: string | undefined = useMemo(() => {
    let status: string | undefined = undefined;
    if (statusOfTask) {
      status = statusOfTask;
    }

    if (statusAssignOfTask) {
      status += ` ${statusAssignOfTask}`;
    }

    return status;
  }, [statusOfTask, statusAssignOfTask]);

  useEffect(() => {
    form?.setFieldsValue({
      status: initialValueOfStatus,
    });
  }, [initialValueOfStatus]);

  if (
    !isNewDocument &&
    documentDetail.status !== STATUS_REQUEST_BACK_STATUS_OF_TASK.WAIT_PROCESSING
  ) {
    return [
      createSchemaItem({
        Component: () => {
          return (
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <HCard
                  contentProps={{ ...contentProps }}
                  title={t('Task counselling', { vn: 'Yêu cầu tư vấn' })}
                  className={'m-b-20'}
                >
                  <FiledViewer
                    {...{
                      label: t('YCTV'),
                      value: generateLabelTaskElement(documentDetail?.task)
                        ?.label,
                      widthLabel: '25%',
                    }}
                  />

                  <FiledViewer
                    {...{
                      label: t('Customer'),
                      value: <PreViewUser user={documentDetail?.task?.user} />,
                      widthLabel: '25%',
                    }}
                  />

                  <FiledViewer
                    {...{
                      label: t('Staff handling', { vn: 'Nhân viên xử lý' }),
                      value: (
                        <PreViewUser user={documentDetail?.task?.assignee} />
                      ),
                      widthLabel: '25%',
                    }}
                  />
                </HCard>

                <HCard
                  contentProps={{ ...contentProps }}
                  title={t('Request information', { vn: 'Thông tin yêu cầu' })}
                >
                  <FiledViewer
                    {...{
                      label: t('Created by', { vn: 'Người tạo' }),
                      value: <PreViewUser user={documentDetail?.createdBy} />,
                      widthLabel: '25%',
                    }}
                  />

                  <FiledViewer
                    {...{
                      label: t('Status request', { vn: 'Trạng thái YCTV mới' }),
                      value: (
                        <Tag
                          color={
                            TASK_STATUSES_COLOR_MAPPING[
                              documentDetail?.statusOfTask
                            ]
                          }
                        >
                          {mappingStatusOfTask({
                            t,
                            status: documentDetail?.statusOfTask,
                            statusAssign: documentDetail?.statusAssignOfTask,
                          })}
                        </Tag>
                      ),
                      widthLabel: '25%',
                    }}
                  />

                  <FiledViewer
                    {...{
                      label: t('Request message', { vn: 'Tin nhắn yêu cầu' }),
                      value: (
                        <div style={{ maxWidth: 300 }}>
                          {documentDetail?.requestMsg}
                        </div>
                      ),
                      widthLabel: '25%',
                    }}
                  />

                  <FiledViewer
                    {...{
                      label: t('Created at', { vn: 'Tạo lúc' }),
                      value: ConverterUtils.fullDatetimeConverter(
                        documentDetail?.createdAt,
                      ),
                      widthLabel: '25%',
                    }}
                  />

                  <FiledViewer
                    {...{
                      label: t('Updated at', { vn: 'Cập nhật lúc' }),
                      value: ConverterUtils.fullDatetimeConverter(
                        documentDetail?.updatedAt,
                      ),
                      widthLabel: '25%',
                    }}
                  />
                </HCard>
              </Col>
              <Col span={12}>
                <HCard
                  contentProps={{ ...contentProps }}
                  title={t('Response', { vn: 'Phản hồi' })}
                >
                  <FiledViewer
                    {...{
                      label: t('Process by', { vn: 'Người xử lý' }),
                      value: <PreViewUser user={documentDetail?.updatedBy} />,
                      widthLabel: '25%',
                    }}
                  />

                  <FiledViewer
                    {...{
                      label: t('Result', { vn: 'Kết quả' }),
                      value: (
                        <Tag
                          color={
                            mappingStatusOfRequestBackStatusOfTask(
                              documentDetail?.status,
                            )?.color
                          }
                        >
                          {
                            mappingStatusOfRequestBackStatusOfTask(
                              documentDetail?.status,
                            )?.label
                          }
                        </Tag>
                      ),
                      widthLabel: '25%',
                    }}
                  />

                  <FiledViewer
                    {...{
                      label: t('Response message', { vn: 'Tin nhắn phản hồi' }),
                      value: (
                        <div style={{ maxWidth: 300 }}>
                          {documentDetail?.responseMsg}
                        </div>
                      ),
                      widthLabel: '25%',
                    }}
                  />
                </HCard>
              </Col>
            </Row>
          );
        },
      }),
    ];
  }

  return [
    createSchemaItem({
      Component: HSelect,
      name: 'taskId',
      label: t('Task counselling', { vn: 'Yêu cầu tư vấn' }),
      rowProps: { gutter: { xs: 24, sm: 24, md: 24 } },
      colProps: { xs: 24, sm: 24, md: 12 },
      rules: [
        {
          required: true,
          message: requiredMessage(
            t('Task counselling', { vn: 'Yêu cầu tư vấn' }),
          ),
        },
      ],
      componentProps: {
        placeholder: t('Task counselling', { vn: 'Yêu cầu tư vấn' }),
        endpoint: 'tasks/suggestion',
        hiddenValues: {
          status: TASK_STATUSES.DONE,
          type: {
            inq: [
              TASK_TYPES.COUNSELLING,
              TASK_TYPES.INTRODUCE_BUYER,
              TASK_TYPES.WANT_TO_BUY,
            ],
          },
        },
        withRelations: ['user'],
        allowClear: true,
        showSearch: true,
        mode: 'single',
        disabled: isNewDocument,
        optionsConverter: generateLabelTaskElement,
        fieldsValues: ['id', 'code', 'rootTask'],
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'statuses',
      label: t('Status of task', { vn: 'Trạng thái YCTV' }),
      colProps: { xs: 24, sm: 24, md: 12 },
      rules: [
        {
          required: true,
          message: requiredMessage(
            t('Status of task', { vn: 'Trạng thái YCTV' }),
          ),
        },
      ],
      componentProps: {
        placeholder: t('Status of task', { vn: 'Trạng thái YCTV' }),
        options: optionsBackTaskStatus(t),
        optionsConverter: useGenerateLabelTaskStatus,
      },
    }),
    createSchemaItem({
      Component: TextArea,
      name: 'requestMsg',
      rowProps: { gutter: { xs: 24, sm: 24, md: 24 } },
      label: t('Message', { vn: 'Tin nhắn' }),
      componentProps: {
        placeholder: t('Message', { vn: 'Tin nhắn' }),
        rows: 4,
      },
    }),
  ];
};

const generateLabelTaskElement = (
  document,
  optionsConverter: any = undefined,
) => {
  const newDocument = optionsConverter ? optionsConverter(document) : document;
  const user = document?.user || {};
  newDocument.label = (
    <div>
      <span>{`${document?.rootTask} - ${document?.code}`}</span>
      {!isEmpty(user) && (
        <div style={{ fontSize: 13 }}>
          <Text italic type="secondary">
            {ConverterUtils.getFullNameUser(user)}
            {user?.emails
              ? ` - ${ConverterUtils.showUserEmail(user?.emails)}`
              : ''}
          </Text>
        </div>
      )}
    </div>
  );
  return newDocument;
};
