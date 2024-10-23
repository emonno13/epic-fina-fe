import { Tag } from 'antd';

import { TableUtils } from '@lib/table-utils';
import { FormatterUtils } from '../../../../../../../lib/formatter';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { ItemViewer } from '../../../../../../shared/common/configuration/item-viewer';

export const PreviewTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: 'Thông tin khách hàng',
      sortable: true,
      key: 'customerInfo',
      render: (_, record) => {
        return (
          <>
            <ItemViewer
              {...{
                label: 'Tên',
                value: record.data?.customer?.fullName,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'Phone',
                value: record.data?.customer?.tel,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'Emails',
                value: record.data?.customer?.email,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'CMND/CCCD',
                value: record.data?.customer?.identity,
                labelClassName: 'm-b-0i',
              }}
            />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Thông tin sản phẩm vay',
      sortable: true,
      key: 'loanProductInfo',
      render: (_, record) => {
        return (
          <>
            <ItemViewer
              {...{
                label: 'Danh mục SP',
                value: record.data?.deal?.categoryCode,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'Mã SP',
                value: record.data?.deal?.productCode,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'Mã căn',
                value: record.data?.deal?.apartmentCode,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'Địa chỉ',
                value: record.data?.deal?.address,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'Số tiền cần vay',
                value: FormatterUtils.formatAmount(
                  record.data?.deal?.amount || 0,
                  'vnđ',
                ),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'Thời gian vay',
                value: `${record.data?.deal?.time} ${t('year', { vn: 'Năm' })}`,
                labelClassName: 'm-b-0i',
              }}
            />
          </>
        );
      },
    }),

    TableUtils.createTableColumnConfig({
      title: 'Các thông tin khác',
      sortable: true,
      key: 'otherInfo',
      render: (_, record) => {
        return (
          <>
            <div>
              <Tag color={'cyan'}>Thông tin nguồn:</Tag>
            </div>
            <ItemViewer
              {...{
                label: 'Tên',
                value: record.data.broker?.fullName,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'Email',
                value: record.data.broker?.email,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'SĐT',
                value: record.data?.broker?.tel,
                labelClassName: 'm-b-0i',
              }}
            />
            <hr />
            <div>
              <Tag color={'green'}>Thông tin tư vấn viên FINA:</Tag>
            </div>
            <ItemViewer
              {...{
                label: 'Tên',
                value: record.data?.counsellor?.fullName,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'Email',
                value: record.data?.counsellor?.email,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: 'SĐT',
                value: record.data?.counsellor?.tel,
                labelClassName: 'm-b-0i',
              }}
            />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Status',
      sortable: true,
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return (
          <Tag color={status === 'ok' ? 'blue-inverse' : 'red-inverse'}>
            {status}
          </Tag>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Message',
      sortable: true,
      dataIndex: 'messages',
      key: 'messages',
      render: (messages) => {
        return (
          <ul>
            {messages?.map((message, index) => (
              <li key={index} style={{ color: 'red' }}>
                {message}
              </li>
            ))}
          </ul>
        );
      },
    }),

    TableUtils.createDeleteControlColumn(),
  ];
};
