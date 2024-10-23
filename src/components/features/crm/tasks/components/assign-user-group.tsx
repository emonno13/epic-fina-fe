import { AlignLeftOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { UsersGroupDetailSchema } from '../../../organizations/users-group/users-group.detail-schema';

export default function useAssignUserGroupSchemaForm() {
  const { t } = useHTranslation('admin');
  return (props?: HFormProps) => {
    return [
      createSchemaLabelItem({
        colProps: { xs: 24, sm: 24, md: 12 },
        rowProps: { gutter: { xs: 24, md: 24 } },
        componentProps: {
          firstIcon: <AlignLeftOutlined />,
          label: 'Chia sẻ nhóm user cùng xử lý',
          lastIcon: <QuestionCircleTwoTone />,
        },
      }),
      createSchemaItem({
        Component: HSelect,
        label: 'Nhóm user',
        name: 'assignUserGroupId',
        colProps: { xs: 24, sm: 24, md: 12 },
        rowProps: { gutter: { xs: 24, md: 24 } },
        componentProps: {
          placeholder: '',
          showSearch: true,
          searchWhenHiddenValueChange: true,
          endpoint: 'user-groups/suggestion',
          optionsConverter: (document) => {
            document.label = `${document?.name}(${document?.userIds?.length})`;
            return document;
          },
          newItemOption: {
            formProps: {
              schema: UsersGroupDetailSchema,
              nodeName: 'user-groups',
            },
            label: t('Create user group'),
          },
        },
      }),
    ];
  };
}
