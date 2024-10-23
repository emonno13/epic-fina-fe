import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { HSubForm } from '@schema-form/h-form';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { Button, Form } from 'antd';
import { useEffect } from 'react';

export interface HDynamicSchemaFormItemProps extends HFormItemProps {
  componentProps: HDynamicFormItemsProps;
}

export const createHDynamicSchemaFormItems = (
  item: HDynamicSchemaFormItemProps,
) => {
  const componentProps = item?.componentProps || {};

  return createSchemaItem({
    Component: HDynamicFormItems,
    rules: item?.rules,
    rowProps: item?.rowProps,
    colProps: item?.colProps,
    isNewRow: item?.isNewRow,
    className: item?.className,
    label: item?.label,
    tooltip: item?.tooltip,
    required: item?.required,
    hidden: item?.hidden,
    componentProps: {
      ...componentProps,
      name: item?.name || '',
    },
  });
};

export interface HDynamicFormItemsProps {
  name?: string;
  disabled?: boolean;
  schemaItems?: HFormItemProps[] | ((value: any) => HFormItemProps[]);
  showDefaultItem?: boolean;
  colPlus?: number;
  colMinus?: number;
  hiddenPlus?: boolean;
  hiddenMinus?: boolean;
}

export const HDynamicFormItems = (props: HDynamicFormItemsProps) => {
  const {
    name = '',
    disabled = false,
    schemaItems = [],
    showDefaultItem = true,
    colPlus = 1,
    colMinus = 1,
    hiddenPlus = false,
    hiddenMinus = false,
  } = props;
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <RenderItemSchemaFormList
          {...{
            disabled,
            schemaItems,
            showDefaultItem,
            fields,
            add,
            remove,
            colPlus,
            colMinus,
            hiddenPlus,
            hiddenMinus,
          }}
        />
      )}
    </Form.List>
  );
};

const RenderItemSchemaFormList = ({
  fields,
  add,
  remove,
  disabled,
  schemaItems,
  showDefaultItem,
  colPlus,
  colMinus,
  hiddenPlus,
  hiddenMinus,
}) => {
  const newSchemaItems =
    typeof schemaItems === 'function' ? schemaItems(fields[0]) : schemaItems;
  const itemFirst: any = newSchemaItems[0];

  useEffect(() => {
    addDefaultItem();
  }, []);

  const addDefaultItem = () => {
    if (fields.length === 0 && !!showDefaultItem) {
      add();
    }
  };

  const handleRemoveItem = (fieldName) => {
    remove(fieldName);
    if (fields.length === 1 && !!showDefaultItem) {
      add();
    }
  };

  return (
    <HSubForm
      schema={() => [
        ...dynamicSchemaItems({
          disabled,
          schemaItems,
          fields,
          onRemove: handleRemoveItem,
          colMinus,
          hiddenMinus,
        }),
        ...(!hiddenPlus
          ? [
              createSchemaItem({
                Component: Button,
                colProps: { span: colPlus },
                label: fields.length === 1 && !!itemFirst?.label && ' ',
                componentProps: {
                  type: 'text',
                  icon: <PlusCircleOutlined />,
                  onClick: () => add(),
                  disabled,
                },
              }),
            ]
          : []),
      ]}
    />
  );
};

const dynamicSchemaItems = ({
  disabled,
  schemaItems,
  fields,
  onRemove,
  colMinus,
  hiddenMinus,
}): HFormItemProps[] => {
  const groupSchemaItems: HFormItemProps[] = [];
  fields.map((field, index) => {
    const newSchemaItems =
      typeof schemaItems === 'function' ? schemaItems(field) : schemaItems;
    const itemFirst: any = newSchemaItems[0];
    const showRemoveButton =
      !disabled && !hiddenMinus
        ? [
            createSchemaItem({
              Component: Button,
              colProps: { span: colMinus },
              label: index === 0 && !!itemFirst?.label && ' ',
              componentProps: {
                type: 'text',
                icon: <MinusCircleOutlined />,
                onClick: () => onRemove(field.name),
                disabled,
              },
            }),
          ]
        : [];

    const schemaItemList = newSchemaItems?.map(
      (item: any, indexSchemaItem: number) => {
        const schemaItem = createSchemaItem({
          ...field,
          ...item,
          name: [field.name, item?.name || index],
          ...(index !== 0 ? { required: false } : {}),
          label: index === 0 ? item?.label : <span />,
        });
        schemaItem.componentProps = modifyComponentProps(
          { ...item.componentProps, index },
          field.name,
        );
        return schemaItem;
      },
    );
    groupSchemaItems.push(...schemaItemList, ...showRemoveButton);
  });
  return groupSchemaItems;
};

const modifyComponentProps = (componentProps: any, name: any) => {
  const nameSubForm = componentProps?.['nameSubForm'];
  if (typeof nameSubForm === 'string') {
    componentProps['nameSubForm'] = [name, nameSubForm];
  }
  return componentProps;
};
