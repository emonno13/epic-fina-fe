import { CheckCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { TRANSACTION_DETAIL_STATUS } from '@components/features/fina/transaction/constant';
import { useSetTransactionsOfDeal } from '@schema-form/features/hooks/document-detail-hooks';
import { InputNumber, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { FormatterUtils } from '../../../../../../../lib/formatter';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { usePermissions } from '../../../../../../../lib/providers/auth';
import { TableUtils } from '../../../../../../../lib/table-utils';
import { useTableSourceData } from '../../../../../../../schema-form/features/hooks';
import { useSetDataSource } from '../../../../../../../schema-form/features/hooks/table-hooks';
import { createSchemaItem } from '../../../../../../../schema-form/h-types';
import { FormUtils } from '../../../../../../../schema-form/utils/form-utils';
import { ADMIN_PERMISSIONS } from '../../../../../../shared/accessibility/constant';
import { HDatePicker } from '../../../../../../shared/common-form-elements/date-picker';
import { ClickableOpacity } from '../../../../../../shared/utils/clickable-opacity';
import {
  COMMISSION_STATUSES,
  COMMISSION_STATUS_COLOR_MAPPING,
  COMMISSION_STATUS_LABEL_MAPPING,
} from '../../../../commission/settings/loan-product/constant';
import { PreViewUser } from '../../../deals-component-common/preview-user';
import { DEAL_DETAIL_STATUSES } from '../../../utils';

export const HistoriesDisbursementTableSchema = (props?: any) => {
  const { t } = useHTranslation('admin-common');
  const { dealDetail, onReloadDealDetail } = props;
  const { id } = dealDetail;
  const setTransactionsOfDeal = useSetTransactionsOfDeal();
  const dataSource = useTableSourceData();
  const setDataSource = useSetDataSource();
  const permissions = [
    ADMIN_PERMISSIONS.SITE_OWNER,
    ADMIN_PERMISSIONS.SUPPER_ADMIN,
    ADMIN_PERMISSIONS.ADMIN,
  ];
  const allowed = usePermissions(permissions);
  const onDocumentClick = async (document, status) => {
    await FormUtils.submitForm(
      { status },
      {
        nodeName: `transactions/update-transaction-deal/${document.id}`,
        method: 'put',
        onGotSuccess: (res) => {
          const dealDetailId = res?.metaData?.dealDetailId;
          if (dealDetailId) {
            setTransactionsOfDeal({
              featureId: `transactions-${dealDetailId}`,
              data: res,
            });
          }
          const x = dataSource?.[0]?.transactionDetails?.map((el) => {
            if (el.id === document.id) {
              return { ...document, status };
            }
            return el;
          });
          const totalForControl = x
            ?.filter(
              (item) => item.status === TRANSACTION_DETAIL_STATUS.FOR_CONTROL,
            )
            ?.reduce(
              (acc: number, value) => acc + Number(value?.amount || 0),
              0,
            );

          if (totalForControl === dealDetail.info.approvalAmount) {
            onReloadDealDetail();
          }
          setDataSource([{ ...dataSource?.[0], transactionDetails: x }]);
        },
      },
    );
  };

  return [
    TableUtils.createTableColumnConfig({
      title: t('Amount', { vn: 'Số Tiền' }),
      dataIndex: 'amount',
      sortable: true,
      width: '250px',
      key: 'amount',
      itemSchema: (record) => {
        if (
          record?.status === COMMISSION_STATUSES.NOT_FOR_CONTROL &&
          (dealDetail.status === DEAL_DETAIL_STATUSES.DISBURSING ||
            dealDetail.status === DEAL_DETAIL_STATUSES.LEND_APPROVAL)
        ) {
          return createSchemaItem({
            Component: InputNumber,
            name: 'amount',
            componentProps: {
              formatter: (value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              parser: (value) => value.replace(/(,*)/g, ''),
              style: { width: '100%' },
              min: 1,
              placeholder: 'input',
            },
          });
        }
        return undefined;
      },
      render: (_, record) =>
        FormatterUtils.formatAmount(record?.amount || 0, 'vnđ'),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created At', { vn: 'Ngày giải ngân' }),
      dataIndex: 'paymentDate',
      sortable: true,
      width: '160px',
      key: 'paymentDate',
      itemSchema: (record) => {
        if (
          record?.status === COMMISSION_STATUSES.NOT_FOR_CONTROL &&
          (dealDetail.status === DEAL_DETAIL_STATUSES.DISBURSING ||
            dealDetail.status === DEAL_DETAIL_STATUSES.LEND_APPROVAL)
        ) {
          return createSchemaItem({
            Component: HDatePicker,
            name: 'paymentDate',
            componentProps: {
              style: { width: '100%' },
              showTime: true,
              format: 'DD/MM/YYYY',
              defaultValue: moment(),
            },
          });
        }
        return undefined;
      },
      render: (_, record) =>
        ConverterUtils.dateConverterToString(`${record?.paymentDate}`),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      width: '160px',
      key: 'status',
      render: (status, record) => (
        <Tag color={COMMISSION_STATUS_COLOR_MAPPING[status]}>
          {COMMISSION_STATUS_LABEL_MAPPING[status] || ''}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created By', { vn: 'Cập nhật cuối cùng' }),
      dataIndex: 'status',
      sortable: true,
      render: (status, record) => (
        <PreViewUser {...{ user: record?.updatedBy }} />
      ),
    }),
    allowed
      ? TableUtils.createTableColumnConfig({
          title: t('Action'),
          dataIndex: 'action',
          render: (_, document) => {
            return (
              <div className="deal-action d-f-center">
                {document?.status === COMMISSION_STATUSES.NOT_FOR_CONTROL && (
                  <Tooltip
                    placement="topLeft"
                    title={t('Checked', { vn: 'Đã đối soát' })}
                    className={'m-r-10 m-l-10'}
                    arrowPointAtCenter
                  >
                    <ClickableOpacity
                      onClick={() =>
                        onDocumentClick(
                          document,
                          COMMISSION_STATUSES.FOR_CONTROL,
                        )
                      }
                    >
                      <CheckCircleTwoTone />
                    </ClickableOpacity>
                  </Tooltip>
                )}
                {document?.status === COMMISSION_STATUSES.NOT_FOR_CONTROL &&
                  (dealDetail.status === DEAL_DETAIL_STATUSES.DISBURSING ||
                    dealDetail.status ===
                      DEAL_DETAIL_STATUSES.LEND_APPROVAL) && (
                    <Tooltip
                      placement="topLeft"
                      title={t('Cancelled', { vn: 'Hủy bỏ' })}
                      arrowPointAtCenter
                    >
                      <ClickableOpacity
                        onClick={() =>
                          onDocumentClick(
                            document,
                            COMMISSION_STATUSES.CANCELLED,
                          )
                        }
                      >
                        <DeleteTwoTone />
                      </ClickableOpacity>
                    </Tooltip>
                  )}
              </div>
            );
          },
        })
      : [],
  ];
};
