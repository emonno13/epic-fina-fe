import { useState } from 'react';
import { Button, Form, Modal } from 'antd';
import { useIsMobile } from '@lib/hooks/use-media';
import { useCurrentUser } from '@lib/providers/auth';
import { useHTranslation } from '@lib/i18n';
import { RenderSteps } from '@components/features/profiles/account-identifier/steps';
import { CloseIconLargeSvg } from 'icons';
import NoDataSurvey from './components/no-data';
import StepOneSurvey from './components/step-one';
import { IconSurvey } from './components/icon-survey';
import {
  IconArrowRight,
  IconCurrentIncome,
} from '../earnings-commissions/constants';

import './styles.module.scss';

const titleScreen = 'Khảo sát nâng cao';

const STEP = {
  STEP1: '0',
  STEP2: '1',
  STEP3: '2',
  STEP4: 'Done',
};

const STEP_IDENTIFIER = {
  [STEP.STEP1]: {
    name: 'Nội dung 1',
    disable: false,
  },
  [STEP.STEP2]: {
    name: 'Nội dung 2',
    disable: false,
  },
  [STEP.STEP3]: {
    name: 'Nội dung 3',
    disable: true,
  },
};

const ProfileAccountSurvey = () => {
  const currentUser: any = useCurrentUser();
  const isMobile = useIsMobile();
  const { t } = useHTranslation('admin-common');
  const [currentStep, setCurrentStep]: any = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const next = () => {
    if (!currentStep) {
      setCurrentStep(STEP.STEP1);
      return;
    }

    if (currentStep === STEP.STEP3) {
      // Step
      setVisible(true);
      return;
    }

    setCurrentStep((parseInt(currentStep) + 1).toString());
  };

  if (!currentUser) return <></>;

  if (currentStep)
    return (
      <div className="profile-information-survey-step">
        <div className="profile-information-survey-step-ui">
          <RenderSteps
            {...{
              currentStep: currentStep,
              steps: Object.values(STEP_IDENTIFIER),
            }}
          />
        </div>
        <div className="profile-survey-step">
          <p className="profile-survey-step-title">
            {t(STEP_IDENTIFIER?.[currentStep]?.name, {
              vn: STEP_IDENTIFIER?.[currentStep]?.name,
            })}
          </p>
          {currentStep === STEP.STEP1 && <StepOneSurvey {...{ form }} />}
          {currentStep === STEP.STEP2 && <StepOneSurvey {...{ form }} />}
          {currentStep === STEP.STEP3 && <StepOneSurvey {...{ form }} />}
        </div>

        <div className="profile-information-action">
          <Button
            className="profile-information-action-button profile-information-action-reject"
            onClick={() => {
              setCurrentStep(undefined);
            }}
          >
            Huỷ
          </Button>
          <Button
            className="profile-information-action-button profile-information-action-next"
            onClick={next}
          >
            {currentStep !== STEP.STEP3 ? 'Tiếp tục' : 'Gửi'}
          </Button>
        </div>

        <Modal
          {...{
            visible: visible,
            closeIcon: <CloseIconLargeSvg />,
            closable: true,
            onCancel: () => setVisible(false),
            width: 400,
            className: 'info-contract-modal-confirm profile-info-modal',
            footer: null,
          }}
        >
          <>
            <IconSurvey />
            <h2 className="info-contract-modal-confirm-title">
              {t('Khảo sát nâng cao thành công', {
                vn: 'Khảo sát nâng cao thành công',
              })}
            </h2>
            <p className="info-contract-modal-confirm-desc">
              {t(
                'Bạn đã thực hiện khảo sát nâng cao cho tài khoản của mình thành công. FINA sẽ gửi đến bạn những ưu đãi dành riêng dựa trên những thông tin của bạn đã cung cấp.',
              )}
            </p>
          </>
        </Modal>
      </div>
    );

  return (
    <div className="profile-information profile-information-survey">
      {isMobile && (
        <div>
          <IconCurrentIncome />
          <h2 className="profile-information-title">
            {t(titleScreen, { vn: titleScreen })}
          </h2>
          <IconArrowRight />
        </div>
      )}
      <div className="profile-el-wrapper">
        {!currentStep && (
          <>
            <h2 className="profile-information-title">
              {t(titleScreen, { vn: titleScreen })}
            </h2>
            <NoDataSurvey next={next} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileAccountSurvey;
