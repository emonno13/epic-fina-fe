import {
  CheckCircleOutlined,
  DeleteOutlined,
  PayCircleOutlined,
} from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';

import { TableUtils } from '@lib/table-utils';
import { StatusIcon, UserIcon } from '../../../../../icons';
import { ConverterUtils } from '../../../../../lib/converter';
import { FormatterUtils } from '../../../../../lib/formatter';
import { useHTranslation } from '../../../../../lib/i18n';
import {
  useEditDocumentControl,
  useSetDocumentDetail,
} from '../../../../../schema-form/features/hooks';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import { Link } from '../../../../shared/link';
import {
  USER_TYPES,
  USER_TYPES_LABEL_MAPPING,
} from '../../../../shared/user/constants';
import { ClickableOpacity } from '../../../../shared/utils/clickable-opacity';
import { PreViewUser } from '../../deals/deals-component-common/preview-user';
import { TRANSACTION_TYPE } from '../../transaction/constant';
import { useTaxVAT } from '../hooks';
import {
  COMMISSION_REASON_SPEND_MAPPING,
  COMMISSION_ROLE_SPECIFY_LABEL_MAPPING,
  COMMISSION_STATUS_COLOR_MAPPING,
  COMMISSION_STATUS_LABEL_MAPPING,
  COMMISSION_STATUSES,
} from '../settings/loan-product/constant';

