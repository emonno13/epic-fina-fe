import { QuestionCircleOutlined } from '@ant-design/icons';
import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { MegadraftUtils } from '@lib/utils/megadraft';
import HDragAndDrop from '@schema-form/drag-n-drop';
import { ActionDndParamsWithDefaultActions } from '@schema-form/drag-n-drop/types';
import HFeature from '@schema-form/features/feature';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { useEffect, useState } from 'react';
import PreviewQuestion from '../preview-question';
import CreateOrUpdateQuestion from './create-or-update-question';
import DragNDropQuestionsHeader from './drag-n-drop-questions-header';
import { renderQuestionControl } from './item-actions';

import './drag-n-drop-questions.module.scss';

const HDragAndDropQuestion = () => {
  const { t } = useHTranslation('onchaindemy');
  const [previewQuestion, setPreviewQuestion] = useState({});
  const [previewVisible, setPreviewVisile] = useState(false);
  const questionGroup = useDocumentDetail() || {};

  const renderItemElement = (questionData, metadata) => {
    const content = MegadraftUtils.combineTextFromContent(
      questionData?.content,
    );
    return (
      <div className={'item flex items-center'}>
        <div className={'icon mr-5 flex items-center'}>
          <QuestionCircleOutlined />
        </div>
        <div className="question-title">
          <span>{`Câu ${metadata.currentIndex + 1}: `}</span>
          {content}
        </div>
      </div>
    );
  };
  const onPreview = (actionParams: ActionDndParamsWithDefaultActions | any) => {
    setPreviewQuestion(actionParams.currentDataItem || {});
    setPreviewVisile(true);
  };
  const handleRenderActionWithSchema = (
    actionParams: ActionDndParamsWithDefaultActions,
  ) =>
    renderQuestionControl({
      t,
      actionParams,
      onPreview,
      questionGroup,
    });

  useEffect(() => {
    if (!previewVisible) {
      setPreviewQuestion({});
    }
  }, [previewVisible]);

  return (
    <>
      <DragNDropQuestionsHeader />
      <HDragAndDrop
        {...{
          renderActionWithSchema: handleRenderActionWithSchema,
          renderItemElement,
          childrenNamespace: 'children',
          showNoItem: false,
        }}
      >
        {(question, onGotSuccess) => (
          <CreateOrUpdateQuestion {...{ question, onGotSuccess }} />
        )}
      </HDragAndDrop>
      <HModal
        {...{
          width: 600,
          visible: previewVisible,
          onCancel: () => setPreviewVisile(false),
          footer: null,
          destroyOnClose: true,
        }}
      >
        <PreviewQuestion data={previewQuestion} />
      </HModal>
    </>
  );
};

export const DragNDropQuestions = ({ documentId, featureId }) => {
  return (
    <HFeature
      {...{
        documentId,
        featureId,
        nodeName: 'question-groups',
      }}
    >
      <HDragAndDropQuestion />
    </HFeature>
  );
};
