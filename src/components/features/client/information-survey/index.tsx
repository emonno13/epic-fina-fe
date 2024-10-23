import InformationSurveyPanel from './information-survey-panel';

import './information-survey.module.scss';

export const InformationSurvey = () => {
  return (
    <InformationSurveyPanel />
  );
};

export const InformationSurveyIntroduce = () => {
  return (
    <div className="ui-information-survey">
      <InformationSurveyPanel {...{
        showPanelTitle: false,
        isIntroduceCustomer: true,
      }} />
    </div>
  );
};
