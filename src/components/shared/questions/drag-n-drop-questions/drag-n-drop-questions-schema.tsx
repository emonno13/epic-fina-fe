import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import SingleQuestion from '../question';

interface DragNDropQuestionSchemaSchemaProps extends HFormProps {
  questionInitValue: any;
}

const QuestioWrapper = ({ value, onChange, children }) => {
  return <>{children({ value, onChange })}</>;
};

export const DragNDropQuestionSchema = (
  props: DragNDropQuestionSchemaSchemaProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('academic-backend');
  return [
    createSchemaItem({
      initialValue: props.questionInitValue,
      name: 'question',
      Component: QuestioWrapper,
      componentProps: {
        children: ({ value, onChange }) => (
          <SingleQuestion
            {...{ initValue: value, onChange, style: { width: '100%' } }}
          />
        ),
      },
    }),
  ];
};

export default DragNDropQuestionSchema;
