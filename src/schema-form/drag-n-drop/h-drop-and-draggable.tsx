import React from 'react';
import { getItemStyle, getSubListStyle, HDragAndDropUtils } from './utils';
import { HDroppable } from './h-dropable';
import { HDraggable } from './h-draggable';
import { HDragAndDropProps } from './types';

const HDropAndDraggable = (props: HDragAndDropProps) => {
  const {
    droppableId, children,
    getDroppableType = (dataItem) => '',
    isContainer = (dataItem) => false,
    level,
    namespace = 'children',
    renderItemElement = (item) => '',
    maxLevel, containerId, dataItem, featureId,
  } = props;
  const dataList = dataItem[namespace];
  if ((!dataList || dataList?.length === 0) && !isContainer(dataItem)) return null;
  const currentDroppableId =  `${droppableId || HDragAndDropUtils.getIid(props)}`;
  return (
    <HDroppable {...{ droppableId: currentDroppableId, getDroppableType, dataItem, getListStyle: getSubListStyle }}>
      {dataList?.map((dataItem, index) => {
        const draggableIdViaObject = HDragAndDropUtils.getIid({ ...props, dataItem });
        const hasChildren = level < maxLevel && dataItem[namespace];
        const draggableId = `${containerId}:${draggableIdViaObject}`;
        return (
          <HDraggable
            key={draggableId} {...{ ...props, draggableId, index, dataItem, featureId, getItemStyle, renderItemElement, containerId: currentDroppableId }}>
            {children}
            {(hasChildren) && (
              <HDropAndDraggable {...{
                ...props,
                isContainer,
                namespace: 'children',
                droppableId: draggableId,
                getDroppableType,
                containerId: draggableId,
                renderItemElement,
                level: level + 1,
                maxLevel,
                dataItem }}/>
            )}
          </HDraggable>
        );
      })}
    </HDroppable>
  );
};

export default HDropAndDraggable;
