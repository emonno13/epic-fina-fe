import { HFormItemProps, HFormProps } from '@schema-form/h-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormItemWithComponent } from '../../../h-form';
import { FormUtils } from '../../../utils/form-utils';
import { EditableContext } from './editable-context';

interface EditableCellProps {
  title: React.ReactNode;
  itemSchema?: HFormItemProps;
  children: React.ReactNode;
  dataIndex: any;
  onRowDataChanged?: Function;
  onReload?: Function;
  onSoftReload?: Function;
  record: any;
  formProps: HFormProps;
  useDefaultMessage?: boolean;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  itemSchema,
  children,
  dataIndex,
  onRowDataChanged,
  record,
  onSoftReload = (f) => f,
  onReload,
  formProps,
  useDefaultMessage = false,
  ...restProps
}) => {
  if (!itemSchema) {
    return <td {...restProps}>{children}</td>;
  }
  const canDefaultEdit = !record[dataIndex] && !!itemSchema.rules;
  const { Component } = itemSchema || {};
  const [editing, setEditing] = useState(canDefaultEdit);
  const inputRef = useRef<typeof Component | any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    if (canDefaultEdit) {
      toggleEdit();
    }
  }, [record]);

  const toggleEdit = () => {
    setEditing(true);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      const newRowData = { ...record, ...values };
      if (onRowDataChanged) {
        const newDataSource = onSoftReload(newRowData);
        onRowDataChanged(newDataSource, newRowData, dataIndex);
      } else {
        const method = record.id ? 'put' : 'post';
        const result = await FormUtils.submitForm(values, {
          ...formProps,
          documentId: record.id,
          method,
          useDefaultMessage,
        });
        onSoftReload(newRowData);
        onReload && result && (await onReload(newRowData, result));
      }
      setEditing(false);
    } catch (errInfo) {
      FormUtils.showFormValidateFailMessage(
        `${dataIndex} is incorrect`,
        'Please double check the input',
      );
    }
  };

  let childNode = children;

  if (itemSchema) {
    childNode = editing ? (
      <div onBlur={save}>
        <FormItemWithComponent {...{ ...itemSchema, componentRef: inputRef }} />
      </div>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
