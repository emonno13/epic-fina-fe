import { HForm } from '@schema-form/h-form';
import { Form } from 'antd';
import { useState } from 'react';
import SurveyTabQuestionGroup from './survey-tab-question-group';
import { SurveyTabFormSchema } from './survey-tab.form.schema';

const SurveyTab = ({ user }) => {
  const [productCategories, setProductCategories] = useState([]);
  const [questionGroups, setQuestionGroups] = useState([]);
  const [chosenQuestionGroup, setChosenQuestionGroup] = useState<any>({});
  const [form] = Form.useForm();
  console.log('user survey tab', user);

  const onBackToChosing = () => {
    setChosenQuestionGroup({});
    form.setFieldsValue({
      questionGroupId: '',
    });
  };

  if (!chosenQuestionGroup?.id) {
    return (
      <HForm
        {...{
          form,
          hideControlButton: true,
          hideSubmitAndContinueButton: true,
          schema: (props) =>
            SurveyTabFormSchema(props, {
              setChosenQuestionGroup,
              setProductCategories,
              setQuestionGroups,
              productCategories,
              questionGroups,
            }),
        }}
      />
    );
  }
  return (
    <SurveyTabQuestionGroup
      {...{
        questionGroup: chosenQuestionGroup,
        onBack: onBackToChosing,
        customer: user,
      }}
    />
  );
};

export default SurveyTab;
