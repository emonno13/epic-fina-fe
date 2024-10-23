import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import { ConverterUtils } from '../../../../lib/converter';
import { TYPE_SMS_MESSAGE_MAPPING } from './constans';

export const SmsMessageTableSchema = () => {
  return [
    TableUtils.createTableColumnConfig({
      title: 'Người nhận',
      dataIndex: 'user',
      key: 'user',
      width: '250px',
      render: (user) => {
        return user ? ConverterUtils.getFullNameUser(user) : '_';
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Nội dung',
      width: '850px',
      dataIndex: 'content',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Phân loại',
      dataIndex: 'type',
      render: (type) => {
        return (
          <Tag color={TYPE_SMS_MESSAGE_MAPPING[type]?.color}>
            {TYPE_SMS_MESSAGE_MAPPING[type]?.label}
          </Tag>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Gửi đến',
      dataIndex: 'to',
      key: 'to',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      width: '300px',
      key: 'createdAt',
      render: (createdAt) => {
        return ConverterUtils.fullDatetimeConverter(createdAt);
      },
    }),
  ];
};
