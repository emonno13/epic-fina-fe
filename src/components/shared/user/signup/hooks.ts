import { useRouter } from 'next/router';

import { STEP_SIGNUP } from '.';

export const mappingBackgroundImageSignUpScreen = (isMobile) => {
  return {
    [STEP_SIGNUP.INPUT_PHONE_EMAIL]: isMobile ? 'bg-signup-mb-1.png' : 'bg-signup-1.png',
    [STEP_SIGNUP.OTP]: isMobile ? 'verify-mb.png' : 'bg-signup-2.png',
    [STEP_SIGNUP.CONFIRM_PERSONAL_INFO]: isMobile ? 'setting-account-mb.png' : 'bg-signup-3.png',
    [STEP_SIGNUP.FINISHED]: isMobile ? 'bg-signup-mb-1.png' : 'bg-signup-1.png',
  };
};

export const useCurrentStep = () => {
  const router = useRouter();
  const { query } = router;

  if (query.userId && query.finish === '') return STEP_SIGNUP.CONFIRM_PERSONAL_INFO;
  if (query.userId) return STEP_SIGNUP.OTP;

  return STEP_SIGNUP.INPUT_PHONE_EMAIL;
};
