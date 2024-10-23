import { Steps } from 'antd';
import React from 'react';
import { useHTranslation } from '../../../../../lib/i18n';

const { Step } = Steps;


export const RenderSteps = (props: any) => {
  const { t } = useHTranslation('admin-common');
  const { currentStep = 0, steps = [], onChangeStep } = props;
  const { innerWidth: width, innerHeight: height } = window;
  return (
    <div>
      <Steps current={parseInt(currentStep)} size={'default'} onChange={onChangeStep}
        direction={'horizontal'}>
        {steps.map((step, index) => (
          <Step key={`${index}`} title={t(step?.name)} disabled={step?.disable || false}/>
        ))}
      </Steps>
    </div>
  );
};
