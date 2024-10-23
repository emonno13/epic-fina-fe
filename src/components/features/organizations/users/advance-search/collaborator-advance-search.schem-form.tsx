import { UserAdvanceSearch } from './user-advance-search.schema-form';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../schema-form/h-types';
import { useHTranslation } from '../../../../../lib/i18n';
import { HSelect } from '../../../../shared/common-form-elements/select';

export const CollaboratorAdvanceSearch = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return ([
    ...UserAdvanceSearch(props),
    createSchemaItem({
      Component: HSelect,
      label: t('Trạng thái hợp đồng'),
      colProps: { span: 6 },
      name: 'hasCollaboratorContract',
      componentProps: {
        placeholder: t('Trạng thái hợp đồng'),
        options: [
          { label: t('Đã ký hợp đồng'), value: true },
          { label: t('Chưa ký hợp đồng'), value: false },
        ],
      },
    }),
  ]);
};