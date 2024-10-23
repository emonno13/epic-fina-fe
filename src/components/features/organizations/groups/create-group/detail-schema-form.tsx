import { SelectUtils } from '@components/shared/common-form-elements/select/Utils';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Checkbox } from 'antd';

export const DetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { transport } = props;
  const { groupType } = transport;
  return [
    SelectUtils.createGroupSelection(
      {
        rowProps: { gutter: { xs: 8, md: 16 } },
        isNewRow: true,
        rules: [{ required: true, message: 'Group is required' }],
        componentProps: {
          mode: 'multiple',
        },
      },
      groupType,
    ),
    createSchemaItem({
      Component: Checkbox,
      name: 'isAddMore',
      initialValue: false,
      valuePropName: 'checked',
      tooltip:
        'When checked all items selected will add this group, if not all items selected will only has this groups!',
      label: 'Add more',
      className: 'm-b-0',
      componentProps: {
        placeholder: 'Please enter the your eBay account, email or password',
      },
    }),
  ];
};
