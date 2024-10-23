import { Tag } from 'antd';
import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import {
  RESPONSE_STATUS_SEEN_BY_FINA_STAFF,
  RESPONSE_STATUS_SEEN_BY_FINA_STAFF_COLOR_MAPPING,
  RESPONSE_STATUS_SEEN_BY_FINA_STAFF_LABEL_MAPPING,
  TASK_RESPONSE_STATUS,
} from 'constants/crm/task';
import { ConverterUtils } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

const FeedbacksDetailSchemaTable = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Organization'),
      dataIndex: 'partner',
      sortable: true,
      key: 'partnerId',
      render: (value = {}) => (
        <div>
          <div>{value?.name || '_'}</div>
          <Tag color="cyan">{value?.code || '_'}</Tag>
        </div>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Teller Approved', { vn: 'Nhân viên tiếp nhận' }),
      dataIndex: 'user',
      key: 'userId',
      render: (user = {}) => (
        <>
          <ItemViewer
            {...{
              label: t('Fullname:', { vn: 'Họ và tên:' }),
              value: user?.fullName || '_',
              labelClassName: 'm-b-0i',
            }}
          />
          <ItemViewer
            {...{
              label: t('Phone number:', { vn: 'Số điện thoại:' }),
              value: (
                <span>
                  {user?.tels &&
                    user.tels.map(
                      (el) =>
                        el?.tel && <span key={el.tel}>{`${el.tel} `}</span>,
                    )}
                </span>
              ),
              labelClassName: 'm-b-0i',
            }}
          />
          <ItemViewer
            {...{
              label: t('Email:'),
              value: (
                <span>
                  {user?.emails &&
                    user.emails.map(
                      (el) =>
                        el?.email && (
                          <span key={el.email}>{`${el?.email} `}</span>
                        ),
                    )}
                </span>
              ),
              labelClassName: 'm-b-0i',
            }}
          />
        </>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Response status', { vn: 'Trạng thái phản hồi' }),
      dataIndex: 'responseStatus',
      key: 'responseStatus',
      render: (value, document) => {
        let responseStatusSeenByFinaStaff = '' || 'cyan';

        if (value === TASK_RESPONSE_STATUS.REJECT) {
          responseStatusSeenByFinaStaff =
            RESPONSE_STATUS_SEEN_BY_FINA_STAFF.REJECT;
        } else if (value === TASK_RESPONSE_STATUS.RECEIVED) {
          responseStatusSeenByFinaStaff =
            RESPONSE_STATUS_SEEN_BY_FINA_STAFF.RECEIVED;
          if (document?.content) {
            responseStatusSeenByFinaStaff =
              RESPONSE_STATUS_SEEN_BY_FINA_STAFF.RESPONDED;
          }
        }

        return (
          <Tag
            color={
              RESPONSE_STATUS_SEEN_BY_FINA_STAFF_COLOR_MAPPING[
                responseStatusSeenByFinaStaff
              ]
            }
          >
            {responseStatusSeenByFinaStaff
              ? RESPONSE_STATUS_SEEN_BY_FINA_STAFF_LABEL_MAPPING[
                  responseStatusSeenByFinaStaff
                ]
              : '_'}
          </Tag>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Create at', { vn: 'Ngày phản hồi' }),
      dataIndex: 'responseDate',
      sortable: true,
      key: 'responseDate',
      render: (date) => {
        if (!date) {
          return (
            <Tag
              {...{
                color: 'red',
              }}
            >
              {'Chưa phản hồi'}
            </Tag>
          );
        }

        return ConverterUtils.dateConverterToString(date);
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Content', { vn: 'Nội dung' }),
      dataIndex: 'content',
      key: 'content',
      render: (content) => {
        if (!content)
          return (
            <Tag
              {...{
                color: 'red',
              }}
            >
              {'Chưa phản hồi'}
            </Tag>
          );
        return (
          <>
            <ItemViewer
              {...{
                label: t('Borrow time:', { vn: 'Thời gian vay:' }),
                value: content?.borrowTime
                  ? FormatterUtils.formatAmount(
                      content.borrowTime,
                      t('month', { vn: 'tháng' }),
                    )
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
                label: t('Preferential Time:', { vn: 'Thời gian ưu đãi:' }),
                value: content?.preferentialTime
                  ? FormatterUtils.formatAmount(
                      content.preferentialTime,
                      t('year'),
                    )
                  : '_',
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Property valuation:', { vn: 'Định giá tài sản:' }),
                value: content?.propertyValuation
                  ? content.propertyValuation
                  : '_',
                labelClassName: 'm-b-0i',
              }}
            />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Bank note', { vn: 'Ghi chú' }),
      dataIndex: 'bankNote',
      sortable: true,
      key: 'bankNote',
      render: (note) => {
        if (!note) {
          return '_';
        }

        return note;
      },
    }),
  ];
};

export default FeedbacksDetailSchemaTable;
