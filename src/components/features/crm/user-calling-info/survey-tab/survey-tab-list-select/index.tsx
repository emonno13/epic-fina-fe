interface SurveyTabListSelectProps {
  value: any;
  onChange: Function;
  options?: any[];
  empty?: string;
}

const SurveyTabListSelect = (props: SurveyTabListSelectProps) => {
  const { value, onChange, options = [], empty = '' } = props;

  const onClick = (id) => {
    if (onChange) onChange(id);
  };

  if (options.length < 1) {
    return <div className="survey-tab-list-select-empty">{empty}</div>;
  }
  return (
    <div className="survey-tab-list-select">
      {options.map(({ name, id }, index) => (
        <div
          key={`survey-tab-list-item-${id}-${index}`}
          className={`survey-tab-list-select-item ${
            id === value && 'survey-tab-list-select-item-selected'
          }`}
          onClick={() => onClick(id)}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default SurveyTabListSelect;
