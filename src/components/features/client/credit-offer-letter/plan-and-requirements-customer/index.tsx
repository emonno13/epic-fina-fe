import { useClientDocumentDetail } from '@schema-form/client-features/hooks/client-feature-hook';
import { ReactElement, ReactNode } from 'react';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';
import { getSurveyResultByCode } from '../utils';
import {
  questionResultOfAdditionalInfo,
  questionResultOfPlan,
  questionResultOfRequirement,
} from './constants';

import './plan-and-requirements-customer.module.scss';

const PlanAndRequirementsCustomer = () => {
  const taskData = useClientDocumentDetail();
  const surveyResult = taskData?.surveyResult || [];
  return (
    <div id="plan">
      <CreditOfferLetterBodyContainer
        {...{
          className: 'plan-and-requirements-customer',
          title: 'Phương án và yêu cầu của quý khách:',
        }}
      >
        <div className="plan">
          <p className="name-item">Phương án:</p>
          <ul>
            {questionResultOfPlan.map(({ code, addon, text, methodFormat }) => (
              <ElementSurveyResult
                key={code}
                {...{
                  surveyResult,
                  code,
                  methodFormat,
                  text,
                  addon,
                }}
              />
            ))}
          </ul>
        </div>
        <div className="requirements">
          <p className="name-item">Yêu cầu:</p>
          <ul>
            {questionResultOfRequirement.map(({ code, addon, text }) => (
              <ElementSurveyResult
                key={code}
                {...{
                  surveyResult,
                  code,
                  text,
                  addon,
                }}
              />
            ))}
          </ul>
        </div>
        <div className="additional-info">
          <p className="name-item">Thông tin bổ sung:</p>
          <ul>
            {questionResultOfAdditionalInfo(surveyResult).map(
              ({ code, addon, text, methodFormat, children }) => (
                <ElementSurveyResult
                  key={code}
                  {...{
                    surveyResult,
                    code,
                    methodFormat,
                    text,
                    addon,
                    children,
                  }}
                />
              ),
            )}
          </ul>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <img
            src="/assets/images/letter-template-plan-footer.png"
            alt=""
            style={{ maxWidth: '100%' }}
          />
        </div>
      </CreditOfferLetterBodyContainer>
    </div>
  );
};

export default PlanAndRequirementsCustomer;

export const ElementSurveyResult = (props: {
  surveyResult: any;
  code: string;
  text?: string;
  addon?: string;
  methodFormat?: (value: any) => {};
  children?: ReactNode;
}): ReactElement => {
  const {
    surveyResult,
    code,
    text = '',
    addon = '',
    methodFormat,
    children,
  } = props;
  let surveyResultElementByCode = getSurveyResultByCode(
    surveyResult,
    code,
  )?.content;

  if (getSurveyResultByCode(surveyResult, code)?.selectedOptions?.length > 0) {
    surveyResultElementByCode = getSurveyResultByCode(surveyResult, code)
      ?.selectedOptions[0]?.content;
  }

  if (!code || !surveyResultElementByCode) {
    return <></>;
  }

  if (children) {
    return <>{children}</>;
  }

  if (methodFormat) {
    return (
      <li>
        {text + ' ' + methodFormat(surveyResultElementByCode) + ' ' + addon}
      </li>
    );
  }

  return <li>{text + ' ' + surveyResultElementByCode + ' ' + addon}</li>;
};
