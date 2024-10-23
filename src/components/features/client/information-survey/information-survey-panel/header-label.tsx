const InformationSurveySection = ({ headerLabel, children }) => {
  return (
    <div className="information-survey-section">
      <h3 className="title">
        {headerLabel}
      </h3>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default InformationSurveySection;