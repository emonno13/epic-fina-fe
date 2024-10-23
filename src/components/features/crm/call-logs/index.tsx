import { DatePicker, Tag, Timeline } from 'antd';
import moment from 'moment';
import { ExpandableConfig } from 'rc-table/es/interface';
import { useState } from 'react';

import { DownloadOutlined } from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { ListenCallLogPopoverReloadPage } from '@components/shared/stringee/call-logs';
import { downloadFormURI } from '@components/shared/utils/download';
import { tkManager } from '@lib/networks/http';
import { useCurrentUser } from '@lib/providers/auth';
import HSearchForm from '@schema-form/features/search-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useForm } from 'antd/lib/form/Form';
import { useHaveDownloadPermission } from 'dynamic-configuration/hooks';
import {
  HistoryCallIn,
  HistoryCallMissing,
  HistoryCallTransfer,
} from '../../../../icons';
import { ConverterUtils } from '../../../../lib/converter';
import { useHTranslation } from '../../../../lib/i18n';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels';
import { createSchemaItem } from '../../../../schema-form/h-types';
import { HSelect } from '../../../shared/common-form-elements/select';
import {
  CALL_END_CAUSE,
  CALL_END_CAUSE_LABEL_MAPPING,
} from '../../../shared/stringee/constant';
import { DIRECTION_OPTIONS, STATUS_CALL_LOG_SELECT_OPTIONS } from './constant';
import { CallLogsDetailSchemaForm } from './detail-schema-form';
import { CallLogsTableSchema } from './search-result-table-schema';

const { RangePicker } = DatePicker;

export interface CallLogProps {
  belongToId?: string;
  documentIdName?: string;
  useQueryParams?: boolean;
  hiddenValues?: any;
}

