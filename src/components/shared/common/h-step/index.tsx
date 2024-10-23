import { ConverterUtils } from '@lib/converter';
import { StepProps, Steps, StepsProps } from 'antd';
import classNames from 'classnames';

import './h-steps.module.scss';

const { Step } = Steps;

interface HStepItemType extends StepProps {
  updatedAt?: string;
  name: string;
}

interface HStepsProps extends StepsProps {
  currentStep: number;
  steps: HStepItemType[];
  className?: string;
}

const HSteps = (props: HStepsProps) => {
  const { currentStep = 0, steps = [], className = '', ...restProps } = props;
  return (
    <div className={classNames('h-steps', className)}>
      <Steps
        current={+currentStep}
        {...{
          labelPlacement: 'vertical',
          ...restProps,
        }}
      >
        {steps.map((step, index) => (
          <Step
            key={`${index}`}
            icon={step?.icon}
            title={
              <div>
                <div>{step?.name}</div>
                {step?.updatedAt && (
                  <div className={'time-updatedAt'}>
                    {ConverterUtils.dateConverterToString(step.updatedAt)}
                  </div>
                )}
              </div>
            }
            status={step?.status}
            disabled={step?.disabled || false}
          />
        ))}
      </Steps>
    </div>
  );
};

export default HSteps;
