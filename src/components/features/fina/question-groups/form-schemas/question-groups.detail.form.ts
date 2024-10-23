import { HInputNumber } from '@components/shared/common-form-elements/h-input';
import { SelectUtils } from '@components/shared/common-form-elements/select/Utils';
import { QuestionUtils } from '@components/shared/questions/question/question-utils';
import { CALCULATION_QUESTION_GROUP_CODE } from '@components/shared/questions/question/types';
import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { QuestionGroupsProductInformationSchema } from '../common/question-groups.product-information-group-controls';

export const QuestionGroupsDetailForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const questsionGroup = useDocumentDetail();
  const defaultSchema = [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
      label: t('question-groups_name', { vn: 'Tên bộ câu hỏi', en: 'Name' }),
      rules: [
        {
          required: true,
          message: t('Question groups name required message', {
            vn: 'Tên bộ câu hỏi là bắt buộc',
            en: 'Question groups name is required',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Question groups name placeholder', {
          en: 'Enter question groups name',
          vn: 'Nhập tên bộ câu hỏi',
        }),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label: t('question-groups_description', {
        vn: 'Mô tả',
        en: 'Description',
      }),
      componentProps: {
        placeholder: t('Question groups description placeholder', {
          en: 'Enter question groups description',
          vn: 'Nhập mô tả',
        }),
      },
    }),
  ];

  if (
    questsionGroup?.code === CALCULATION_QUESTION_GROUP_CODE.QG_LOAN_ABILITY
  ) {
    defaultSchema.push(
      createSchemaItem({
        Component: HInputNumber,
        name: ['metadata', 'dtiIndex'],
        colProps: { span: 8 },
        label: t('DTI index (%)', { vn: 'Chỉ số DTI (%)' }),
        initialValue: 80,
        componentProps: {
          suffix: '%',
        },
      }),
    );
  }
  if (!QuestionUtils.checkIsCalculationQuestionGroup(questsionGroup)) {
    return [
      ...defaultSchema,
      SelectUtils.createCalculationQuestionGroupSuggestionElement(),
      createSchemaItem({
        Component: HSubForm,
        componentProps: {
          ...props,
          schema: QuestionGroupsProductInformationSchema,
        },
      }),
    ];
  }
  return defaultSchema;
};
