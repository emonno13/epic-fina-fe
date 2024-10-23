import React, { useState } from 'react';
import { Tag, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import { TableUtils } from '@lib/table-utils';
import { TRANSACTION_TYPE } from '@components/features/fina/transaction/constant';
import {
  COMMISSION_REASON_SPEND_MAPPING,
  COMMISSION_STATUS_COLOR_MAPPING,
  COMMISSION_STATUS_LABEL_MAPPING,
} from '@components/features/fina/commission/settings/loan-product/constant';
import ModalViewDetail from './modal-view-deatail';
import { useHTranslation } from '../../../../../lib/i18n';
import { Link } from '../../../../shared/link';
import { FormatterUtils } from '../../../../../lib/formatter';
import { ConverterUtils } from '../../../../../lib/converter';
import { useEditDocumentControl } from '../../../../../schema-form/features/hooks';

export const MyCommissionSearchResultTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Mã ghi nhận'),
      dataIndex: 'transactionDetail',
      key: 'transactionDetail',
      render: (transactionDetail, commission) => {
        return (
          <Link
            href={`/admin/transaction?documentId=${transactionDetail?.transactionId}`}
          >{`${commission?.transaction?.code}`}</Link>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Lý do chi trả'),
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (transactionType, record) => {
        return COMMISSION_REASON_SPEND_MAPPING[transactionType];
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Giá trị giao dịch'),
      dataIndex: 'transactionDetail',
      key: 'transactionDetail',
      render: (transactionDetail, record) => (
        <>
          {FormatterUtils.formatAmount(
            transactionDetail?.amount?.toFixed(0) || 0,
            '',
          )}
          <sup>đ</sup>
        </>
      ),
    }),

    TableUtils.createTableColumnConfig({
      title: t('Vai trò'),
      dataIndex: 'transactionDetail',
      key: 'transactionDetail',
      render: (transactionDetail, commission) => {
        return MappingRole(commission);
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Hoa hồng'),
      dataIndex: 'transactionDetail',
      key: 'transactionDetail',
      render: (transactionDetail, commission) =>
        `~ ${Number(((commission.amount || 0) / (transactionDetail?.amount || 0)) * 100).toFixed(2)}%`,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Số tiền'),
      dataIndex: 'transactionDetail',
      key: 'transactionDetail',
      render: (transactionDetail, commission) => (
        <>
          {FormatterUtils.formatAmount(commission?.amount?.toFixed(0) || 0, '')}
          <sup>đ</sup>
        </>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Ngày ghi nhận'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt, commission) =>
        ConverterUtils.dateConverterToString(createdAt),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        const editControl = useEditDocumentControl(
          document,
          {},
          <EyeOutlined />,
        );
        const [isVisible, setIsVisible] = useState(false);

        return (
          <div style={{ display: 'flex' }}>
            <Tag color={COMMISSION_STATUS_COLOR_MAPPING[status]}>
              {COMMISSION_STATUS_LABEL_MAPPING[status] || ''}
            </Tag>
            <div className="d-f-center">
              <Tooltip title={'Chi tiết'}>
                <div
                  onClick={() => {
                    setIsVisible(true);
                  }}
                >
                  {editControl()}
                </div>
              </Tooltip>
              <ModalViewDetail
                {...{
                  record,
                  isVisible,
                  setIsVisible,
                  status: (
                    <Tag color={COMMISSION_STATUS_COLOR_MAPPING[status]}>
                      {COMMISSION_STATUS_LABEL_MAPPING[status] || ''}
                    </Tag>
                  ),
                }}
              />
            </div>
          </div>
        );
      },
    }),
  ];
};

export const MappingRole = (commission) => {
  const { t } = useHTranslation('admin-common');
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

  return (
    usersMapping[transactionType][
      transactionType === TRANSACTION_TYPE.LOAN
        ? commission.roleBusiness
        : commission.userId
    ]?.label || ''
  );
};
