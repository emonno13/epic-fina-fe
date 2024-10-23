import { ActionItemSchemaProps } from '@components/shared/common/h-item-actions';

interface Passable {
  renderActions?: any;
  onEdit?: (params: ActionDndParams) => any;
  onAddItem?: (params: ActionDndParams) => any;
  onPreview?: any;
  containerId?: any;
  featureId?: string;
  showQuickAdd?: boolean;
  getDroppableType?: (currentDataItem: any) => string;
  isContainer?: (currentDataItem: any) => boolean;
  renderItemElement?: (currentDataItem, metadata?: any) => any;
  onDelete?: any;
  renderActionWithSchema?: (
    params: ActionDndParams | ActionDndParamsWithDefaultActions,
  ) => ActionItemSchemaProps[];
  showNoItem?: boolean;
}

export interface ActionDndParams {
  currentDataItem?: any;
  currentIndex?: number;
  containerId: string;
}

export interface ActionDndParamsWithDefaultActions extends ActionDndParams {
  onSelectDndItem?: (params: ActionDndParams) => void;
  onAddNewDndItem?: (params: ActionDndParams) => void;
  onDeleteDndItem?: (params: ActionDndParams) => void;
}

export interface HDroppableProps extends Passable {
  children?: any;
  dataItem: any;
  droppableId?: any;
  draggableId?: any;
  index: number;
  getListStyle?: Function;
  getItemStyle?: Function;
}

export interface HDraggableProps extends Passable {
  children?: any;
  dataItem: any;
  draggableId?: any;
  index: number;
  getListStyle?: Function;
  getItemStyle?: Function;
}

export interface HDragAndDropContextProps extends Passable {
  maxLevel?: number;
  document?: any;
  isCurrentDocumentFeature?: boolean;
  childrenNamespace?: string;
  initialValues?: any;
  empty?: {
    icon;
    title;
    buttonLabel;
    description;
  };
  defaultType?: any;
}

export interface HDragAndDropProps extends Passable {
  droppableId?: any;
  namespace?: string;
  level: number;
  maxLevel: number;
  children?: any;
  getDroppableId?: Function;
  type?: any;
  parentId: string;
  dataItem: any;
}
