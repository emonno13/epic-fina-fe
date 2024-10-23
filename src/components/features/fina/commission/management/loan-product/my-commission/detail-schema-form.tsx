import { Col, Row, Tag } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { FormatterUtils } from '../../../../../../../lib/formatter';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { HDocumentModalPanel } from '../../../../../../../schema-form/features/panels';
import { Link } from '../../../../../../shared/link';
import { USER_TYPES_LABEL_MAPPING } from '../../../../../../shared/user/constants';
import { PreViewUser } from '../../../../deals/deals-component-common/preview-user';
import { TRANSACTION_TYPE } from '../../../../transaction/constant';
import { useTaxVAT } from '../../../hooks';
import {
  COMMISSION_REASON_SPEND_MAPPING,
  COMMISSION_ROLE_SPECIFY_LABEL_MAPPING,
  COMMISSION_STATUS_COLOR_MAPPING,
  COMMISSION_STATUS_LABEL_MAPPING,
  COMMISSION_STATUSES,
} from '../../../settings/loan-product/constant';
import { GroupInformation, GroupInformationItem } from '../../common-block';

export const LoanProductMyCommissionDetailView = () => {
  const { t } = useHTranslation('admin-common');
  const VAT = useTaxVAT();
  const commission = useDocumentDetail();
  if (!commission?.id) {
    return <span />;
  }

  const transaction = commission?.transaction;
  const transactionDetail = commission?.transactionDetail;
  const recipient = commission?.user;
  const commissionSettingSpend = commission?.commissionSettingSpend;
  const commissionAmount = commission?.amount || 0;
  const actualCommissionReceiveNorm =
    (commissionAmount / transactionDetail?.amount) * 100;
  const commissionSpendNormSetting =
    commissionSettingSpend?.formula?.commissionRate || 0;

  const commissionPaid = commission?.statusHistories?.find(
    (item) => item.status === COMMISSION_STATUSES.PAID,
  );
  const commissionForControl = commission?.statusHistories?.find(
    (item) => item.status === COMMISSION_STATUSES.FOR_CONTROL,
  );
  const commissionCancelled = commission?.statusHistories?.find(
    (item) => item.status === COMMISSION_STATUSES.CANCELLED,
  );

  const forControlInfoMapping = {
    [COMMISSION_STATUSES.NOT_FOR_CONTROL]: [
      {
        label: t('Trạng thái'),
        value: (
          <Tag color={COMMISSION_STATUS_COLOR_MAPPING[commission.status]}>
            {COMMISSION_STATUS_LABEL_MAPPING[commission.status] || ''}
          </Tag>
        ),
      },
    ],
    [COMMISSION_STATUSES.FOR_CONTROL]: [
      {
        label: t('Trạng thái'),
        value: (
          <Tag color={COMMISSION_STATUS_COLOR_MAPPING[commission.status]}>
            {COMMISSION_STATUS_LABEL_MAPPING[commission.status] || ''}
          </Tag>
        ),
      },
      {
        label: t('Ngày đối soát'),
        value: ConverterUtils.dateConverterToString(
          commissionForControl?.updatedAt,
        ),
      },
      {
        label: t('Người đối soát'),
        value: commissionForControl ? (
          <PreViewUser
            user={commissionForControl?.updatedBy}
            userTitle={t(
              USER_TYPES_LABEL_MAPPING[commissionForControl?.updatedBy?.type],
            )}
          />
        ) : (
          ''
        ),
      },
      {
        label: t('Lời nhắn'),
        value: commission?.forControlMessage || '',
      },
    ],
    [COMMISSION_STATUSES.PAID]: [
      {
        label: t('Trạng thái'),
        value: (
          <Tag color={COMMISSION_STATUS_COLOR_MAPPING[commission.status]}>
            {COMMISSION_STATUS_LABEL_MAPPING[commission.status] || ''}
          </Tag>
        ),
      },
      {
        label: t('Ngày thanh toán'),
        value: ConverterUtils.dateConverterToString(commissionPaid?.updatedAt),
      },
      {
        label: t('Người thanh toán'),
        value: commissionPaid ? (
          <PreViewUser
            user={commissionPaid?.updatedBy}
            userTitle={t(
              USER_TYPES_LABEL_MAPPING[commissionPaid?.updatedBy?.type],
            )}
          />
        ) : (
          ''
        ),
      },
      {
        label: t('Lời nhắn'),
        value: commission?.paidMessage || '',
      },
    ],
    [COMMISSION_STATUSES.CANCELLED]: [
      {
        label: t('Trạng thái'),
        value: (
          <Tag color={COMMISSION_STATUS_COLOR_MAPPING[commission.status]}>
            {COMMISSION_STATUS_LABEL_MAPPING[commission.status] || ''}
          </Tag>
        ),
      },
      {
        label: t('Ngày huỷ'),
        value: ConverterUtils.dateConverterToString(
          commissionCancelled?.updatedAt,
        ),
      },
      {
        label: t('Người huỷ'),
        value: commissionCancelled ? (
          <PreViewUser
            user={commissionCancelled.updatedBy}
            userTitle={t(
              USER_TYPES_LABEL_MAPPING[commissionCancelled.updatedBy.type],
            )}
          />
        ) : (
          ''
        ),
      },
      {
        label: t('Lời nhắn'),
        value: commission?.cancelReason || '',
      },
    ],
  };

  const formulaCommissionSpend = commissionSettingSpend?.formula;
  let ratioApplied = formulaCommissionSpend?.lessThanRateInfo;
  if (
    Number(actualCommissionReceiveNorm) >= Number(commissionSpendNormSetting)
  ) {
    ratioApplied = formulaCommissionSpend?.greaterThanRateInfo;
  }

  let usersMapping = {};
  const transactionType = commission.transactionType;

  if (transactionType === TRANSACTION_TYPE.LOAN) {
    const receivers = ratioApplied?.receivers || [];

    usersMapping = {
      [TRANSACTION_TYPE.LOAN]: {
        ['source']: {
          label: t('Người giới thiệu / CTV'),
          value: `~ ${Number((commissionAmount / (transactionDetail?.amount || 0)) * 100).toFixed(2)}`,
        },
        ['handlingStaff']: {
          label: t('Nhân viên xử lý'),
          value: `~ ${Number((commissionAmount / (transactionDetail?.amount || 0)) * 100).toFixed(2)}`,
        },
      },
    };

    for (const receiver of receivers) {
      usersMapping[TRANSACTION_TYPE.LOAN][receiver.position] = {
        label: receiver?.positionModel?.name || '',
        value: `~ ${Number((commissionAmount / (transactionDetail?.amount || 0)) * 100).toFixed(2)}`,
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

  const receiveInfo =
    usersMapping[transactionType][
      transactionType === TRANSACTION_TYPE.LOAN
        ? commission.roleBusiness
        : recipient.id
    ];

  return (
    <HDocumentModalPanel
      {...{
        title: t('Thông tin chi tiết'),
        footer: null,
      }}
    >
      <Row gutter={24}>
        <Col md={12}>
          <GroupInformation
            title={t('Recipient information', { vn: 'Thông tin người nhận' })}
          >
            <GroupInformationItem
              {...{
                label: t('Người nhận'),
                value: recipient ? (
                  <PreViewUser
                    user={recipient}
                    userTitle={t(USER_TYPES_LABEL_MAPPING[recipient.type])}
                  />
                ) : (
                  ''
                ),
              }}
            />
            <GroupInformationItem
              {...{
                label: t('Tư cách'),
                value:
                  COMMISSION_ROLE_SPECIFY_LABEL_MAPPING[
                    commission?.roleSpecify
                  ] || '',
              }}
            />
            <GroupInformationItem
              {...{
                label: t('Tổ chức'),
                value: recipient?.org?.name || '',
              }}
            />
          </GroupInformation>

          <GroupInformation title={t('THÔNG TIN HOA HỒNG')}>
            <GroupInformationItem
              {...{
                label: t('Vai trò'),
                value: receiveInfo?.label || '',
              }}
            />
            <GroupInformationItem
              {...{
                label: t('Tỷ lệ'),
                value: `${receiveInfo?.value || 0}%`,
              }}
            />
            <GroupInformationItem
              {...{
                label: t('HH nhận được'),
                value: FormatterUtils.formatAmount(commissionAmount, 'VND'),
              }}
            />
          </GroupInformation>
        </Col>
        <Col md={12}>
          <GroupInformation title={t('THÔNG TIN NGUỒN CHI TRẢ')}>
            <GroupInformationItem
              {...{
                label: t('Lý do chi trả'),
                value: COMMISSION_REASON_SPEND_MAPPING[transactionType],
              }}
            />
            <GroupInformationItem
              {...{
                label: t('Mã GN'),
                value: (
                  <Link
                    href={`/admin/transaction?documentId=${transaction?.id}`}
                  >{`#${transaction?.code}`}</Link>
                ),
              }}
            />
            <GroupInformationItem
              {...{
                label: t('Số tiền GN'),
                value: FormatterUtils.formatAmount(
                  transactionDetail.amount,
                  'VND',
                ),
              }}
            />
          </GroupInformation>

          <GroupInformation title={t('THÔNG TIN ĐỐI SOÁT')}>
            {forControlInfoMapping[commission.status]?.map(
              (item: any, index: number) => (
                <GroupInformationItem
                  key={index}
                  {...{
                    label: item?.label,
                    value: item?.value,
                  }}
                />
              ),
            )}
          </GroupInformation>
        </Col>
      </Row>
    </HDocumentModalPanel>
  );
};
