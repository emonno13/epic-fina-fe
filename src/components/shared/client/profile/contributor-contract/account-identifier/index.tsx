import { STEP_IDENTIFIER } from '@components/features/profiles/account-identifier/constanst';
import { RenderSteps } from '@components/features/profiles/account-identifier/steps';
import { ConverterUtils } from '@lib/converter';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useState } from 'react';
import { AccountIdentifierInfo } from './account-identifier-info';
import InfoContract from './info-contract';
import { PersonInformation } from './person-information';

const AccountIdentifier = ({ setIsSignContract }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentUser = useCurrentUser();
  const [initialValues, setInitialValues] = useState<any>();

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(`/users/${currentUser.id}`),
        method: 'get',
        onGotSuccess: (response) => {
          const initialValues = {
            ...response,
            fullName: ConverterUtils.getFullNameUser(response),
          };
          setInitialValues(initialValues);
          // const currentStep = Object.keys(STEP_IDENTIFIER).indexOf(response?.steps);
          // setCurrentStep(
          //   currentStep >= Object.keys(STEP_IDENTIFIER).length - 1
          //     ? currentStep
          //     : currentStep + 1,
          // );
        },
      },
    );
  }, []);

  return (
    <div className="profile-contributor-contract-account-identifier">
      <RenderSteps
        {...{
          currentStep: currentStep,
          steps: Object.values(STEP_IDENTIFIER),
        }}
      />

      {initialValues && (
        <>
          {currentStep === 0 && (
            <PersonInformation
              {...{
                setCurrentStep,
                initialValues,
                setInitialValues,
                setIsSignContract,
              }}
            />
          )}
          {currentStep === 1 && (
            <AccountIdentifierInfo
              {...{
                setCurrentStep,
                initialValues,
                setInitialValues,
                setIsSignContract,
              }}
            />
          )}
          {currentStep === 2 && (
            <InfoContract
              {...{
                userInformation: initialValues,
                setCurrentStep,
                setIsSignContract,
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AccountIdentifier;
