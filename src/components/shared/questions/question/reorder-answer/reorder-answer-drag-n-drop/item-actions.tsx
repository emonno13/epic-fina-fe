import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ActionItemSchemaProps } from '@components/shared/common/h-item-actions';

export const renderAnswerControl = ({
  t,
  actionParams,
}): ActionItemSchemaProps[] => {
  const {
    onSelectDndItem: onSelectQuestion,
    onDeleteDndItem: onDeleteQuestion,
  } = actionParams;

  return [
    {
      icon: <EditOutlined />,
      menuLabel: 'Edit',
      action: onSelectQuestion,
      permission: '',
      disabled: false,
      hidden: true,
      permissions: [],
    },
    {
      icon: <DeleteOutlined />,
      menuLabel: 'Delete',
      action: onDeleteQuestion,
      permission: '',
      disabled: false,
      hidden: true,
      confirmText: t('do_you_want_to_delete_it', {
        vn: 'Bạn có chắc chắn muốn xoá câu hỏi này?',
        en: 'Do you want to delete this question?',
      }),
      permissions: [],
    },
  ];
};
