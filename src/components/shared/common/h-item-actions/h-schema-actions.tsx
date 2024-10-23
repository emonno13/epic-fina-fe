import { HActionUtils } from './utils';
import { HWithPanelAction } from './common';
import { ActionDndParams } from '../../../../schema-form/drag-n-drop/types';

export interface ActionItemSchemaProps {
  icon?: any;
  label?: any;
  menuLabel?: any;
  action?: any;
  dataItem?: any;
  id?: any;
  permission?: string;
  confirmText?: string;
  disabled?: boolean;
  hidden?: boolean;
  subMenuType?: 'subMenu' | 'group';
  permissions?: string[];
  subMenu?: ActionItemSchemaProps[];
}

interface HSchemaActionsProps {
  schema: ActionItemSchemaProps[];
  actionParams: ActionDndParams;
  childElement?: React.ReactElement;
}

export const createActionSchemaItem = (props: ActionItemSchemaProps) => ({
  ...props,
});

export const HSchemaActions = HWithPanelAction(
  ({ schema, actionParams, childElement }: HSchemaActionsProps) => {
    if (!schema) {
      return null;
    }
    return HActionUtils.generateActions(schema, actionParams, childElement);
  },
);
