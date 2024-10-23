import { useState } from 'react';

import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { createHDynamicSchemaFormItems } from '../../../../shared/common-form-elements/h-dynamic-form-items';
import { HSelect } from '../../../../shared/common-form-elements/select';

interface IGroupLocation {
  name: string;
  label: string;
  fields: ILocationField[];
}

interface ILocationField {
  name: string;
  label: string;
  endpoint: string;
  placeholder?: string;
}

/**
 * @example
 * ...LocationGroupFormSchema({
 *     name: 'location',
 *     label: 'Location',
 *      fields: [
 *       {
 *         name: "parentId",
 *         label: "parent",
 *         endpoint: 'locations/suggestion'
 *       },
 *       {
 *         name: "address1",
 *         label: "address1",
 *         endpoint: 'locations/suggestion',
 *       },
 *       {
 *         name: "address2",
 *         label: "address2",
 *         endpoint: 'locations/suggestion',
 *       }
 *     ]
 *   })
 */
export const LocationGroupFormSchema = (
  groupLocation: IGroupLocation,
): HFormItemProps[] => {
  const defaultStateByFiled = groupLocation?.fields?.map(() => {
    return {
      parentId: '',
    };
  });
  const [fieldsState, setFieldsState] = useState(defaultStateByFiled);

  const schemaItem = (field: ILocationField, index: number) => {
    let hiddenValues = {};

    if (index > 0) {
      hiddenValues = {
        parentId: fieldsState[index - 1].parentId,
      };
    }

    return createSchemaItem({
      Component: HSelect,
      name: field.name,
      colProps: { span: 16 },
      label: field.label,
      componentProps: {
        placeholder: field?.placeholder,
        endpoint: field?.endpoint,
        onChangeSelected: (document) => {
          fieldsState[index].parentId = document?.id;
          setFieldsState({
            ...fieldsState,
          });
        },
        hiddenValues,
        searchWhenHidenValueChange: true,
      },
    });
  };

  return [
    createHDynamicSchemaFormItems({
      label: groupLocation?.label,
      name: groupLocation?.name,
      required: true,
      componentProps: {
        schemaItems: groupLocation?.fields.map(schemaItem),
      },
    }),
  ];
};
