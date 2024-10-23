import { EyeOutlined } from '@ant-design/icons';
import { HSchemaActions } from '@components/shared/common/h-item-actions';
import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { CommentUtils } from '@lib/utils/comment';
import { ActionDndParamsWithDefaultActions } from '@schema-form/drag-n-drop/types';
import { NEW_ITEM_DOCUMENT_ID } from '@schema-form/features/forms/h-item-form';
import { useDocumentDetail, useSetItem } from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { Button, Form } from 'antd';
import { CreateIconSvg } from 'icons';
import { useMemo, useState } from 'react';
import { PreviewQuestionsFormSchema } from '../preview-questions/preview-questions.form.schema';
import { QuestionUtils } from '../question/question-utils';
import { renderAddQuestionControl } from './item-actions';

const DragNDropQuestionsHeader = () => {
  const { t } = useHTranslation('onchaindemy');
  const [previewVisible, setPreviewVisible] = useState(false);
  const questionGroup = useDocumentDetail();
  const initQuestionItem = useSetItem();
  const [previewQuestionForm] = Form.useForm();

  const displayAddQuestionSection = useMemo(() => {
    return !QuestionUtils.checkIsCalculationQuestionGroup(questionGroup);
  }, [questionGroup]);

  const onNewQuestion = (
    type,
    actionParams: ActionDndParamsWithDefaultActions | any,
  ) => {
    const containerId = questionGroup.id;
    const currentIndex = actionParams?.currentIndex || 0;
    initQuestionItem(
      {
        id: NEW_ITEM_DOCUMENT_ID,
        type,
      },
      true,
      { containerId, currentIndex },
    );
  };
  const handleOk = () => {
    previewQuestionForm.submit();
  };
  const handleCancel = () => {
    setPreviewVisible(false);
    previewQuestionForm.resetFields();
  };
  const onCopySurveyLink = () => {
    const { origin } = window.location;
    CommentUtils.copyToClipboard(
      `${origin}/survey?documentId=${questionGroup.id}`,
      t('Copy successfully', {
        en: 'Copy successfully',
        vn: 'Copy thành công',
      }),
    );
  };

  return (
    <>
      <div className="add-question-section">
        <div className="add-question-section__first-btn-group">
          <Button
            {...{
              style: { marginRight: 8 },
              shape: 'round',
              icon: <EyeOutlined />,
              onClick: () => setPreviewVisible(true),
            }}
          >
            Preview
          </Button>
          <Button
            {...{ shape: 'round', onClick: onCopySurveyLink, type: 'primary' }}
          >
            {t('Copy survey link', {
              en: 'Copy survey link',
              vn: 'Copy đường dẫn khảo sát',
            })}
          </Button>
        </div>

        {displayAddQuestionSection && (
          <HSchemaActions
            childElement={
              <Button
                {...{
                  shape: 'round',
                  className: ' create-btn',
                  type: 'primary',
                  icon: <CreateIconSvg />,
                }}
              >
                {t('Create', {
                  en: 'Add more question',
                  vn: 'Thêm câu hỏi',
                })}
              </Button>
            }
            schema={renderAddQuestionControl({ t, onNewQuestion })}
          />
        )}
      </div>
      <HModal
        {...{
          visible: previewVisible,
          onCancel: handleCancel,
          onOk: handleOk,
          destroyOnClose: true,
          width: 1500,
          footer: null,
        }}
      >
        <HForm
          {...{
            removeControlActions: true,
            form: previewQuestionForm,
            schema: (props) =>
              PreviewQuestionsFormSchema({
                formProps: props,
                componentProps: {
                  questions: questionGroup?.children || [],
                },
              }),
            method: 'post',
            initialValues: {
              surveyDetails: [],
            },
            hiddenValues: {
              questionGroupId: questionGroup?.id,
            },
            nodeName: 'survey-results',
            onGotSuccess: handleCancel,
          }}
        />
      </HModal>
    </>
  );
};

export default DragNDropQuestionsHeader;
