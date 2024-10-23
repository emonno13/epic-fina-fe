import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import PreviewQuestions from '.';

interface PreviewQuestionsFormSchemaProps {
  formProps?: HFormProps;
  componentProps?: any;
  formItemProps?: HFormItemProps;
  isPreviewHome?: boolean;
}

export const PreviewQuestionsFormSchema = (
  props: PreviewQuestionsFormSchemaProps,
): HFormItemProps[] => {
  const { componentProps = {}, formItemProps = {} } = props;

  return [
    createSchemaItem({
      name: 'surveyDetails',
      Component: PreviewQuestions,
      ...formItemProps,
      componentProps: {
        ...componentProps,
        rowProps: { gutter: [24, 24] },
      },
    }),
  ];
};
