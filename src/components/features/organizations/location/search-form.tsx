import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { LOCATION_TYPE_LIST_OPTION } from '.';
import { useHTranslation } from '../../../../lib/i18n';
import { HSelect } from '../../../shared/common-form-elements/select';

export const ItemLocationSearchFormSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { transport } = props;
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      name: 'type',
      colProps: { span: 6 },
      label: t('Type'),
      componentProps: {
        placeholder: t('Select a Type', { vn: 'Chọn loại' }),
        optionValues: LOCATION_TYPE_LIST_OPTION(t),
        allowClear: false,
      },
    }),
  ];
};