export const CommissionSpendSearchResultTableSchema = (
  hiddenControl = false,
) => {
  const { t } = useHTranslation('admin-common');
  const VAT = useTaxVAT();

  return [
    TableUtils.createTableColumnConfig({
      title: t('Người nhận'),
      dataIndex: 'user',
      sortable: true,
      key: 'user',
      render: (user, commission) => {
        console.log('user: ', user);

        return (
          <>
            <PreViewUser
              user={user}
              userTitle={t(USER_TYPES_LABEL_MAPPING[user?.type])}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Tư cách'),
                label: <UserIcon />,
                value:
                  COMMISSION_ROLE_SPECIFY_LABEL_MAPPING[
                    commission?.roleSpecify
                  ] || '',
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                label: <StatusIcon />,
                tooltipContent: t('Tổ chức'),
                value: user?.org?.name || '',
                labelClassName: 'm-b-10',
              }}
            />
            {user?.type === USER_TYPES.COLLABORATOR &&
              !user?.hasCollaboratorContract && (
                <Tag color="magenta">{t('CTV chưa ký hợp đồng')}</Tag>
              )}
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Hoa hồng'),
      dataIndex: 'amount',
      sortable: true,
      key: 'amount',
      render: (amount) => FormatterUtils.formatAmount(amount, 'VND'),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Lý do chi trả'),
      dataIndex: 'transactionType',
      sortable: true,
      key: 'transactionType',
      render: (transactionType) =>
        COMMISSION_REASON_SPEND_MAPPING[transactionType],
    }),
    TableUtils.createTableColumnConfig({
      title: t('Nguồn chi trả'),
      dataIndex: 'transactionDetail',
      sortable: true,
      key: 'transactionDetail',
      render: (transactionDetail, commission) => {
        let finaReceiveAmount = 0;
        let finaSpendMax = 0;

        if (commission.transactionType === TRANSACTION_TYPE.LOAN) {
          const commissionReceive = commission.commissionReceive;
          const ratioApplied = commission.ratioApplied;

          finaReceiveAmount = commissionReceive.amount;

          const finaReceiveAmountBeforeTax = finaReceiveAmount / (1 + VAT);

          finaSpendMax =
            finaReceiveAmountBeforeTax * ((ratioApplied.spendMax || 0) / 100);
        } else {
          const percentCommissionReceive =
            commission?.commissionSettingReceive?.percentCommission;
          const percentCommissionSpend =
            commission?.commissionSettingSpend?.personal?.percentCommission;

          finaReceiveAmount =
            transactionDetail.amount * (percentCommissionReceive / 100);
          finaSpendMax =
            ((transactionDetail.amount * (percentCommissionReceive / 100)) /
              (1 + VAT)) *
            (percentCommissionSpend / 100);
        }

        return (
          <>
            <p>
              <strong>{t('Mã giao dịch')}:</strong>{' '}
              <Link
                href={`/admin/transaction?documentId=${commission?.transaction?.id}`}
              >{`#${commission?.transaction?.code}`}</Link>
            </p>
            <p>
              <strong>{t('Số tiền giao dịch')}:</strong>{' '}
              {FormatterUtils.formatAmount(
                transactionDetail?.amount || 0,
                'VND',
              )}
            </p>
            <p>
              <strong>{t('Hoa hồng Fina nhận')}:</strong>{' '}
              {FormatterUtils.formatAmount(finaReceiveAmount, 'VND')}
            </p>
            <p>
              <strong>{t('Hoa hồng Fina nhận (trừ thuế)')}:</strong>{' '}
              {FormatterUtils.formatAmount(
                finaReceiveAmount / (1 + VAT),
                'VND',
              )}
            </p>
            <p>
              <strong>{t('Hoa hồng chi trả tối đa')}:</strong>{' '}
              {FormatterUtils.formatAmount(finaSpendMax, 'VND')}
            </p>
            <p>
              <strong>{t('Ngày giao dịch')}:</strong>{' '}
              {ConverterUtils.dateConverterToString(
                transactionDetail?.paymentDate,
              )}
            </p>
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Phương thức tính'),
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
                  commission?.commissionSettingSpend?.personal[
                    `collaborator${commission.level || 1}`
                  ] || 0,
              },
            },
          };
        }

        return (
          <>
            {transactionType === TRANSACTION_TYPE.LOAN && (
              <div>
                <p>
                  <strong>{t('Vai trò')}:</strong>{' '}
                  {usersMapping[transactionType][commission.roleBusiness]
                    ?.label || ''}
                </p>
                <p>
                  <strong>{t('Tỷ lệ')}:</strong>{' '}
                  {usersMapping[transactionType][commission.roleBusiness]
                    ?.value || ''}
                  %
                </p>
              </div>
            )}

            {transactionType === TRANSACTION_TYPE.INSURANCE && (
              <div>
                <p>
                  <strong>{t('Vai trò')}:</strong>{' '}
                  {usersMapping[transactionType][commission.userId]?.label ||
                    ''}
                </p>
                <p>
                  <strong>{t('Tỷ lệ')}:</strong>{' '}
                  {usersMapping[transactionType][commission.userId]?.value ||
                    ''}
                  %
                </p>
              </div>
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
      render: (status) => (
        <Tag color={COMMISSION_STATUS_COLOR_MAPPING[status]}>
          {COMMISSION_STATUS_LABEL_MAPPING[status] || ''}
        </Tag>
      ),
    }),
    !hiddenControl
      ? {
          title: t('Action'),
          dataIndex: 'status',
          width: 100,
          responsive: ['md'],
          render: (status, document) => {
            const setDocumentDetail = useSetDocumentDetail();
            const editControl = useEditDocumentControl(document);

            return (
              <div className="d-f-center">
                <Tooltip title={'Chi tiết'}>
                  <div>{editControl()}</div>
                </Tooltip>

                {(!status ||
                  status === COMMISSION_STATUSES.NOT_FOR_CONTROL) && (
                  <Tooltip title={'Đối soát'}>
                    <div className={'p-l-10'}>
                      <ClickableOpacity
                        {...{
                          className: 'm-t-10 m-l-5 m-r-5',
                          onClick: () =>
                            setDocumentDetail({
                              ...document,
                              action: COMMISSION_STATUSES.FOR_CONTROL,
                            }),
                        }}
                      >
                        <CheckCircleOutlined />
                      </ClickableOpacity>
                    </div>
                  </Tooltip>
                )}

                {(!status ||
                  (status !== COMMISSION_STATUSES.CANCELLED &&
                    status !== COMMISSION_STATUSES.PAID)) && (
                  <Tooltip title={'Thanh toán'}>
                    <div className={'p-l-10'}>
                      <ClickableOpacity
                        {...{
                          className: 'm-t-10 m-l-5 m-r-5',
                          onClick: () =>
                            setDocumentDetail({
                              ...document,
                              action: COMMISSION_STATUSES.PAID,
                            }),
                        }}
                      >
                        <PayCircleOutlined />
                      </ClickableOpacity>
                    </div>
                  </Tooltip>
                )}

                {(!status ||
                  status === COMMISSION_STATUSES.NOT_FOR_CONTROL) && (
                  <Tooltip title={'Huỷ bỏ'}>
                    <div className={'p-l-10'}>
                      <ClickableOpacity
                        {...{
                          className: 'm-t-10 m-l-5 m-r-5',
                          onClick: () =>
                            setDocumentDetail({
                              ...document,
                              action: COMMISSION_STATUSES.CANCELLED,
                            }),
                        }}
                      >
                        <DeleteOutlined />
                      </ClickableOpacity>
                    </div>
                  </Tooltip>
                )}
              </div>
            );
          },
        }
      : {},
  ];
};
