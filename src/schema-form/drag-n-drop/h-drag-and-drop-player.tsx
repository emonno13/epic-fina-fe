import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { BoardIcon } from '@icons';
import { useDocumentDetail, useFeatureId } from '@schema-form/features/hooks';
import { Tag } from 'antd';
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { HButton } from '../../components/shared/common-form-elements/h-confirmation-button';
import { Title } from '../../components/shared/typography';
import {
  useCurrentItemId,
  useUpdateDndItemContainerAndIndex,
} from '../features/hooks/document-detail-hooks';
import { HDraggable } from './h-draggable';
import HDropAndDraggable from './h-drop-and-draggable';
import { HDroppable } from './h-dropable';
import { useMoveOrReorderDndItems } from './hooks';
import { HDragAndDropContextProps } from './types';
import { getItemStyle, getListStyle, HDragAndDropUtils } from './utils';

import './h-drag-n-drop.module.scss';

export const DEFAULT_MAIN_CONTAINER_ID = 'container';
export const DEFAULT_ITEM_TYPE = 'item';

const defaultRenderItemElement = (educationLevel) => {
  return (
    <div className={'item flex items-center'}>
      <div className={`${educationLevel?.type}`}>
        <Tag color="var(--primary-color)">{educationLevel?.code}</Tag>
        {educationLevel?.name}
      </div>
    </div>
  );
};

const NoItem = ({
  onAddItem,
  initialValues,
  defaultType,
  empty,
  document,
  render,
}) => {
  if (!render) {
    return null;
  }
  const handleAddNewItem = () => {
    const initDocumentItem = initialValues || {
      type: defaultType || DEFAULT_ITEM_TYPE,
    };
    onAddItem({
      currentDataItem: initDocumentItem,
      containerId: document?.id || DEFAULT_MAIN_CONTAINER_ID,
      currentIndex: 0,
    });
  };
  return (
    <div className={'flex'}>
      <div>
        {empty?.icon || <BoardIcon fill={'#DCE0E5'} width={180} height={150} />}
      </div>
      <div>
        <Title preset={'bold14'}>{empty?.title}</Title>
        <div
          className={'text-grey1 pb-10'}
          dangerouslySetInnerHTML={{ __html: empty?.description }}
        ></div>
        <HButton
          onClick={handleAddNewItem}
          className={'item-center flex items-center'}
          icon={<PlusOutlined />}
          shape={'round'}
        >
          {empty?.buttonLabel || 'Add a Item'}
        </HButton>
      </div>
    </div>
  );
};

const HDragAndDropPlayer = (props: HDragAndDropContextProps) => {
  const {
    maxLevel = 2,
    onAddItem,
    renderItemElement = defaultRenderItemElement,
    empty,
    initialValues,
    defaultType,
    getDroppableType = (dataItem) => '',
    isContainer = (dataItem) => false,
    childrenNamespace = 'children',
    isCurrentDocumentFeature = true,
    showNoItem = true,
  } = props;
  const featureId = props.featureId || useFeatureId();
  const document = props.document || useDocumentDetail() || {};
  const moveOrReorderItems = useMoveOrReorderDndItems();
  const currentId: any = useCurrentItemId();
  const updateDndItemContainerAndIndex = useUpdateDndItemContainerAndIndex();
  const [localItems, setLocalItems] = useState<any[]>([]);
  useEffect(() => {
    setLocalItems(document[childrenNamespace]);
  }, [document]);
  const onDragEnd = (result) => {
    const destination = result.destination;
    if (!result.destination) {
      return;
    }
    const reorderedItems = HDragAndDropUtils.moveOrOrder(
      localItems,
      result,
      childrenNamespace,
    );
    isCurrentDocumentFeature &&
      moveOrReorderItems(reorderedItems, childrenNamespace);
    setLocalItems([...reorderedItems]);
    if (currentId) {
      const newItemAndCurrentIndex =
        HDragAndDropUtils.findItemAndIndexInContainerById(
          reorderedItems,
          destination.droppableId,
          currentId,
          childrenNamespace,
        );
      updateDndItemContainerAndIndex(currentId, {
        currentIndex: newItemAndCurrentIndex?.index,
        containerId: destination.droppableId,
      });
    }
  };

  return (
    <div className={'ui-h-drag-n-drop'}>
      {showNoItem && (
        <NoItem
          {...{
            onAddItem,
            document,
            empty,
            initialValues,
            defaultType,
            render: !localItems?.length,
          }}
        />
      )}
      <DragDropContext
        onDragEnd={onDragEnd}
        // onDragUpdate={onDragUpdate}
      >
        <HDroppable
          {...{
            index: 0,
            dataItem: document,
            getDroppableType,
            droppableId: document?.id || DEFAULT_MAIN_CONTAINER_ID,
            getListStyle,
          }}
        >
          {localItems?.map((dataItem: any, index) => {
            return (
              <HDraggable
                key={dataItem.id}
                {...{
                  ...props,
                  onAddItem,
                  featureId,
                  containerId: document.id,
                  draggableId: dataItem.id,
                  index,
                  dataItem,
                  getItemStyle,
                  renderItemElement,
                }}
              >
                <HDropAndDraggable
                  {...{
                    ...props,
                    dataItem,
                    containerId: dataItem.id,
                    droppableId: dataItem.id,
                    featureId,
                    parentId: dataItem.id,
                    level: 2,
                    maxLevel,
                    namespace: childrenNamespace,
                    renderItemElement,
                  }}
                  key={dataItem.id}
                />
              </HDraggable>
            );
          })}
        </HDroppable>
      </DragDropContext>
    </div>
  );
};

export default HDragAndDropPlayer;
