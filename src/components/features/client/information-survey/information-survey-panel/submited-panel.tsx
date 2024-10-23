import SurveyForm from '@components/shared/survey';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Step from './submited-panel-steps';

const SubmitedPanel = ({ setSubmited }) => {
  const { replace, pathname } = useRouter();

  const [showSelectProductType, setShowSelectProductType] = useState(false);
  const [showSelectCategoryType, setShowSelectCategoryType] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const nextToForm = async () => {
    setShowSelectProductType(false);
    setShowSelectCategoryType(false);
    setShowForm(true);
  };

  return (
    <>
      {/* STEP 01: INPUT YOUR INFO */}
      {!showSelectProductType && !showSelectCategoryType && !showForm && (
        <Step.InputYourInfo
          handleBackStep={() => {
            setSubmited(false);
            replace({
              pathname,
              query: {
                categoryType: 'vay-mua-nha',
              },
            });
          }}
          handleClickSummitButton={nextToForm}
        />
      )}

      {/* STEP 02: SHOW QUESTION SET */}
      {!showSelectProductType && !showSelectCategoryType && showForm && (
        <SurveyForm />
      )}
    </>
  );
};

export default SubmitedPanel;
