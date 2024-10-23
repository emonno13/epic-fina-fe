import { Tag } from 'antd';
import React from 'react';
import { CloseOutlined , CheckOutlined } from '@ant-design/icons';
import { useHTranslation } from '../../../../../../lib/i18n';
import { TableUtils } from '../../../../../../lib/table-utils';
import { ItemViewer } from '../../../../../shared/common/configuration/item-viewer';
import { ConverterUtils } from '../../../../../../lib/converter';
import { ORDER_MATCHING_DAY_MAPPING, STATUS_PRODUCT_FUND_MAPPING } from '../constants';

export const FundTableDetailSchema = () => {
  const { t } = useHTranslation('admin-common');
  return ([
    TableUtils.createTableColumnConfig({
      title: t('fundProduct.code'),
      dataIndex: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('fundProduct.name'),
      dataIndex: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('product.status'),
      dataIndex: 'status',
      render: (status) => (
        <Tag color={STATUS_PRODUCT_FUND_MAPPING[status].color}>
          {t(STATUS_PRODUCT_FUND_MAPPING[status].label)}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('fundProduct.organization'),
      dataIndex: 'org',
      render: org => org.name,
    }),
    TableUtils.createTableColumnConfig({
      title: t('fundProduct.detailInformation'),
      render: record => {
        return <>
          <ItemViewer
            label={t('fundProduct.orderMatchingDate')}
            value={record?.info?.orderMatchingDate?.map((item:any) => ORDER_MATCHING_DAY_MAPPING[item]).join(', ')}
          />

          <ItemViewer
            label={t('fundProduct.nextOrderMatchingSession')}
            value={ConverterUtils.dateConverterToString(record?.info?.nextOrderMatchingSession)}
          />

          <ItemViewer
            label={t('fundProduct.closedOrderBookTime')}
            value={ConverterUtils.fullDatetimeConverter(record?.info?.closedOrderBookTime)}
          />

          <ItemViewer
            label={t('fundProduct.orderAndTransferMoneyToBuyDate')}
            value={ConverterUtils.fullDatetimeConverter(record?.info?.orderAndTransferMoneyToBuyDate)}
          />
        </>;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Nổi bật', { en: 'Outstanding' }),
      dataIndex: 'isOutstanding',
      align: 'center',
      render: isOutstanding => {
        return isOutstanding ? <CheckOutlined  style={{ fontSize: '20px', color: '#5b8c00' }} /> : <CloseOutlined style={{ fontSize: '20px', color: '#cf1322' }}/>;
      },
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ]);
};
