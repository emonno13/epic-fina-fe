import { AudioOutlined } from '@ant-design/icons';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Divider, Input } from 'antd';

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

export const OrgSearchFormSchema = (props: HFormProps): HFormItemProps[] => {
  const { transport } = props;
  return [
    createSchemaItem({
      Component: Divider,
      className: 'itemProps',
      name: ['filter', 'search1'],
      componentProps: {
        orientation: 'left',
        plain: true,
        children: 'Advanced search',
      },
    }),
    createSchemaItem({
      Component: Input,
      className: 'itemProps',
      name: 'search2',
      componentProps: {
        onFocus: transport?.onSearchInputFocused,
        placeholder: 'input search text',
        enterButton: 'Search',
        size: 'large',
        suffix: suffix,
        onSearch: (value) => console.log(value),
      },
    }),
    createSchemaItem({
      Component: Input,
      className: 'itemProps',
      name: 'name',
      componentProps: {
        onFocus: transport?.onSearchInputFocused,
        placeholder: 'Enter name',
        enterButton: 'Search',
        size: 'large',
        suffix: suffix,
        onSearch: (value) => console.log(value),
      },
    }),
  ];
};
