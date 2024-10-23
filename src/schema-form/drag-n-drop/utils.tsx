import { HDragAndDropProps } from './types';

export const HDragAndDropUtils = {
  getIid: (props: HDragAndDropProps) => {
    const { dataItem, getDroppableId = () => undefined } = props;
    return getDroppableId(props) || dataItem?.id || dataItem?._iid || dataItem?.iid;
  },
  getDroppableType: (props: HDragAndDropProps) => {
    const { type, dataItem, droppableId, getDroppableType = () => undefined } = props;
    return getDroppableType(dataItem) || type || dataItem?.type || dataItem?.id || dataItem?._iid || dataItem?.iid || droppableId;
  },
  findItemById: (items: any[] = [], id: any, namespace = 'children', returnIndex = false) => {
    for (let index = 0; index < items.length; index++) {
      const dataItem = items[index];
      const objectId = dataItem?.id || dataItem?._iid || dataItem?.iid;
      if (objectId == id) {
        dataItem[namespace] ||= [];
        return returnIndex ? { dataItem, index } : dataItem;
      }
      if (dataItem[namespace] && Array.isArray(dataItem[namespace])) {
        const result = HDragAndDropUtils.findItemById(dataItem[namespace], id, namespace);
        if (result) {
          return result;
        }
      }
    }
  },
  findItemByDNDId: (items: any[], dndId: string, namespace = 'children', returnIndex = false) => {
    const ids = dndId.split(':');
    const result = HDragAndDropUtils.findItemById(items, ids[0], namespace, returnIndex);
    if (ids.length === 1) {
      return result;
    }
    const dataItem = returnIndex ? result.dataItem : result;
    return HDragAndDropUtils.findItemByDNDId(dataItem[namespace], dndId.substring(dndId.indexOf(':') + 1, dndId.length), namespace, returnIndex);
  },
  findItemAndIndexInContainerById: (items: any[], containerId: string, itemId: string, namespace = 'children') => {
    const containerObject = HDragAndDropUtils.findItemByDNDId(items, containerId, namespace, true);
    if (containerId === itemId) {
      return containerObject;
    }
    if (!containerObject) {
      return HDragAndDropUtils.findItemByDNDId(items, itemId, namespace, true);
    }
    return HDragAndDropUtils.findItemByDNDId(containerObject[namespace], itemId, namespace, true);
  },
  asArray: (items: any[], namespace = 'children') => {
    const result = Array.from(items);
    result.map(item => {
      const subItems = item[namespace];
      if (subItems && Array.isArray(subItems)) {
        item[namespace] = HDragAndDropUtils.asArray(subItems);
      }
    });
    return result;
  },
  moveOrOrder: (items: any[], reorderResult: any, namespace = 'children') => {
    const { combine, destination, draggableId, source } = reorderResult;
    try {
      const sourceList = (HDragAndDropUtils.findItemByDNDId(items, source.droppableId, namespace) || {})[namespace] || items;
      const destinationList = destination.droppableId == source.droppableId ? sourceList : (HDragAndDropUtils.findItemByDNDId(items, destination.droppableId, namespace) || {})[namespace];
      const [removed] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, removed);
      return items;
    } catch (e) {
      console.log(e);
    }
    return items;
  },
  addItem: (items: any[], item: any, addToId: string, itemIndex = 0, position = 'after', namespace = 'children') => {
    let index = position === 'after' ? itemIndex + 1 : itemIndex - 1;
    index = index < 0 ? 0 : index;

    const destinationList = (HDragAndDropUtils.findItemByDNDId(items, addToId, namespace) || {})[namespace] || items;
    destinationList.splice(index, 0, item);
    return items;
  },
  removeItem: (items: any[], fromId: string, itemId: string, namespace = 'children') => {
    let sourceList = (HDragAndDropUtils.findItemByDNDId(items, fromId, namespace) || {})[namespace];
    if (!sourceList?.length) {
      sourceList = items;
    }
    const newItemAndCurrentIndex = HDragAndDropUtils.findItemAndIndexInContainerById(items, fromId, itemId, namespace);
    sourceList.splice(newItemAndCurrentIndex?.index, 1);
    return items;
  },
  updateItem: (items: any[], fromId: string, item, namespace = 'children') => {
    const sourceList = (HDragAndDropUtils.findItemByDNDId(items, fromId, namespace) || {})[namespace] || items;
    const newItemAndCurrentIndex = HDragAndDropUtils.findItemAndIndexInContainerById(items, fromId, item.id, namespace);
    sourceList[newItemAndCurrentIndex?.index] = item;
    return items;
  },
};
const grid = 2;
export const getItemStyle = (isDragging, draggableStyle) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    textAlign: 'right',
    // change background colour if dragging
    background: isDragging ? 'var(--primary-color)' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};

export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  color: isDraggingOver ? '#111111' : '#111111',
  padding: 8,
  // width: 350,
});

export const getSubListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  color: isDraggingOver ? '#ffffff' : '#111111',
  padding: 4,
  // width: 250,
});
