import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'antd/lib/form/Form';
import { requestInformationUser } from '../../../../store/actions';
import { useCurrentUser } from '../../../../lib/providers/auth';
import { PersonInformationSchemaForm } from '../account-identifier/person-information';
import { ConverterUtils } from '../../../../lib/converter';

const EditInformation = () => {
  const currentUser = useCurrentUser();
  const [form] = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [initialValues, setInitialValues] = useState<any>();
  const dispatch = useDispatch();
  const { query, push } = useRouter();
  useEffect(() => {
    dispatch(requestInformationUser({
      userId: currentUser.id,
      callback: (response) => {
        const initialValues = {
          ...response,
          fullName: ConverterUtils.getFullNameUser(response),
        };
        setInitialValues(initialValues);
      },
    }));
  }, []);
  if (query?.type === 'base-information') {
    return (
      <div className={'wrapper-person-information'}>
        <PersonInformationSchemaForm {...{ setCurrentStep, initialValues, setInitialValues }}/>
      </div>
    );
  }
  return (
    <div className={'wrapper-person-information'}>
      <PersonInformationSchemaForm {...{ setCurrentStep, initialValues, setInitialValues }}/>
    </div>
  );
};

export default EditInformation;