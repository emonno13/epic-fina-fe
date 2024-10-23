import { useHTranslation } from '@lib/i18n';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import {
  useDocumentDetail,
  useIsNewDocument,
} from '@schema-form/features/hooks/document-detail-hooks';
import { Tabs } from 'antd';
import { DragNDropQuestions } from '../../../shared/questions/drag-n-drop-questions';
import SurveyResults from '../survey-results';
import CreateGeneralQuestionForm from './common/create-general-question-form';
import { QuestionGroupsDetailForm } from './form-schemas/question-groups.detail.form';
import {
  QUESTION_GROUP_TYPE,
  useQuestionGroupsContext,
} from './question-groups-provider';

const { TabPane } = Tabs;

export const EditQuestionGroupInfo = () => {
  const { t } = useHTranslation('admin-common');
  const { changeQuestionGroupType, questionGroupType } =
    useQuestionGroupsContext();
  const isCreateNew = useIsNewDocument();
  const questionGroup = useDocumentDetail();

  /* CREATE NEW QUESTION GROUP */
  if (isCreateNew) {
    return (
      <div>
        <Tabs onChange={(key) => changeQuestionGroupType(key)}>
          <TabPane
            key={QUESTION_GROUP_TYPE.NORMAL}
            tab={t('question_groups_questions', {
              vn: 'Bộ Câu hỏi Thường',
              en: 'Normal Question Group',
            })}
          >
            {questionGroupType === QUESTION_GROUP_TYPE.NORMAL && (
              <HFeatureForm
                {...{
                  schema: QuestionGroupsDetailForm,
                  hideSubmitAndContinueButton: true,
                }}
              />
            )}
          </TabPane>
          <TabPane
            key={QUESTION_GROUP_TYPE.GENERAL}
            tab={t('question_groups_questions', {
              vn: 'Bộ Câu hỏi Chung',
              en: 'General Question Group',
            })}
          >
            {questionGroupType === QUESTION_GROUP_TYPE.GENERAL && (
              <CreateGeneralQuestionForm />
            )}
          </TabPane>
        </Tabs>
      </div>
    );
  }

  /* EDIT QUESTION GROUP */
  if (questionGroup?.questionGroupType === 'GENERAL') {
    return <CreateGeneralQuestionForm />;
  }

  return (
    <HFeatureForm
      {...{
        schema: QuestionGroupsDetailForm,
        hideSubmitAndContinueButton: true,
      }}
    />
  );
};

const QuestionGroupEditor = () => {
  const { t } = useHTranslation('admin-common');
  const questionGroup = useDocumentDetail();
  return (
    <div>
      <Tabs>
        {questionGroup?.questionGroupType !== 'GENERAL' && (
          <TabPane
            key={'question_groups_questions'}
            tab={t('question_groups_questions', {
              vn: 'Câu hỏi',
              en: 'Questions',
            })}
          >
            <DragNDropQuestions
              {...{
                documentId: questionGroup?.id,
                featureId: questionGroup?.id,
              }}
            />
          </TabPane>
        )}
        <TabPane
          key={'question_groups_info'}
          tab={t('question_groups_info', { vn: 'Thông tin', en: 'Info' })}
        >
          <EditQuestionGroupInfo />
        </TabPane>
        <TabPane
          key={'survey_result'}
          tab={t('survey_result', {
            vn: 'Kết quả khảo sát',
            en: 'Survey result',
          })}
        >
          <SurveyResults {...{ questionGroup }} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export const QuestionGroupCreateOrUpdate = () => {
  const isCreateNew = useIsNewDocument();
  if (isCreateNew) {
    return <EditQuestionGroupInfo />;
  }
  return <QuestionGroupEditor />;
};
export default QuestionGroupCreateOrUpdate;
