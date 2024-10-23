import { LeftFixedRightDynamicColumn } from '@components/shared/common/h-grids/left-fixed-right-dynamic';
import { useSetItem } from '@schema-form/features/hooks';
import { DragIndicator } from 'icons';
import { useMemo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  useCurrentItemId,
  useSelectedOptionItemId,
} from '../features/hooks/document-detail-hooks';
import { ItemContentRender } from './item-content-render';
import { QuickAddAction } from './quick-add-action';
import { ActionDndParams, HDraggableProps } from './types';
import { HDragAndDropUtils } from './utils';

export const HDraggable = ({
  children,
  renderItemElement,
  featureId,
  getDroppableType,
  showQuickAdd = true,
  renderActionWithSchema,
  onEdit = (params: ActionDndParams) => {},
  onDelete,
  draggableId,
  containerId,
  dataItem,
  onAddItem = (params: ActionDndParams) => {},
  index,
  getItemStyle = () => ({}),
}: HDraggableProps) => {
  const setItem = useSetItem(featureId);
  const currentId: any = useCurrentItemId();
  const selectedOptionItemId: any = useSelectedOptionItemId();
  const [isSelected, setIsSelected] = useState(false);
  const actionParams = {
    currentDataItem: dataItem,
    currentIndex: index,
    containerId: containerId,
  };
  const handleAddNewItem = () => {
    onAddItem(actionParams);
  };
  const handleSelectItem = () => {
    setItem(dataItem, true, { containerId, currentIndex: index });
    onEdit(actionParams);
  };
  const handleDeleteItem = onDelete
    ? () => {
        onDelete(dataItem);
      }
    : undefined;

  const schema = useMemo(() => {
    return (
      (!!renderActionWithSchema && renderActionWithSchema(actionParams)) ||
      undefined
    );
  }, [dataItem, containerId]);
  const isSelectedItemViaEditingItem = currentId && currentId === dataItem?.id;
  const isSelectedItemViaAddNewItem =
    selectedOptionItemId && selectedOptionItemId === dataItem?.id;
  const itemClass = HDragAndDropUtils.getDroppableType({
    dataItem,
    getDroppableType,
  } as any);
  return (
    <Draggable draggableId={`${draggableId}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={`ui-${itemClass}-panel`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
          )}
        >
          <LeftFixedRightDynamicColumn
            {...{
              className: `draggable-item ${isSelected || isSelectedItemViaEditingItem ? 'selected-item' : ''} ${isSelectedItemViaAddNewItem ? 'add-below-item' : ''}`,
              leftChildren: (
                <div className={'indicator'} {...provided.dragHandleProps}>
                  <DragIndicator fill={'none'} />
                </div>
              ),
              spacing: 10,
              rightChildren: (
                <ItemContentRender
                  {...{
                    schema,
                    isSelected,
                    setIsSelected,
                    className: 'content-panel',
                    handleSelectItem,
                    renderItemElement,
                    handleDeleteItem,
                    actionParams,
                    handleAddNewItem,
                  }}
                />
              ),
            }}
          >
            <QuickAddAction
              {...{ showQuickAdd, onAddNewItem: handleAddNewItem }}
            />
          </LeftFixedRightDynamicColumn>
          {children}
        </div>
      )}
    </Draggable>
  );
};
