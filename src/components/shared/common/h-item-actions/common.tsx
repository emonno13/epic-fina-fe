import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import { Menu } from 'antd';
import { HActionUtils } from './utils';
import { DotsVertical } from '../../../../icons';

interface HItemActionProps {
  onAction?: any,
  icon?: any,
  label?: any,
  subMenu?: any,
  dataItem?: any,
  containerId?: any,
  dataIndex?: number,
}

export const HWithPanelAction = (Component) => ((props) => {
  return (
    <div className={'flex h-action-panel'}>
      <Component {...props}/>
    </div>
  );
});

export const HItemAction = ({ onAction, icon, label, subMenu, dataItem, dataIndex, containerId }: HItemActionProps) => {
  return (
    <div onClick={onAction} className={`item flex item-center ${subMenu?.length > 0 ? '' : 'no-extra'}`}>
      <div className={`flex ${label ? 'pr-5' : ''}`}>{icon}</div>
      <div>{label}</div>
      {subMenu?.length > 0 && (
        <div onClick={(event) => event.stopPropagation()} className={'item-extra flex item-center'}>
          <Dropdown overlay={(<Menu>{
            HActionUtils.generateDropdownMenuConfigs(subMenu, 0, { currentDataItem: dataItem, currentIndex: dataIndex, containerId })
          }</Menu>)} trigger={['click']}>
            <DotsVertical fill={'var(--primary-color)'} height={15} width={12}/>
          </Dropdown>
        </div>
      )}
    </div>
  );
};