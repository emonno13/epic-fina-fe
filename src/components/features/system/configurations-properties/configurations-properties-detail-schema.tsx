import { Input } from 'antd';
import { getPropertiesOptions } from './constant';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../schema-form/h-types';
import { createHDynamicSchemaFormItems } from '../../../shared/common-form-elements/h-dynamic-form-items';
import { useHTranslation } from '../../../../lib/i18n';
import { HSelect } from '../../../shared/common-form-elements/select';

export const ConfigurationPropertiesDetailSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return ([
    createSchemaItem({
      Component: Input,
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { xs: 24, sm: 24, md: 24 },
      name: 'name',
    }),
    createHDynamicSchemaFormItems({
      name: 'value',
      componentProps: {
        schemaItems: [
          createSchemaItem({
            Component: Input,
            label: ' ',
            colProps: { xs: 24, sm: 24, md: 5 },
            name: 'name',
            className: 'm-r-10',
          }),
          createSchemaItem({
            Component: HSelect,
            label: ' ',
            colProps: { xs: 24, sm: 24, md: 5 },
            name: 'tags',
            componentProps: {
              mode: 'multiple',
              optionValues: getPropertiesOptions(t),
            },
          }),
        ],
      },
    }),
  ]);
};
