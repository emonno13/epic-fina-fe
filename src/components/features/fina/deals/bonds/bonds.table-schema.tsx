import React from 'react';
import { Tag } from 'antd';
import { TableUtils } from '@lib/table-utils';
import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { useHTranslation } from '@lib/i18n';
import { FormatterUtils } from '@lib/formatter';
import { PreViewUser } from '../deals-component-common/preview-user';

export const BondsTableSchema = (props) => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Thông tin giao dịch'),
      sortable: true,
      width: '30%',
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Code'),
                value: <Tag color={'rgb(0, 104, 255)'}>#{document.code}</Tag>,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Status'),
                value: (
                  <>
                    <Tag color="green">{t(document?.status)}</Tag>
                  </>
                ),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('transaction.quantity'),
                value: document.quantity,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Total Amount', {
                  en: 'Total Amount',
                  vn: 'Tổng tiền',
                }),
                value: FormatterUtils.formatAmount(
                  document?.totalAmount || 0,
                  'vnđ',
                ),
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('customer.n.staff'),
      dataIndex: 'customer',
      sortable: true,
      key: 'user',
      width: '30%',
      responsive: ['md'],
      render: (customer, document) => {
        return (
          <div>
            <PreViewUser user={customer} userTitle={t('Customer')} />
            <ItemViewer
              {...{
                label: t('Code'),
                value: (
                  <Tag color={'rgb(0, 104, 255)'}>#{document?.staffId}</Tag>
                ),
                labelClassName: 'm-b-0i',
              }}
            />
            {/* <PreViewUser user={document.staffId} userTitle={t('Tư vấn viên tài chính Fina / Cộng tác viên')}/> */}
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product'),
      dataIndex: 'product',
      sortable: true,
      key: 'product',
      width: '30%',
      render: (product, document) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Code'),
                value: <Tag color="green">#{product.code}</Tag>,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('product.sku'),
                value: <Tag color="purple">#{product.sku}</Tag>,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('product.productCodeOfTheInvestor'),
                value: (
                  <Tag color="cyan">#{product.productCodeOfTheInvestor}</Tag>
                ),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Product name'),
                value: product.name,
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createColumnCreatedAt(),
    TableUtils.createEditColumn(),
  ];
};
