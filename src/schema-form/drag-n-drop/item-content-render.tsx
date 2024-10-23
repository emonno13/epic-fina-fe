import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import { ActionDndParams } from './types';
import { ActionItemSchemaProps, HActions, HSchemaActions } from '../../components/shared/common/h-item-actions';
import { HActionUtils } from '../../components/shared/common/h-item-actions/utils';

interface ItemContentRenderProps {
  schema?: ActionItemSchemaProps[],
  handleSelectItem?: Function | any,
  renderItemElement?: (currentDataItem, metadata) => any,
  handleDeleteItem?: Function | any,
  actionParams: ActionDndParams,
  handleAddNewItem?: Function | any,
  className?: string
  setIsSelected: (status) => void
}

export const ItemContentRender = ({
  schema,
  handleSelectItem,
  renderItemElement = () => null,
  handleDeleteItem,
  setIsSelected,
  actionParams,
  handleAddNewItem,
  className,
}: ItemContentRenderProps) => {
  const { containerId, currentDataItem, currentIndex } = actionParams;
  const content = (
    <div className={`flex-grow ${className}`} onClick={handleSelectItem}>
      {renderItemElement(currentDataItem, { currentIndex, containerId })}
    </div>
  );
  return (
    <div className={'flex'} onBlur={() => setIsSelected(false)}>
      {schema && (
        <Dropdown onVisibleChange={setIsSelected} overlay={<Menu>{HActionUtils.generateDropdownMenuConfigs(schema, 0, actionParams)}</Menu>}
          trigger={['contextMenu']}>
          {content}
        </Dropdown>
      )}
      {!schema && content}
      <div className={'flex self-center mr-10'}>
        {!schema && (
          <HActions {...{ onDelete: handleDeleteItem, onEdit: handleSelectItem, onAddItem: handleAddNewItem }} />)}
        <HSchemaActions schema={schema} actionParams={actionParams}/>
      </div>
    </div>
  );
};