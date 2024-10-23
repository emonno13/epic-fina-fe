import { Tag } from 'antd';
import { useState } from 'react';

import { TableUtils } from '@lib/table-utils';
import { ConverterUtils } from '../../../../../lib/converter';
import { HButton } from '../../../../shared/common-form-elements/h-confirmation-button';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import { EditTaskViewTellerModal } from './edit-task-view-teller-modal';
import { RejectTaskViewTellerModal } from './reject-task-view-teller-modal';

import { SurveyResultBase } from '.';
import {
  CODE_QUERY_NOTE_VIEW_LABEL_MAPPING,
  TASK_RESPONSE_STATUS,
  TASK_RESPONSE_STATUS_COLOR_MAPPING,
  TASK_RESPONSE_STATUS_LABEL_MAPPING,
} from '../../../../../constants/crm/task';
import { FormatterUtils } from '../../../../../lib/formatter';
import { useHTranslation } from '../../../../../lib/i18n';

export const TaskTellerViewTable = ({ searchForm, maxPeopleReceived }) => {
  const { t } = useHTranslation('admin-common');
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);
  const [isVisibleReject, setIsVisibleReject] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string>('');

  const handleButtonClickReceive = (taskId) => {
    setCurrentTaskId(taskId);
    setIsVisibleUpdate(true);
  };

  const handleButtonClickReject = (taskId) => {
    setCurrentTaskId(taskId);
    setIsVisibleReject(true);
  };

  return [
    TableUtils.createTableColumnConfig({
      title: t('Information'),
      sortable: true,
      dataIndex: 'surveyDetails',
      key: 'surveyDetails',
      render: (surveyDetails, _) => <SurveyResultBase {...{ surveyDetails }} />,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Note'),
      sortable: true,
      dataIndex: 'note',
      key: 'note',
      render: (note, _) => (
        <div>
          {note?.map((item) => {
            if (!item || !Object.values(item)) {
              return null;
            }
            return (
              <ItemViewer
                key={Object.keys(item).toString()}
                {...{
                  label:
                    CODE_QUERY_NOTE_VIEW_LABEL_MAPPING[
                      Object.keys(item).toString()
                    ],
                  value: <span>{Object.values(item)}</span>,
                }}
              />
            );
          })}
          <span></span>
        </div>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Last update'),
      dataIndex: 'sharedAt',
      responsive: ['md'],
      sortable: true,
      render: (sharedAt, record) => {
        return (
          <div>
            {sharedAt && (
              <ItemViewer
                {...{
                  label: 'Thời gian chia sẻ:',
                  value: (
                    <span>
                      {ConverterUtils.fullDatetimeConverter(sharedAt)}
                    </span>
                  ),
                }}
              />
            )}

            {record?.responseDate &&
              record?.responseStatus === TASK_RESPONSE_STATUS.RECEIVED && (
                <ItemViewer
                  {...{
                    label: 'Thời gian cần xử lý:',
                    value: (
                      <span>
                        {ConverterUtils.fullDatetimeConverter(
                          record?.responseDate,
                        )}
                      </span>
                    ),
                  }}
                />
              )}
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'totalPeopleReceive',
      key: 'totalPeopleReceive',
      responsive: ['md'],
      render: (totalPeopleReceive, document) => {
        return (
          <div>
            <Tag
              color={
                TASK_RESPONSE_STATUS_COLOR_MAPPING[
                  document?.responseStatus ||
                    TASK_RESPONSE_STATUS.WAITING_TO_RECEIVE
                ]
              }
            >
              {t(
                TASK_RESPONSE_STATUS_LABEL_MAPPING[
                  document?.responseStatus ||
                    TASK_RESPONSE_STATUS.WAITING_TO_RECEIVE
                ],
              )}
            </Tag>
            <br />
            {/*<span>{totalPeopleReceive}/{maxPeopleReceived} phản hồi</span>*/}
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Content responded', { vn: 'Nội dung phản hồi' }),
      dataIndex: 'content',
      key: 'content',
      render: (content) => {
        if (!content) return '_';
        return (
          <>
            <ItemViewer
              {...{
                label: t('Borrow time:', { vn: 'Thời gian vay:' }),
                value: content?.borrowTime
                  ? content?.borrowTime + ' tháng'
                  : '_',
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Loan demand:', { vn: 'Số tiền vay:' }),
                value: content?.loanDemand
                  ? FormatterUtils.formatAmount(content.loanDemand, 'VND')
                  : '_',
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Preferential time:', { vn: 'Thời gian ưu đãi' }),
                value: content?.preferentialTime
                  ? content?.preferentialTime + ' năm'
                  : '_',
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Interest rate:', { vn: 'Lãi suất ưu đãi:' }),
                value: content?.interestRate
                  ? `${content?.interestRate}%`
                  : '_',
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Prepaid term fee:', { vn: 'Phí trả trước hạn:' }),
                value: content?.prepaidTermFee
                  ? FormatterUtils.formatAmount(content.prepaidTermFee, 'VND')
                  : '_',
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Property Valuation:', { vn: 'Định giá TS sơ bộ:' }),
                value: content?.propertyValuation
                  ? `${content?.propertyValuation}`
                  : '_',
                labelClassName: 'm-b-0i',
              }}
            />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Bank note:', { vn: 'Ghi chú của ngân hàng:' }),
      dataIndex: 'bankNote',
      key: 'bankNote',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Hành động',
      dataIndex: 'responseStatus',
      width: 100,
      render: (responseStatus, document) => {
        const taskId = document?.taskId || '';
        const totalPeopleReceive = document?.totalPeopleReceive;
        {
          switch (responseStatus) {
            case TASK_RESPONSE_STATUS.RECEIVED:
              return <></>;
            case TASK_RESPONSE_STATUS.REJECT:
              return <></>;
            default:
              return (
                <div>
                  <HButton
                    {...{
                      type: 'primary',
                      colProps: { span: 8 },
                      onClick: () => handleButtonClickReceive(taskId),
                      disabled:
                        totalPeopleReceive >= maxPeopleReceived ? true : false,
                    }}
                  >
                    Tiếp nhận
                  </HButton>
                  <br />
                  <HButton
                    {...{
                      onClick: () => handleButtonClickReject(taskId),
                      className: 'reject__button',
                      danger: true,
                      disabled:
                        totalPeopleReceive >= maxPeopleReceived ? true : false,
                    }}
                  >
                    Từ chối
                  </HButton>
                  {isVisibleUpdate && taskId === currentTaskId && (
                    <EditTaskViewTellerModal
                      {...{
                        isVisibleUpdate,
                        searchForm,
                        taskId,
                        setIsVisibleUpdate,
                      }}
                    />
                  )}
                  {isVisibleReject && taskId === currentTaskId && (
                    <RejectTaskViewTellerModal
                      {...{
                        isVisibleReject,
                        searchForm,
                        taskId,
                        setIsVisibleReject,
                      }}
                    />
                  )}
                </div>
              );
          }
        }
      },
    }),
  ];
};
