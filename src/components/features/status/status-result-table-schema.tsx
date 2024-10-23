import React from 'react';
import { Tooltip } from 'antd';
import { TableUtils } from '../../../lib/table-utils';
import { ConverterUtils } from '../../../lib/converter';

export const StatusResultSchema = () => {
  return ([
    TableUtils.createTableColumnConfig({
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (_, document: any) => {
        return (
          <div className="swatch">
            <div className="color" style={{ background: document?.color }}/>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Code status',
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Name status',
      dataIndex: 'name',
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Model status',
      dataIndex: 'model',
      key: 'model',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
      render: (parent) => {
        return (
          <Tooltip placement="topLeft" title={`${parent?.name}`}>
            {parent?.name}
          </Tooltip>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: ConverterUtils.showUserConverter,
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ]);
};