export const getDefaultExpandableCallLogManagement = (t) => {
  return {
    expandedRowRender: (callLog: any) => {
      const { callLogs = [] } = callLog;
      if (!callLogs || callLogs.length <= 1) {
        return null;
      }

      return (
        <Timeline className={'call-timeline'}>
          {callLogs.map((callLogItem: any, index: number) => {
            const { endCallCause, answerDuration, transferById, staffId } =
              callLogItem;
            let icon: any;
            const missingEndCallCauses = [
              CALL_END_CAUSE.NO_USER_RESPONSE,
              CALL_END_CAUSE.USER_END_CALL,
              CALL_END_CAUSE.AGENT_BUSY_HERE,
            ];

            if (
              endCallCause &&
              missingEndCallCauses.includes(endCallCause) &&
              !transferById
            ) {
              icon = <HistoryCallMissing />;
            } else if (transferById) {
              icon = <HistoryCallTransfer />;
            } else {
              icon = <HistoryCallIn />;
            }

            const endCallCauseData =
              CALL_END_CAUSE_LABEL_MAPPING[callLogItem.endCallCause];
            const duration =
              callLogItem?.actualAnswerDuration || answerDuration;
            let callSate: any = (
              <Tag
                className={endCallCauseData?.className}
                style={{ borderRadius: 42 }}
              >
                {t(endCallCauseData?.label || 'Không xác định')}
              </Tag>
            );

            if (duration > 0 && !endCallCause && staffId) {
              callSate = (
                <Tag
                  className={'call-state call-state--success'}
                  style={{ borderRadius: 42 }}
                >
                  {t('Kết nối thành công')}
                </Tag>
              );
            }

            return (
              <Timeline.Item
                dot={icon}
                className={'call-timeline__item'}
                key={`call_log_${index}`}
              >
                <div>{callLogItem?.staff?.fullName || ''}</div>
                <div style={{ width: '15%' }}>{callSate}</div>
                <div>
                  {ConverterUtils.fullDatetimeConverter(callLogItem.createdAt)}
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      );
    },
  };
};

const CallLogsManagement = ({
  useQueryParams,
  documentIdName = 'callLogId',
  hiddenValues = {},
}: CallLogProps) => {
  // if (process.env.NEXT_PUBLIC_USED_FCCS_SDK) {
  //   return (<CallLogs/>);
  // }
  const { t } = useHTranslation('admin-common');
  const haveDownloadPermission = useHaveDownloadPermission();
  const currentUser = useCurrentUser();
  const defaultExpandable = getDefaultExpandableCallLogManagement(t);
  const [form] = useForm();
  const [expandable] = useState<ExpandableConfig<any> | undefined>(
    defaultExpandable,
  );
  const handleSearchDataByDate = (data) => {
    if (data.timeRange) {
      const startTime: any = data.timeRange[0];
      const endTime: any = data.timeRange[1];

      data.createdAt = {
        between: [
          new Date(startTime.toDate().setUTCHours(0, 0, 0)).toISOString(),
          new Date(endTime.toDate().setUTCHours(23, 59, 59, 999)).toISOString(),
        ],
      };
    }

    delete data.timeRange;
    return {
      ...data,
    };
  };

  const handleCreateNewDocument = async () => {
    const searchFormValues = form?.getFieldsValue() || {};
    const { createdAt, updatedAt } = searchFormValues;

    if (createdAt)
      searchFormValues.createdAt = FormUtils.getQueryBetweenDays(
        createdAt?.[0],
        createdAt?.[1],
      );

    if (updatedAt)
      searchFormValues.updatedAt = FormUtils.getQueryBetweenDays(
        updatedAt?.[0],
        updatedAt?.[1],
      );

    const filter = {
      where: { ...searchFormValues },
    };
    const filterQueryParam = encodeURIComponent(JSON.stringify(filter));

    try {
      const token = await tkManager.getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STATIC_CDN}/call-logs/export/${currentUser.id}?filter=${filterQueryParam}`,
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
        `[FINA][CALL-LOG] Dữ liệu cuộc gọi ngày ${moment().format('DD MM YYYY')}.xlsx`,
      );
    } catch (err: any) {
      console.log('download users error', err.message);
    }
  };

  return (
    <HFeature
      {...{
        documentIdName,
        useQueryParams,
        featureId: 'call-logs',
        nodeName: 'call-logs',
      }}
    >
      <HSearchForm
        advancedSchema={CallLogAdvancedSearchSchemaDetail}
        onDataReadyToSubmit={handleSearchDataByDate}
        hiddenFields={hiddenValues}
        resetIfSuccess={false}
        withRelations={[
          'user',
          'staff',
          {
            relation: 'callLogs',
            scope: {
              include: [{ relation: 'user' }, { relation: 'staff' }],
            },
          },
          {
            relation: 'queue',
            scope: {
              include: [{ relation: 'greetingFile' }],
            },
          },
        ]}
        hiddenValues={FormUtils.createSearchHiddenValues(hiddenValues)}
        renderRightSuffix={
          <>
            {haveDownloadPermission && (
              <HButton
                {...{
                  size: 'large',
                  shape: 'round',
                  className: 'control-btn m-l-10',
                  onClick: handleCreateNewDocument,
                  icon: <DownloadOutlined />,
                }}
              >
                {t('Export')}
              </HButton>
            )}
          </>
        }
      />
      <HDocumentDrawerPanel>
        <HFeatureForm
          {...{
            schema: CallLogsDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}
        />
      </HDocumentDrawerPanel>
      <HTable schema={CallLogsTableSchema} expandable={expandable} />
      <ListenCallLogPopoverReloadPage />
    </HFeature>
  );
};

export const CallLogAdvancedSearchSchemaDetail = () => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      name: 'direction',
      rowProps: { gutter: { xs: 8, md: 24 } },
      colProps: { span: 6 },
      label: t('Chiều hướng'),
      componentProps: {
        options: DIRECTION_OPTIONS,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'status_call_log',
      colProps: { span: 6 },
      label: t('Trạng thái cuộc gọi'),
      componentProps: {
        options: STATUS_CALL_LOG_SELECT_OPTIONS,
      },
    }),
    createSchemaItem({
      Component: RangePicker,
      name: 'timeRange',
      colProps: { span: 12 },
      label: t('Time range', { vn: 'Khoảng thời gian' }),
      componentProps: {
        style: { width: '100%' },
        locale: {
          lang: {
            locale: 'vi_VN',
            rangePlaceholder: ['Từ ngày', 'Đến ngày'],
          },
        },
        ranges: {
          'Hôm nay': [moment(), moment()],
          'Hôm qua': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
          '7 ngày trước': [moment().subtract(7, 'days'), moment()],
          '30 ngày trước': [moment().subtract(30, 'days'), moment()],
        },
      },
    }),
  ];
};

export default CallLogsManagement;
