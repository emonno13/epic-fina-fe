import { FormItemProps } from 'antd/lib/form';
import { RowProps } from 'antd/lib/row';
import { ColProps } from 'antd/lib/col';
import { FormProps } from 'antd/lib/form';
import cls from 'classnames';
import { WithTranslationProps } from 'react-i18next';
import { ArgsProps } from 'antd/lib/notification';
import { ReactNode } from 'react';

export const removeUnnecessaryProps = (data = {}, removeKeys) => {
  removeKeys.forEach(objKey => {
    delete data[objKey];
    // if (typeof data[objKey] === 'object') {
    // }
  });
  return data;
};

export const HPropsSerializer = {
  row: data => removeUnnecessaryProps(data, []),
  col: data => removeUnnecessaryProps(data, []),
  item: data =>
    removeUnnecessaryProps(data, [
      'Component',
      'ignore',
      'colProps',
      'rowProps',
      'isNewRow',
      'componentProps',
      'componentRef',
      'rendering',
      'relation',
    ]),
  form: data =>
    removeUnnecessaryProps(data, [
      'schema',
      'transport',
      'summitButtonStyleFull',
      'featureId',
      'hiddenValues',
      'resetIfSuccess',
      'hiddenFields',
      'endpoint',
      'nodeName',
      'onGotSuccess',
      'onGotError',
      'beforeSubmit',
      'onDataReadyToSubmit',
      'onReceivedResponse',
      'hideControlButton',
      'documentId',
      'withRelations',
      'isSearchForm',
      'showResetButton',
      'hideSubmitAndContinueButton',
      'beforeSubmitAndContinue',
      'submitButtonLabel',
      'resetButtonLabel',
      'submitAndContinueButtonLabel',
      'resetFields',
      'onGotSuccessAndContinue',
      'submitAndContinueRef',
      'submitRef',
      'onDataAttachToSubmitAndContinue',
      'removeControlActions',
      'preFormElements',
      't',
      'useDefaultMessage',
    ]),
};

export const SubmitButtonStyle = (formProps: HFormProps): string => {
  const { summitButtonStyleFull } = formProps || {};
  const classNames: String[] = [];
  if (summitButtonStyleFull) {
    classNames.push('full-width');
  }
  return classNames.join(' ');
};

export type HRowProps = RowProps;

export type HColProps = ColProps;

export interface HFormProps extends FormProps, WithTranslationProps {
  schema?: Function;
  onDataReadyToSubmit?: Function;
  onReceivedResponse?: Function;
  onDataAttachToSubmitAndContinue?: Function;
  transport?: any;
  preFormElements?: any;
  hideControlButton?: boolean;
  hideSubmitAndContinueButton?: boolean;
  showResetButton?: boolean;
  hiddenValues?: any;
  submitRef?: any;
  submitAndContinueRef?: any;
  withRelations?: any[];
  resetFields?: string[];
  summitButtonStyleFull?: boolean;
  hiddenFields?: any;
  endpoint?: string | Function;
  featureId?: string | Function;
  documentId?: any;
  nodeName?: string | Function;
  onGotSuccess?: Function;
  onGotSuccessAndContinue?: Function;
  onGotError?: Function;
  beforeSubmit?: Function;
  beforeSubmitAndContinue?: Function;
  // t: Function,
  resetIfSuccess?: boolean;
  isSearchForm?: boolean;
  removeControlActions?: boolean;
  submitButtonLabel?: string | ReactNode;
  iconBtnSubmit?: any;
  submitButtonClassName?: any;
  resetButtonLabel?: string;
  submitAndContinueButtonLabel?: string;
  showSuccessMessage?: boolean;
  t?: any;
  useDefaultMessage?: boolean;
  successMessage?: Function | ArgsProps;
  errorMessage?: Function | ArgsProps;
}

export interface HFormItemProps extends FormItemProps {
  Component?: any;
  ignore?: boolean;
  componentRef?: any;
  relation?: string;
  colProps?: HColProps;
  rowProps?: HRowProps;
  isNewRow?: boolean;
  rendering?: boolean;
  componentProps?: any;
  modernLabel?: boolean;
  name?: string | (string | number)[];
  label?: string | any;
}

export const createSchemaItem = (item: HFormItemProps = { name: '' }) => {
  item.componentProps ||= {};
  item.componentProps.size ||= 'large';
  return item;
};
export const createSchemaItemComponent =
  ComponentType => (Component: typeof ComponentType) => {
    return Component;
  };

export const createSchemaItemWithNewLabel = (
  item: HFormItemProps = { name: '' },
) => {
  const className = item?.className;
  item.className = cls('schema-item-with-new-label', {
    className: !!className,
  });
  item.componentProps ||= {};
  item.componentProps.size ||= 'large';
  if (item?.componentProps?.isNewDropDown === undefined) {
    item.componentProps.isNewDropdown = true;
  }

  return item;
};
