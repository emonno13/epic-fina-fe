import { Steps, Button } from 'antd';
import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import './stepper.module.scss';

const { Step } = Steps;

interface StepperProps {
  renderContent: Function;
  steps: string[];
  initStep: number;
}

export const Stepper = ({
  renderContent = (f, options) => f,
  initStep = 0,
  steps = [],
  ...props
}: StepperProps) => {
  const [current, setCurrent] = useState(initStep);

  const handleNext = props => {
    setCurrent(current + 1);
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  return (
    <RenderStepper {...{ current, onNext: handleNext, onPrev: handlePrev }}>
      {renderContent(current, {
        goNext: handleNext,
        goPrev: handlePrev,
      })}
    </RenderStepper>
  );
};

export const RenderStepper = (props: any) => {
  const { currentStep = 0, steps = [], onNext, onPrev, children } = props;
  const showNextControl = currentStep < steps.length - 1;
  const showPrevControl = currentStep > 0;

  return (
    <div className="ui-stepper-panel">
      <div className="ui-stepper-controls">
        <Button
          icon={<LeftOutlined />}
          disabled={!showPrevControl}
          onClick={onPrev}
          shape="round"
        />
        <div className="ui-stepper-container">
          <Steps current={currentStep}>
            {steps.map((step, index) => (
              <Step key={`${step}.${index}`} title={step} />
            ))}
          </Steps>
        </div>
        <Button
          style={{ margin: '0 8px' }}
          disabled={!showNextControl}
          onClick={onNext}
          icon={<RightOutlined />}
          shape="round"
        />
      </div>

      <div className="ui-stepper-content">{children}</div>
    </div>
  );
};
