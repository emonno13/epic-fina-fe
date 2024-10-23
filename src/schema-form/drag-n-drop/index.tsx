import React from 'react';
import { useAddNewDndItem, useDeleteDndItem, useUpdateDndItem } from './hooks';
import { ActionDndParams, ActionDndParamsWithDefaultActions, HDragAndDropContextProps } from './types';
import HDragAndDropPlayer, { DEFAULT_ITEM_TYPE } from './h-drag-and-drop-player';
import { HDNDProvider } from './contexts/h-dnd-provider';
import { useItem, useSetItem } from '../features/hooks';
import { useItemOptions } from '../features/hooks/document-detail-hooks';
import { NEW_ITEM_DOCUMENT_ID } from '../features/forms/h-item-form';

export interface HDragAndDropProps extends HDragAndDropContextProps {
  children?: any | ((currentDataItem, onSubmitGotSuccess) => any),
  renderFormEditor?: (currentDataItem, onSubmitGotSuccess) => any,
  itemNodeName?: string,
  itemEndpoint?: string,
  shouldUpdateOrderNumbers?: boolean,
}

export const HDragAndDrop = (props: HDragAndDropProps) => {
  const {
    renderFormEditor = (currentDataItem, onGotSuccess) => null,
    renderActionWithSchema = ((actionParams: ActionDndParamsWithDefaultActions) => []),
    childrenNamespace = 'children',
    itemNodeName,
    itemEndpoint,
    shouldUpdateOrderNumbers,
  } = props;
  const { data } = useItem() || {};
  const itemOptions = useItemOptions();
  const addNewDndItem = useAddNewDndItem(childrenNamespace);
  const deleteDndItem = useDeleteDndItem(childrenNamespace);
  const updateDndItem = useUpdateDndItem(childrenNamespace);
  const setDndItem = useSetItem();
  const handleAddNewDndItem = (actionParams: ActionDndParams) => {
    setDndItem({
      id: NEW_ITEM_DOCUMENT_ID,
      type: actionParams?.currentDataItem?.type || props.defaultType || DEFAULT_ITEM_TYPE,
    }, true, actionParams);
  };
  const handleDeleteDndItem = (actionParams: ActionDndParams) => {
    deleteDndItem(actionParams?.currentDataItem?.id, actionParams);
  };
  const handleSelectDndItem = ({ currentDataItem, ...actionParams }: ActionDndParams) => {
    setDndItem(currentDataItem, true, actionParams);
  };
  const handleOnSubmitSuccess = (response, isSubmitAndContinue, isNewDocument) => {
    if (isNewDocument) {
      addNewDndItem(response, itemOptions, 'after');
    } else {
      updateDndItem({ ...data, ...response }, itemOptions);
    }
  };
  const handleRenderItemActions = (actionParams) => {
    return renderActionWithSchema({
      ...actionParams,
      onSelectDndItem: handleSelectDndItem,
      onAddNewDndItem: handleAddNewDndItem,
      onDeleteDndItem: handleDeleteDndItem,
    });
  };

  return (
    <HDNDProvider {...{ itemNodeName, itemEndpoint, shouldUpdateOrderNumbers }}>
      <div className={'border border-1 border-grey4 min-h-full p-20'}>
        <HDragAndDropPlayer {...{
          ...props,
          renderActionWithSchema: handleRenderItemActions,
          onAddItem: handleAddNewDndItem,
        }}/>
        {typeof props.children !== 'function' ? props.children : ''}

        {renderFormEditor(data, handleOnSubmitSuccess)}
        {typeof props.children === 'function' ? props.children(data, handleOnSubmitSuccess) : ''}
      </div>
    </HDNDProvider>
  );
};

export default HDragAndDrop;