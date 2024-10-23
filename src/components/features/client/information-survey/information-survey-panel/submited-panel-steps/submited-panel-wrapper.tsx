import { ArrowLeftOutlined } from '@ant-design/icons';
import { ButtonBackToHomePage } from '@components/shared/survey/survey-questions-form/survey-question-task';
import { Button } from 'antd';

const SumitedPanelWrapper = ({
  child,
  handleBackStep,
  handleClickSummitButton,
  submmitButtonLabel,
}) => {
  return (
    <div className="submited-panel">
      <ArrowLeftOutlined
        className="submited-panel--back-step"
        style={{ fontSize: '18px', color: '#064dd6' }}
        onClick={handleBackStep}
      />
      {child}
      <Button
        className="submited-panel__button"
        {...{
          type: 'primary',
          onClick: handleClickSummitButton,
        }}
      >
        {submmitButtonLabel}
      </Button>
      <div style={{ marginTop: '20px' }}>
        <ButtonBackToHomePage />
      </div>
    </div>
  );
};

export default SumitedPanelWrapper;
