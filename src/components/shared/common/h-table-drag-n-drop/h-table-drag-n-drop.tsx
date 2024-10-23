import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import classNames from 'classnames';
import update from 'immutability-helper';
import React, { useCallback, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './h-table-drag-n-drop.module.scss';

interface HTableDndProps extends TableProps<any> {
  className?: string;
  dataSource: Array<Object>;
  setDataSource: (data: Array<Object>) => void;
  columns?:any
}

interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: DraggableBodyRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {} as any;
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const columnsDefault: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

export const HTableDragNDrop = (props: HTableDndProps) => {
  const {
    className,
    columns = columnsDefault,
    setDataSource,
    dataSource,
    ...tableProps
  } = props;

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = dataSource[dragIndex];
      setDataSource(
        update(dataSource, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [dataSource],
  );
  return (
    <div className={classNames('h-table-dnd', {
      className,
    })}>
      <DndProvider backend={HTML5Backend}>
        <Table
          columns={columns}
          dataSource={dataSource}
          components={components}
          onRow={(_, index) => {
            const attr = {
              index,
              moveRow,
            };
            return attr as React.HTMLAttributes<any>;
          }}
          pagination={false}
          {...tableProps}
        />
      </DndProvider>
    </div>
  );
};
