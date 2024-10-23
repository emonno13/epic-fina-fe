import { EditOutlined, DeleteOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import { HItemAction, HWithPanelAction } from './common';

interface HActionsProps {
  onEdit?: any,
  onDelete?: any,
  onPreview?: any,
  onAddItem?: any,
}

export const HEditAction = HWithPanelAction(({ onEdit }) => {
  return (
    <HItemAction {...{ icon: <EditOutlined/>, onAction: onEdit }}/>
  );
});

export const HDeleteAction = HWithPanelAction(({ onDelete }) => {
  return (
    <HItemAction {...{ icon: <DeleteOutlined/>, onAction: onDelete }}/>
  );
});

export const HPreviewAction = HWithPanelAction(({ onPreview }) => {
  return (
    <HItemAction {...{ icon: <EyeOutlined/>, onAction: onPreview }}/>
  );
});

export const HActions = HWithPanelAction(({ onEdit, onDelete, onPreview, onAddItem }: HActionsProps) => {
  return (
    <>
      {onPreview && (<HItemAction {...{ icon: <EyeOutlined/>, onAction: onPreview }}/>)}
      {onEdit && (<HItemAction {...{ icon: <EditOutlined/>, onAction: onEdit }}/>)}
      {onAddItem && (<HItemAction {...{ icon: <PlusCircleOutlined/>, onAction: onAddItem }}/>)}
      {onDelete && (<HItemAction {...{ icon: <DeleteOutlined/>, onAction: onDelete }}/>)}
    </>
  );
});