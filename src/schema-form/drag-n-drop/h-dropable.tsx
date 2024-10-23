import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { HDragAndDropUtils } from './utils';

export interface HDroppableProps {
  children?: any,
  droppableId: string,
  dataItem?:any,
  type?: string,
  getDroppableType?: (currentDataItem: any) => string
  getListStyle?: Function
}

export const HDroppable = ({
  children,
  droppableId,
  type,
  getDroppableType,
  dataItem,
  getListStyle = () => ({}),
}: HDroppableProps) => {
  const itemType = HDragAndDropUtils.getDroppableType({ dataItem, type, getDroppableType } as any);
  return (
    <Droppable droppableId={droppableId} type={itemType}>
      {(provided, snapshot) => {
        return (
          <div
            className={`${droppableId} ${itemType}`}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};