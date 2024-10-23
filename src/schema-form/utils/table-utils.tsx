import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { TableUtils } from '@lib/table-utils';
import { HForm, HSubForm } from '@schema-form/h-form';
import Form, { FormInstance } from 'antd/lib/form';
import React, { useState } from 'react';
import { HFormItemProps } from '../h-types';

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  document: any;
  schemaItem: HFormItemProps;
  children: React.ReactNode;
  form: FormInstance;
}

export const EditableRow: React.FC<any> = (props) => {
  const { children, endpoint, onGotSuccess, document, ...restProps } = props;
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const childrenWithProps = React.Children.map(children, (child) => {
    if (child.key === 'action') {
      child.props.record.metaData = {
        setEditingKey,
        editingKey,
        form,
      };
    }
    return React.cloneElement(child);
  });

  return (
    <HForm
      {...{
        ...restProps,
        hideControlButton: true,
        component: 'tr',
        endpoint: `${endpoint}/${document?.id}`,
        method: 'put',
        onGotSuccess,
        form,
        initialValues: document,
      }}
    >
      {childrenWithProps}
    </HForm>
  );
};

export const EditableCell: React.FC<EditableCellProps> = (props) => {
  const { dataIndex, document, children, schemaItem, ...restProps } = props;
  const editable = TableUtils.isEditing(document);
  const childrentComponent =
    !!schemaItem && editable ? (
      <HSubForm schema={() => [{ ...schemaItem }]} />
    ) : (
      children
    );
  return <td {...restProps}>{childrentComponent}</td>;
};

export const EditingControler = ({ onSave, onCancel, recordName }) => {
  return (
    <span>
      <ClickableOpacity
        {...{
          onClick: onSave,
          confirmation: {
            message: `Are you sure to save the record: ${recordName}?`,
          },
        }}
      >
        <a className="p-r-10">Save</a>
      </ClickableOpacity>
      <ClickableOpacity
        {...{
          onClick: onCancel,
          confirmation: {
            message: `Sure to cancel: ${recordName}?`,
          },
        }}
      >
        <a>Cancel</a>
      </ClickableOpacity>
    </span>
  );
};
