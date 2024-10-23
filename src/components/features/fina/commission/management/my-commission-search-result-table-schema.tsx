import { EyeOutlined } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';

import { TableUtils } from '@lib/table-utils';
import { ConverterUtils } from '../../../../../lib/converter';
import { FormatterUtils } from '../../../../../lib/formatter';
import { useHTranslation } from '../../../../../lib/i18n';
import { useEditDocumentControl } from '../../../../../schema-form/features/hooks';
import { Link } from '../../../../shared/link';
import { TRANSACTION_TYPE } from '../../transaction/constant';
import {
  COMMISSION_REASON_SPEND_MAPPING,
  COMMISSION_STATUS_COLOR_MAPPING,
  COMMISSION_STATUS_LABEL_MAPPING,
  COMMISSION_STATUSES,
} from '../settings/loan-product/constant';
import { GroupInformationItem } from './common-block';

export const MyCommissionSearchResultTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Hoa hồng'),
      dataIndex: 'amount',
      sortable: true,
      key: 'amount',
      render: (amount, record) => FormatterUtils.formatAmount(amount, 'VND'),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Lý do chi trả'),
      dataIndex: 'transactionType',
      sortable: true,
      key: 'transactionType',
      render: (transactionType, record) => {
        return COMMISSION_REASON_SPEND_MAPPING[transactionType];
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Nội dung'),
      dataIndex: 'transactionDetail',
      sortable: true,
      key: 'transactionDetail',
      render: (transactionDetail, commission) => {
        let usersMapping: any = {};
        const ratioApplied = commission?.ratioApplied;
        const receivers = ratioApplied?.receivers || [];
        const transactionType = commission.transactionType;

        if (transactionType === TRANSACTION_TYPE.LOAN) {
          usersMapping = {
            [TRANSACTION_TYPE.LOAN]: {
              ['source']: {
                label: t('Người giới thiệu / CTV'),
                value: ratioApplied?.source,
              },
              ['handlingStaff']: {
                label: t('Nhân viên xử lý'),
                value: ratioApplied?.handlingStaff,
              },
            },
          };

          for (const receiver of receivers) {
            usersMapping[TRANSACTION_TYPE.LOAN][receiver.position] = {
              label: receiver?.positionModel?.name || '',
              value: receiver?.commissionPercent,
            };
          }
        } else {
          usersMapping = {
            [TRANSACTION_TYPE.INSURANCE]: {
              [commission.userId]: {
                label:
                  !commission?.level || commission?.level === 1
                    ? t('CTV bán BH')
                    : `${t('Quản lý cấp')} ${commission?.level}`,
                value:
                  commission?.commissionSettingSpend[
                    `collaborator${commission.level || 1}`
                  ],
              },
            },
          };
        }

        const info: any[] = [
          {
            label: t('Mã GN'),
            value: (
              <Link
                href={`/admin/transaction?documentId=${transactionDetail?.transactionId}`}
              >{`#${commission?.transaction?.code}`}</Link>
            ),
          },
          {
            label: t('Số tiền GN'),
            value: FormatterUtils.formatAmount(
              transactionDetail?.amount || 0,
              'VND',
            ),
          },
          {
            label: t('Ngày GN'),
            value: ConverterUtils.dateConverterToString(
              transactionDetail?.paymentDate,
            ),
          },
          {
            label: t('Vai trò'),
            value:
              usersMapping[transactionType][
                transactionType === TRANSACTION_TYPE.LOAN
                  ? commission.roleBusiness
                  : commission.userId
              ]?.label || '',
          },
          {
            label: t('% hoa hồng'),
            value: `~ ${Number(((commission.amount || 0) / (transactionDetail?.amount || 0)) * 100).toFixed(2)}%`,
          },
        ];

        return (
          <>
            {info.map((item: any, index: number) => (
              <GroupInformationItem
                key={index}
                {...{
                  label: item.label,
                  value: item.value,
                }}
              />
            ))}
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Thời gian'),
      dataIndex: 'createdAt',
      sortable: true,
      key: 'createdAt',
      render: (createdAt, commission) => {
        const statusHistories = commission.statusHistories || [];
        const forControlAt = statusHistories.find(
          (item) => item.status === COMMISSION_STATUSES.FOR_CONTROL,
        )?.updatedAt;
        const paidAt = statusHistories.find(
          (item) => item.status === COMMISSION_STATUSES.PAID,
        )?.updatedAt;

        return (
          <>
            <GroupInformationItem
              {...{
                label: t('Ngày ghi nhận hoa hồng'),
                value: ConverterUtils.dateConverterToString(createdAt),
              }}
            />

            {forControlAt && (
              <GroupInformationItem
                {...{
                  label: t('Ngày đối soát'),
                  value: ConverterUtils.dateConverterToString(forControlAt),
                }}
              />
            )}

            {paidAt && (
              <GroupInformationItem
                {...{
                  label: t('Ngày thanh toán'),
                  value: ConverterUtils.dateConverterToString(paidAt),
                }}
              />
            )}
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      render: (status, record) => (
        <Tag color={COMMISSION_STATUS_COLOR_MAPPING[status]}>
          {COMMISSION_STATUS_LABEL_MAPPING[status] || ''}
        </Tag>
      ),
    }),
    {
      title: t('Action'),
      dataIndex: 'status',
      width: 100,
      responsive: ['md'],
      render: (status, document) => {
        const editControl = useEditDocumentControl(
          document,
          {},
          <EyeOutlined />,
        );

        return (
          <div className="d-f-center">
            <Tooltip title={'Chi tiết'}>
              <div>{editControl()}</div>
            </Tooltip>
          </div>
        );
      },
    },
  ];
};
