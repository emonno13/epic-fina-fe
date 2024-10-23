import { useIsAuthenticated } from '@lib/providers/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  useIsLoanCalculation,
  useSurveySubmitedSurvey,
} from '../contexts/survey-hooks';
import SurveySuccessForm from './survey-success-form';

const SurveySuccess = () => {
  const router = useRouter();
  const [infoSubmited, setInfoSubmited] = useState<boolean>(false);
  const submitedSurvey = useSurveySubmitedSurvey();
  const isAuthenticated = useIsAuthenticated();
  const isLoanCalculation = useIsLoanCalculation();

  const onInfoSubmitSuccess = () => {
    setInfoSubmited(true);
  };

  return (
    <div className="survey-success-wrapper">
      <div className="survey-success">
        <div className="survey-success__title">
          Cảm ơn bạn đã thực hiện khảo sát!
        </div>
        {isAuthenticated && isLoanCalculation && (
          <p className="survey-success__desc">
            Dựa vào các câu trả lời của bạn, chúng tôi đã gợi ý{' '}
            <span>3 kết quả</span> khảo sát khả năng vay.
            <br />
            Xin vui lòng kiểm tra email của bạn.
          </p>
        )}
        {!isAuthenticated && !infoSubmited && (
          <>
            <div className="survey-success__description">
              Hãy để lại thông tin để FINA có thể liên hệ tư vấn cho bạn và gửi
              cho bạn kết quả khảo sát vay
            </div>
            <SurveySuccessForm
              {...{
                submitedSurvey,
                onGotSuccess: onInfoSubmitSuccess,
                onExtraSubmitHandle: () => {
                  router.push(`/${router.locale}`);
                },
                isRedirectWhenSuccess: false,
              }}
            />
          </>
        )}
        {infoSubmited && isLoanCalculation && (
          <p className="survey-success__desc">
            Dựa vào các câu trả lời của bạn, chúng tôi đã gợi ý{' '}
            <span>3 kết quả</span> khảo sát khả năng vay.
            <br />
            Xin vui lòng kiểm tra email của bạn.
          </p>
        )}
      </div>
    </div>
  );
};

export default SurveySuccess;
