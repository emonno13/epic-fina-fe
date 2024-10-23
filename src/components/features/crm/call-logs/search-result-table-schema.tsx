import { Popover, Tag } from 'antd';
import ReactAudioPlayer from 'react-audio-player';

import { ExpandNoteSvg } from '@icons';
import { CallPhoneFcssSDKConvert } from '@lib/fccs-sdk-convert';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { ConverterUtils } from '../../../../lib/converter';
import { HImg } from '../../../shared/common/h-img';
import {
  CALL_DIRECTION,
  CALL_END_CAUSE,
  CALL_END_CAUSE_LABEL_MAPPING,
} from '../../../shared/stringee/constant';

import './call-log.scss';

export const CallLogsTableSchema = (props?: any) => {
  const showShort = props?.showShort;
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Direction', { vn: 'Chiều hướng' }),
      dataIndex: 'direction',
      sortable: true,
      key: 'direction',
      width: 130,
      render: (direction, callLog) => {
        const { endCallCause } = callLog;
        const missingEndCallCauses = [
          CALL_END_CAUSE.NO_USER_RESPONSE,
          CALL_END_CAUSE.USER_END_CALL,
          CALL_END_CAUSE.TEMPORARILY_UNAVAILABLE,
        ];
        if (endCallCause && missingEndCallCauses.includes(endCallCause)) {
          return (
            <div className={'direction-call'}>
              <HImg
                fileName={'call-missing.svg'}
                className={'direction-call__icon'}
              />
            </div>
          );
        }

        const iconName =
          direction === CALL_DIRECTION.CALL_OUT
            ? 'call-out.svg'
            : 'call-in.svg';
        return (
          <div className={'direction-call'}>
            <HImg fileName={iconName} className={'direction-call__icon'} />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Staff'),
      dataIndex: 'staff',
      sortable: true,
      key: 'staff',
      render: (staff) => <div>{ConverterUtils.getFullNameUser(staff)}</div>,
    }),
    ...(!showShort
      ? [
          TableUtils.createTableColumnConfig({
            title: t('Customer'),
            dataIndex: 'user',
            sortable: true,
            key: 'user',
            render: (user, record) => {
              const isCallIn = record.direction === CALL_DIRECTION.CALL_IN;
              const customerPhoneCall = isCallIn
                ? record.fromNumber
                : record.toNumber;
              return (
                <div>
                  {ConverterUtils.getFullNameUser(user)}
                  <CallPhoneFcssSDKConvert
                    {...{
                      phoneNumber:
                        FormatterUtils.getCorrectPhoneNumber(customerPhoneCall),
                      userInfo: user,
                      showPhoneNumber: false,
                      belongToId: record?.belongToId,
                    }}
                  />
                </div>
              );
            },
          }),
        ]
      : []),
    TableUtils.createTableColumnConfig({
      title: t('Trạng thái cuộc gọi'),
      dataIndex: 'answerDuration',
      render: (answerDuration, callLog) => {
        const endCallCause = CALL_END_CAUSE_LABEL_MAPPING[callLog.endCallCause];
        const duration = callLog?.actualAnswerDuration || answerDuration;
        const { staffId } = callLog;
        if (duration > 0 && !endCallCause && staffId) {
          return (
            <Tag
              className={'call-state call-state--success'}
              style={{ borderRadius: 42 }}
            >
              {t('Kết nối thành công')}
            </Tag>
          );
        }

        return (
          <Tag className={endCallCause?.className} style={{ borderRadius: 42 }}>
            {t(endCallCause?.label || 'Không xác định')}
          </Tag>
        );
      },
      sortable: true,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Calling time', { vn: 'Thời gian gọi' }),
      dataIndex: 'startTime',
      sortable: true,
      key: 'startTime',
      render: (startTime: any, callLog: any) => {
        const actualStartTime = callLog.createdAt;
        return ConverterUtils.fullDatetimeConverter(actualStartTime);
      },
    }),
    ...(!showShort
      ? [
          {
            title: t('Duration', { vn: 'Độ dài cuộc gọi(s)' }),
            dataIndex: 'answerDuration',
            key: 'answerDuration',
            width: 150,
            render: (answerDuration, callLog) => {
              const { endCallCause } = callLog;
              if (
                (endCallCause &&
                  (
                    [
                      CALL_END_CAUSE.NO_USER_RESPONSE,
                      CALL_END_CAUSE.USER_BUSY,
                      CALL_END_CAUSE.NO_ANSWER,
                    ] as any
                  ).includes(endCallCause)) ||
                !callLog?.answerTime ||
                !callLog?.stopTime
              ) {
                return '0s';
              }

              return (
                <span>
                  {Math.round(
                    ((callLog?.stopTime || 0) - (callLog?.answerTime || 0)) /
                      1000,
                  )}
                  s
                </span>
              );
            },
          },
        ]
      : []),
    ...(!showShort
      ? [
          {
            title: t('Recorded', { vn: 'Bản ghi âm' }),
            dataIndex: 'recorded',
            key: 'recorded',
            //width: '50px',
            render: (recorded, record) => {
              const isRecorded = !!recorded;

              return isRecorded ? (
                <ReactAudioPlayer src={record?.recordAudioPath} controls />
              ) : (
                '-'
              );
            },
          },
        ]
      : []),
    TableUtils.createTableColumnConfig({
      title: t('Note'),
      dataIndex: 'note',
      key: 'note',
      render: (note) =>
        note && (
          <div className="table-note-task">
            <p>{note}</p>
            <Popover
              content={<div className="note-content">{note}</div>}
              overlayClassName="popover-custom-line popover-note"
            >
              <ExpandNoteSvg className="cursor-pointer" />
            </Popover>
          </div>
        ),
    }),
    ...(!showShort ? [TableUtils.createEditColumn()] : []),
  ];
};
