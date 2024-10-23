import { HFeatureItemForm } from '@schema-form/features/forms/h-item-form';
import { useSetDocumentDetail } from '@schema-form/features/hooks';
import { HItemDocumentModalPanel } from '@schema-form/features/panels/item-modal';
import { Form } from 'antd';
import DragNDropQuestionSchema from './drag-n-drop-questions-schema';

const CreateOrUpdateQuestion = ({ question, onGotSuccess }) => {
  const setQuestionReorderDocumentDetail =
    useSetDocumentDetail('question-reorder');
  const [form] = Form.useForm();

  const handleGotSuccess = (response, isSubmitAndContinue, isNewDocument) => {
    const questionFormValue = form.getFieldValue('question');
    setQuestionReorderDocumentDetail({});
    onGotSuccess(
      { ...response, ...questionFormValue },
      isSubmitAndContinue,
      isNewDocument,
    );
  };
  return (
    <HItemDocumentModalPanel width="600px">
      <HFeatureItemForm
        {...{
          form,
          questionInitValue: question,
          nodeName: 'questions',
          onGotSuccess: handleGotSuccess,
          schema: DragNDropQuestionSchema,
          hiddenValues: {
            type: question?.type,
            question: undefined,
          },
          onDataReadyToSubmit: (values) => {
            const submitData = {
              ...values,
              ...(values.question || {}),
            };
            return submitData;
          },
        }}
      />
    </HItemDocumentModalPanel>
  );
};

export default CreateOrUpdateQuestion;
