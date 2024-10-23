import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { ActionItemSchemaProps } from '@components/shared/common/h-item-actions';
import { QuestionUtils } from '../question/question-utils';
import { QUESTION_TYPES } from '../question/types';

export const renderAddQuestionControl = ({ t, onNewQuestion }) => [
  {
    icon: <PlusCircleOutlined />,
    menuLabel: t('Add image selection question', {
      en: 'Add image selection question',
      vn: 'Tạo câu hỏi lựa chọn ảnh',
    }),
    action: (actionParams) =>
      onNewQuestion(QUESTION_TYPES.IMAGE_SELECTION, actionParams),
    permission: '',
    disabled: false,
    hidden: true,
    permissions: [],
  },
  {
    icon: <PlusCircleOutlined />,
    menuLabel: t('Add text selection question', {
      en: 'Add text selection question',
      vn: 'Tạo câu hỏi nhiều lựa chọn',
    }),
    action: (actionParams) =>
      onNewQuestion(QUESTION_TYPES.TEXT_SELECTION, actionParams),
    permission: '',
    disabled: false,
    hidden: true,
    permissions: [],
  },
  {
    icon: <PlusCircleOutlined />,
    menuLabel: t('Add a open ended question', {
      en: 'Add a open ended question',
      vn: 'Tạo câu hỏi nhập input',
    }),
    action: (actionParams) =>
      onNewQuestion(QUESTION_TYPES.OPEN_ENDED, actionParams),
    permission: '',
    disabled: false,
    hidden: true,
    permissions: [],
  },
  {
    icon: <PlusCircleOutlined />,
    menuLabel: t('Add a open ended number question', {
      en: 'Add a open ended number question',
      vn: 'Tạo câu hỏi nhập số',
    }),
    action: (actionParams) =>
      onNewQuestion(QUESTION_TYPES.OPEN_ENDED_NUMBER, actionParams),
    permission: '',
    disabled: false,
    hidden: true,
    permissions: [],
  },
  // {
  // 	icon: <PlusCircleOutlined />,
  // 	menuLabel: 'Add a reorder question',
  // 	action: (actionParams) => onNewQuestion(QUESTION_TYPES.REORDER, actionParams),
  // 	permission: '',
  // 	disabled: false,
  // 	hidden: true,
  // 	permissions: [],
  // },
];

export const renderQuestionControl = ({
  t,
  actionParams,
  onPreview,
  questionGroup,
}): ActionItemSchemaProps[] => {
  const {
    onSelectDndItem: onSelectQuestion,
    onDeleteDndItem: onDeleteQuestion,
    currentDataItem,
  } = actionParams;
  const displayDeleteQuestionButton =
    !QuestionUtils.checkIsCalculationQuestion(currentDataItem);
  const result: any[] = [
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
      icon: <EyeOutlined />,
      menuLabel: 'Preview',
      action: onPreview,
      permission: '',
      disabled: false,
      hidden: true,
      permissions: [],
    },
  ];
  if (displayDeleteQuestionButton) {
    result.push({
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
    });
  }

  return result;
};
