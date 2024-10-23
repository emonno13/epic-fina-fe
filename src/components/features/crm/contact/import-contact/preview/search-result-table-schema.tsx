import React from 'react';
import { Tag } from 'antd';

import { TableUtils } from '@lib/table-utils';
import { ImportUtils } from '@components/shared/common/import-data/utils';

export const ContactTableSchema = () => {
  return [
    TableUtils.createTableColumnConfig({
      title: 'Full name',
      sortable: true,
      key: 'fullName',
      render: (_, record) => ImportUtils.getValue(record, 'fullName') || '',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Emails',
      sortable: true,
      key: 'emails',
      render: (_, record) => {
        const emails = ImportUtils.getValue(record, 'emails') || [];
        return (
          <div>
            {emails?.map((row, index) => <div key={index}>{row.email}</div>)}
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Tels',
      sortable: true,
      key: 'tels',
      render: (_, record) => {
        const tels = ImportUtils.getValue(record, 'tels') || [];
        return (
          <div>
            {tels?.map((row, index) => <div key={index}>{row.tel}</div>)}
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Birthday',
      sortable: true,
      key: 'yearOfBirth',
      render: (_, record) => ImportUtils.getValue(record, 'yearOfBirth'),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Addresses',
      sortable: true,
      key: 'addresses',
      render: (_, record) => {
        const addresses = ImportUtils.getValue(record, 'addresses') || [];
        return (
          <div>
            {addresses.map((row, index) => (
              <div key={index}>{row.address}</div>
            ))}
          </div>
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
          <div>
            {messages?.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
        );
      },
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
