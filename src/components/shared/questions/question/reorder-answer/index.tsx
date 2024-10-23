import { HFeature } from '@schema-form/features';
import { NEW_DOCUMENT_ID } from '@schema-form/features/forms/h-feature-form';
import ReorderAnswerDragNDrop from './reorder-answer-drag-n-drop';

const ReorderAnswer = ({ value, onChange = (f) => f, isEdit = true }) => {
  const featureId = `question-${value.id || 'reorder'}`;
  return (
    <HFeature
      {...{
        featureId,
        documentId: value.id || NEW_DOCUMENT_ID,
        nodeName: 'questions',
      }}
    >
      <ReorderAnswerDragNDrop {...{ value, onChange, isEdit }} />
    </HFeature>
  );
};

export default ReorderAnswer;
