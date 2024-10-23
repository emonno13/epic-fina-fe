import { Form } from 'antd';
import { FC, forwardRef } from 'react';
import { EditableContext } from './editable-context';
import { HForm } from '../../../h-form';
import { HFormItemProps, HFormProps } from '../../../h-types';

interface EditableRowProps {
  index: number;
  itemSchema: HFormItemProps,
  formProps: HFormProps
}

export const EditableRow: FC<EditableRowProps>
= forwardRef(({ index, ...props }, ref: any) => {
  const formProps = props.formProps || {};
  const [form] = Form.useForm();
  return (
    <HForm form={form} {...formProps} hideControlButton removeControlActions component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props}  ref={ref} />
      </EditableContext.Provider>
    </HForm>
  );
});