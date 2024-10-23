import { HInput } from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import { Checkbox, Radio } from 'antd';

export const SCREEN = {
  FUND_PUBLIC: 'fundPublic',
  HOME: 'home',
};

export const SCREEN_OPTIONS = [
  { label: 'Trang chủ', value: SCREEN.HOME },
  { label: 'Giới thiệu đầu tư', value: SCREEN.FUND_PUBLIC },
];

export const StepOneSurveySchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      label: t(
        'Câu hỏi 1:  Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
        {
          vn: 'Câu hỏi 1:  Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
        },
      ),
      name: 'orgId',
      colProps: { span: 24 },
      componentProps: {
        options: SCREEN_OPTIONS,
        mode: 'multiple',
      },
    }),
    createSchemaItem({
      Component: HInput,
      label: t(
        'Câu hỏi 1:  Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
        {
          vn: 'Câu hỏi 1:  Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
        },
      ),
      name: 'orgId',
      colProps: { span: 24 },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t(
        'Câu hỏi 1:  Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
        {
          vn: 'Câu hỏi 1:  Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
        },
      ),
      name: 'orgId',
      colProps: { span: 24 },
      componentProps: {
        options: SCREEN_OPTIONS,
        mode: 'multiple',
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      label: t(
        'Câu hỏi 1:  Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
        {
          vn: 'Câu hỏi 1:  Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
        },
      ),
      name: 'orgId',
      rules: [
        {
          required: true,
          message: 'Phân loại là bắt buộc',
        },
      ],
      colProps: { span: 24 },
      componentProps: {
        options: SCREEN_OPTIONS,
      },
    }),
    createSchemaItem({
      Component: Checkbox.Group,
      label: t(
        'Câu hỏi 1:  Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
        {
          vn: 'Câu hỏi 1:  Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
        },
      ),
      name: 'orgId',
      rules: [
        {
          required: true,
          message: 'Phân loại là bắt buộc',
        },
      ],
      colProps: { span: 24 },
      componentProps: {
        options: SCREEN_OPTIONS,
      },
    }),
  ];
};
