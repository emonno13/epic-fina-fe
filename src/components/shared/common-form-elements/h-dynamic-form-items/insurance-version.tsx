/* eslint-disable @typescript-eslint/indent */
import { PlusCircleOutlined } from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HSubForm } from '@schema-form/h-form';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { Button, Form, Typography } from 'antd';
import { useEffect } from 'react';

const TrashIcon = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="trash-2">
        <path
          id="Vector"
          d="M2.5 5.5H4.16667H17.5"
          stroke="#CACACA"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          d="M15.8333 5.49935V17.166C15.8333 17.608 15.6577 18.032 15.3452 18.3445C15.0326 18.6571 14.6087 18.8327 14.1667 18.8327H5.83332C5.3913 18.8327 4.96737 18.6571 4.65481 18.3445C4.34225 18.032 4.16666 17.608 4.16666 17.166V5.49935M6.66666 5.49935V3.83268C6.66666 3.39065 6.84225 2.96673 7.15481 2.65417C7.46737 2.34161 7.8913 2.16602 8.33332 2.16602H11.6667C12.1087 2.16602 12.5326 2.34161 12.8452 2.65417C13.1577 2.96673 13.3333 3.39065 13.3333 3.83268V5.49935"
          stroke="#CACACA"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_3"
          d="M8.33334 9.66602V14.666"
          stroke="#CACACA"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_4"
          d="M11.6667 9.66602V14.666"
          stroke="#CACACA"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};
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
                Component: (props) => {
                  return (
                    <div>
                      <Button {...props} className="info-beneficiary__title">
                        Thêm người thụ hưởng
                      </Button>
                    </div>
                  );
                },
                colProps: { span: 24 },
                // label: fields.length === 1 && !!itemFirst?.label && ' ',
                isNewRow: true,
                componentProps: {
                  type: 'text',
                  icon: (
                    <PlusCircleOutlined
                      style={{ color: '#064DD6', fontSize: '24px' }}
                    />
                  ),
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
            ...(index === 0
              ? [
                  createSchemaItem({
                    Component: () => {
                      return (
                        <Typography.Text className="info-beneficiary__info-section-title">
                          Thông tin người được bảo hiểm
                        </Typography.Text>
                      );
                    },
                    colProps: { span: 24 },
                    isNewRow: true,
                  }),
                ]
              : []),
            createSchemaItem({
              Component: () => {
                return (
                  <div className="info-beneficiary__title-container">
                    <Typography.Text className="info-beneficiary__title">
                      Người được bảo hiểm {index + 1}
                    </Typography.Text>
                    {index !== 0 && (
                      <HButton
                        type="text"
                        className="flex"
                        onClick={() => onRemove(field.name)}
                        icon={<TrashIcon />}
                      >
                        <span className="info-beneficiary__delete-text">
                          Xoá
                        </span>
                      </HButton>
                    )}
                  </div>
                );
              },
              label: ' ',
              isNewRow: true,
              rowProps: { gutter: { xs: 0, md: 0 } },
            }),
          ]
        : [];

    const schemaItemList = newSchemaItems?.map(
      (item: any, indexSchemaItem: number) => {
        const schemaItem = createSchemaItem({
          ...field,
          ...item,
          name: [field.name, item?.name || index],
          // ...(index !== 0 ? { required: false } : {}),
          required: item?.name && item?.required ? true : false,
          label: item?.label || ' ',
        });
        schemaItem.componentProps = modifyComponentProps(
          { ...item.componentProps, index },
          field.name,
        );
        return schemaItem;
      },
    );
    groupSchemaItems.push(...showRemoveButton, ...schemaItemList);
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
