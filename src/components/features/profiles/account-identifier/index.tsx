import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RenderSteps } from './steps/index';
import { STEP_IDENTIFIER } from './constanst';
import { PersonInformationSchemaForm } from './person-information';
import { CardForm } from './card-id';
import { requestInformationUser } from '../../../../store/actions';
import { useCurrentUser } from '../../../../lib/providers/auth';
import AccountInformation from '../account-information';
import { ConverterUtils } from '../../../../lib/converter';

import '../profiles.module.scss';

const AccountIdentifier = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState<any>();
  const currentUser = useCurrentUser();
  useEffect(() => {
    dispatch(requestInformationUser({
      userId: currentUser.id,
      callback: (response) => {
        const initialValues = {
          ...response,
          fullName: ConverterUtils.getFullNameUser(response),
        };
        setInitialValues(initialValues);
        const currentStep = Object.keys(STEP_IDENTIFIER).indexOf(response?.steps);
        setCurrentStep(currentStep >= (Object.keys(STEP_IDENTIFIER).length - 1) ? currentStep : (currentStep + 1));
      },
    }));
  }, []);
  if (initialValues?.hasCollaboratorContract) {
    return (
      <AccountInformation {...{ userInformation: initialValues }}/>
    );
  }
  return (
    <div>
      <RenderSteps {...{
        currentStep: currentStep,
        // onChangeStep: (current) => {
        // 	setCurrentStep(current);
        // },
        steps: Object.values(STEP_IDENTIFIER),
      }}/>
      <div className={'wrapper-person-information'}>
        {currentStep === 0 && initialValues && <PersonInformationSchemaForm {...{ setCurrentStep, initialValues, setInitialValues }}/>}
        {(currentStep !== 0) && <CardForm {...{ currentStep, setCurrentStep, initialValues }}/>}
      </div>
    </div>
  );
};

export default AccountIdentifier;
