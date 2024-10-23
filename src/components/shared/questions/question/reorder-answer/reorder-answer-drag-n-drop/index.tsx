import { UnorderedListOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import HDragAndDrop from '@schema-form/drag-n-drop';
import { ActionDndParamsWithDefaultActions } from '@schema-form/drag-n-drop/types';
import {
  useDocumentDetail,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import CreateOrUpdateAnswer from './create-or-update-answer';
import { renderAnswerControl } from './item-actions';
const ReorderAnswerDragNDrop = ({ value, onChange, isEdit }) => {
  const { t } = useHTranslation('onchaindemy');
  const documentDetail = useDocumentDetail();
  const setDocumentItem = useSetDocumentDetail();

  const renderItemElement = (answer) => {
    return (
      <div className={'item flex items-center'}>
        <div className={'icon mr-5 flex items-center'}>
          <UnorderedListOutlined />
        </div>
        <div>{answer.content}</div>
      </div>
    );
  };
  const handleRenderActionWithSchema = (
    actionParams: ActionDndParamsWithDefaultActions,
  ) =>
    renderAnswerControl({
      t,
      actionParams,
    });

  const handleSubmitAnswer = (newAnswer) => {
    const oldAnswers = value.answers || [];
    let newAnswers: any = [];
    if (oldAnswers.every(({ id }) => id !== newAnswer?.id)) {
      newAnswers = [...oldAnswers, newAnswer];
    } else {
      newAnswers = oldAnswers.map((answer) =>
        answer.id === newAnswer.id ? newAnswer : answer,
      );
    }
    if (onChange) {
      onChange({
        ...value,
        answers: newAnswers,
      });
    }
    setDocumentItem({
      ...documentDetail,
      answers: newAnswers,
    });
  };

  return (
    <HDragAndDrop
      {...{
        renderActionWithSchema: isEdit
          ? handleRenderActionWithSchema
          : () => [],
        renderItemElement,
        childrenNamespace: 'answers',
        isCurrentDocumentFeature: false,
        showQuickAdd: isEdit,
        showNoItem: isEdit,
      }}
    >
      {(answer) => (
        <CreateOrUpdateAnswer
          {...{ answer, onSubmit: handleSubmitAnswer, isEdit }}
        />
      )}
    </HDragAndDrop>
  );
};

export default ReorderAnswerDragNDrop;
