import {
  BankOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';

import { TableUtils } from '@lib/table-utils';
import { SourceIcon, StatusIcon, UserIcon } from '../../../../../../../icons';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { FormatterUtils } from '../../../../../../../lib/formatter';
import { useHTranslation } from '../../../../../../../lib/i18n';
import {
  useEditDocumentControl,
  useSetDocumentDetail,
} from '../../../../../../../schema-form/features/hooks';
import { ItemViewer } from '../../../../../../shared/common/configuration/item-viewer';
import { HPreviewUser } from '../../../../../../shared/common/h-preview-user';
import { Link } from '../../../../../../shared/link';
import { USER_TYPES_LABEL_MAPPING } from '../../../../../../shared/user/constants';
import { ClickableOpacity } from '../../../../../../shared/utils/clickable-opacity';
import { PreViewUser } from '../../../../deals/deals-component-common/preview-user';
import { useTaxVAT } from '../../../hooks';
import {
  COMMISSION_METHOD_INFO_MAPPING,
  COMMISSION_STATUS_COLOR_MAPPING,
  COMMISSION_STATUS_LABEL_MAPPING,
  COMMISSION_STATUSES,
  METHODS,
} from '../../../settings/loan-product/constant';

export const LoanProductCommissionReceiveTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  const VAT = useTaxVAT();
  return [
    TableUtils.createTableColumnConfig({
      title: t('Hồ sơ'),
      dataIndex: 'transaction',
      sortable: true,
      key: 'transaction',
      render: (transaction, commission) => {
        const customer = transaction?.customer;
        const deal = commission?.deal;
        const dealDetail = commission?.dealDetail;

        return (
          <>
            <ItemViewer
              {...{
                label: <StatusIcon />,
                tooltipContent: t('Mã HSV'),
                value: (
                  <Link
                    href={`/admin/deals/loans?dealId=${deal?.id}`}
                  >{`${deal?.code}`}</Link>
                ),
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                label: <UserIcon />,
                tooltipContent: (
                  <HPreviewUser
                    {...{ user: customer, userTitle: 'Khách hàng' }}
                  />
                ),
                value: (
                  <div className={'preview-user-full-name'}>
                    {ConverterUtils.getFullNameUser(customer)}
                  </div>
                ),
                labelClassName: 'm-b-10',
                style: { textAlign: 'center', justifyContent: 'center' },
              }}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Apartment code'),
                label: <SourceIcon />,
                value: deal?.realEstateInfo?.apartmentCode,
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Partner'),
                label: <BankOutlined />,
                value: transaction?.partner?.name || '',
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                label: <StatusIcon />,
                tooltipContent: t('Mã HSV (đối tác)'),
                value: dealDetail?.info?.codeBankProfile,
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                label: <UserIcon />,
                tooltipContent: t('Mã KH (đối tác)'),
                value: dealDetail?.info?.codeBankCustomer,
                labelClassName: 'm-b-10',
              }}
            />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Hoa hồng (Sau thuế)'),
      dataIndex: 'amount',
      sortable: true,
      key: 'amount',
      render: (amount, record) => FormatterUtils.formatAmount(amount, 'VND'),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Hoa hồng (Trước thuế)'),
      dataIndex: 'amount',
      sortable: true,
      key: 'amount',
      render: (amount, record) =>
        FormatterUtils.formatAmount(amount / (1 + VAT), 'VND'),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Thông tin giải ngân'),
      dataIndex: 'transactionDetail',
      sortable: true,
      key: 'transactionDetail',
      render: (transactionDetail, commission) => {
        const statusHistories = commission.statusHistories || [];
        const forControlPeople = statusHistories.find(
          (item) => item.status === COMMISSION_STATUSES.FOR_CONTROL,
        )?.updatedBy;
        const cancelledPeople = statusHistories.find(
          (item) => item.status === COMMISSION_STATUSES.CANCELLED,
        )?.updatedBy;

        return (
          <>
            <ItemViewer
              {...{
                label: <StatusIcon />,
                tooltipContent: t('Mã GN'),
                value: (
                  <Link
                    href={`/admin/transaction?documentId=${transactionDetail.transactionId}`}
                  >{`${commission?.transaction?.code}`}</Link>
                ),
                labelClassName: 'm-b-10',
              }}
            />
            <p>
              <strong>{t('Số tiền')}:</strong>{' '}
              {FormatterUtils.formatAmount(
                transactionDetail?.amount || 0,
                'VND',
              )}
            </p>
            <p>
              <strong>{t('Ngày GN')}:</strong>{' '}
              {ConverterUtils.dateConverterToString(
                transactionDetail?.paymentDate,
              )}
            </p>
            {forControlPeople && (
              <p>
                <strong>{t('Người đối soát')}:</strong>
                <PreViewUser
                  user={forControlPeople}
                  userTitle={t(USER_TYPES_LABEL_MAPPING[forControlPeople.type])}
                />
              </p>
            )}
            {cancelledPeople && (
              <p>
                <strong>{t('Người huỷ')}:</strong>
                <PreViewUser
                  user={cancelledPeople}
                  userTitle={t(USER_TYPES_LABEL_MAPPING[cancelledPeople.type])}
                />
              </p>
            )}
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Công thức tính'),
      dataIndex: 'commissionSettingReceive',
      sortable: true,
      key: 'commissionSettingReceive',
      render: (commissionSettingReceive) => {
        const formulaMapping = {
          [METHODS.PERCENT]: [
            {
              label: 'Phương thức',
              value:
                COMMISSION_METHOD_INFO_MAPPING[METHODS.PERCENT]?.label || '',
            },
            {
              label: 'Công thức',
              value: `${commissionSettingReceive?.formula?.percentCommission || 0}% / STGN`,
            },
            {
              label: 'Số tiền tối đa',
              value: FormatterUtils.formatAmount(
                commissionSettingReceive?.formula?.maxCommission || 0,
                'VND',
              ),
            },
          ],
          [METHODS.FIXED]: [
            {
              label: 'Phương thức',
              value: COMMISSION_METHOD_INFO_MAPPING[METHODS.FIXED]?.label || '',
            },
            {
              label: 'Số tiền cố định nhận được',
              value: FormatterUtils.formatAmount(
                commissionSettingReceive?.formula?.fixCommission || 0,
                'VND',
              ),
            },
          ],
        };
        return (
          <>
            {formulaMapping[commissionSettingReceive?.formula?.method]?.map(
              (item: any, index: number) => (
                <p key={index}>
                  <strong>{item?.label}:</strong> {item?.value}
                </p>
              ),
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
        const setDocumentDetail = useSetDocumentDetail();
        const editControl = useEditDocumentControl(document);

        return (
          <div className="d-f-center">
            <Tooltip title={'Chi tiết'}>
              <div>{editControl()}</div>
            </Tooltip>

            {(!status || status === COMMISSION_STATUSES.NOT_FOR_CONTROL) && (
              <>
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
              </>
            )}
          </div>
        );
      },
    },
  ];
};
