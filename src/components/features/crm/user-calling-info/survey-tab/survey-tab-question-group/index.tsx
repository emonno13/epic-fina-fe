import { LeftOutlined } from '@ant-design/icons';
import { PreviewQuestionsFormSchema } from '@components/shared/questions/preview-questions/preview-questions.form.schema';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { Button, Divider, Form } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

const SurveyTabQuestionGroup = ({ questionGroup, onBack, customer }) => {
  const { t } = useHTranslation('admin-common');
  const [form] = Form.useForm();
  return (
    <div className="survey-tab-question-group">
      <div className="survey-tab-question-group__header">
        <LeftOutlined
          onClick={onBack}
          className="survey-tab-question-group__header__back-icon"
        />
        <div className="survey-tab-question-group__header__content">
          Bộ câu hỏi <span>{questionGroup?.name}</span>
        </div>
      </div>
      <Divider className="survey-tab-question-group__divider" />
      <Scrollbars style={{ width: '100%', height: 300 }}>
        <HForm
          {...{
            form,
            removeControlActions: true,
            schema: (props) =>
              PreviewQuestionsFormSchema({
                formProps: props,
                componentProps: {
                  questions: questionGroup?.children || [],
                  rowProps: { gutter: [40, 40] },
                  colProps: { span: 12 },
                },
              }),
            method: 'post',
            initialValues: {
              surveyDetails: [],
            },
            hiddenValues: {
              questionGroupId: questionGroup?.id,
              customerId: customer?.id,
            },
            nodeName: 'survey-results',
          }}
        />
        <Button
          className="survey-tab-question-group__send-result"
          type="primary"
          onClick={() => form.submit()}
        >
          {t('Save')}
        </Button>
      </Scrollbars>
    </div>
  );
};

export default SurveyTabQuestionGroup;
