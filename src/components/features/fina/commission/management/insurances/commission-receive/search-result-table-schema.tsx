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
  COMMISSION_STATUS_COLOR_MAPPING,
  COMMISSION_STATUS_LABEL_MAPPING,
  COMMISSION_STATUSES,
} from '../../../settings/loan-product/constant';
import { GroupInformationItem } from '../../common-block';

export const InsuranceProductCommissionReceiveTableSchema = () => {
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

        return (
          <>
            <ItemViewer
              {...{
                label: <StatusIcon />,
                tooltipContent: t('Mã giao dịch'),
                value: (
                  <Link
                    href={`/admin/transaction?documentId=${transaction?.id}`}
                  >{`#${transaction?.code || ''}`}</Link>
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
                tooltipContent: t('Product'),
                label: <SourceIcon />,
                value: transaction?.product?.name || '',
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Partner'),
                label: <BankOutlined />,
                value: transaction?.product?.org?.name || '',
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                label: <StatusIcon />,
                tooltipContent: t('Mã hồ sơ phía đối tác'),
                value: '',
                labelClassName: 'm-b-10',
              }}
            />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Hoa hồng sau thuế'),
      dataIndex: 'amount',
      sortable: true,
      key: 'amount',
      render: (amount, record) => FormatterUtils.formatAmount(amount, 'VND'),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Hoa hồng trước thuế'),
      dataIndex: 'amount',
      sortable: true,
      key: 'amount',
      render: (amount, record) =>
        FormatterUtils.formatAmount(amount / (1 + VAT), 'VND'),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Thông tin giao dịch'),
      dataIndex: 'transaction',
      sortable: true,
      key: 'transaction',
      render: (transaction, commission) => {
        const staff = transaction?.staff;
        return (
          <>
            <GroupInformationItem
              {...{
                label: t('Số tiền giao dịch'),
                value: FormatterUtils.formatAmount(
                  transaction?.totalAmount,
                  'VND',
                ),
              }}
            />
            <GroupInformationItem
              {...{
                label: t('Ngày giao dịch'),
                value: ConverterUtils.dateConverterToString(
                  commission?.transactionDetail?.paymentDate,
                ),
              }}
            />
            <GroupInformationItem
              {...{
                label: t('CTV bán hàng'),
                value: (
                  <PreViewUser
                    user={staff}
                    userTitle={t(USER_TYPES_LABEL_MAPPING[staff?.type])}
                  />
                ),
              }}
            />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Phần trăm hoa hồng'),
      dataIndex: 'commissionSettingReceive',
      sortable: true,
      key: 'commissionSettingReceive',
      render: (commissionSettingReceive) =>
        `${commissionSettingReceive?.percentCommission || 0}%`,
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
              <Tooltip title={'Đối soát'}>
                <div className={'p-l-10'}>
                  <ClickableOpacity
                    {...{
                      className: 'm-t-10 m-l-5 m-r-5',
                      onClick: () =>
                        setDocumentDetail({
                          ...document,
                          action: 'for_control',
                        }),
                    }}
                  >
                    <CheckCircleOutlined />
                  </ClickableOpacity>
                </div>
              </Tooltip>
            )}

            {(!status || status === COMMISSION_STATUSES.NOT_FOR_CONTROL) && (
              <Tooltip title={'Huỷ bỏ'}>
                <div className={'p-l-10'}>
                  <ClickableOpacity
                    {...{
                      className: 'm-t-10 m-l-5 m-r-5',
                      onClick: () =>
                        setDocumentDetail({ ...document, action: 'cancelled' }),
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
    },
  ];
};
