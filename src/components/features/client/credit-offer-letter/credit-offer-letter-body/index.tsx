import React from 'react';
import CreditOfferLetterCalculation from '../credit-offer-letter-calculation';
import CreditOfferLetterCompareProduct from '../credit-offer-letter-compare-product';
import CreditOfferLetterContainer from '../credit-offer-letter-container';
import CreditOfferLetterIntroduce from '../credit-offer-letter-introduce';
import CreditOfferLetterNextStep from '../credit-offer-letter-next-step';
import { CreditOfferLetterPolicy } from '../credit-offer-letter-policy';
import CreditOfferLetterPolicyAndCondition from '../credit-offer-letter-policy-and-condition';
import CreditOfferLetterProcedure from '../credit-offer-letter-procedure';
import PlanAndRequirementsCustomer from '../plan-and-requirements-customer';

import './credit-offer-letter-body.module.scss';

const CreditOfferLetterBody = () => {
  return (
    <>
      <CreditOfferLetterContainer className="small">
        <div className="credit-offer-letter-body">
          <PlanAndRequirementsCustomer />
          <CreditOfferLetterCalculation />
          <CreditOfferLetterPolicyAndCondition />
          <CreditOfferLetterCompareProduct />
        </div>
      </CreditOfferLetterContainer>

      <div className="credit-offer-letter-body">
        <CreditOfferLetterProcedure />
        <CreditOfferLetterNextStep />
        <CreditOfferLetterIntroduce />
      </div>

      <CreditOfferLetterContainer className="small">
        <div className="credit-offer-letter-body">
          <CreditOfferLetterPolicy />
        </div>
      </CreditOfferLetterContainer>
    </>
  );
};

export default CreditOfferLetterBody;
