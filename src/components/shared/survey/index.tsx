import { MobileUtils } from '@lib/utils/mobile';
import { HFeature } from '@schema-form/features';
import { useEffect } from 'react';
import { SurveyProvider } from './contexts/survey-provider';
import SurveyQuestionsContainer from './survey-questions-container';

import './survey.module.scss';

const SurveyForm = () => {
  useEffect(() => {
    MobileUtils.removeFbElement();
  }, []);

  return (
    <HFeature
      {...{
        featureId: 'survey',
        nodeName: 'question-groups/public',
      }}
    >
      <SurveyProvider>
        <SurveyQuestionsContainer />
      </SurveyProvider>
    </HFeature>
  );
};

export default SurveyForm;
