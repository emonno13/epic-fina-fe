import { useHTranslation } from '@lib/i18n';
import Image from 'next/image';
import SumitedPanelWrapper from './submited-panel-wrapper';

const InputYourInfo = ({ handleBackStep, handleClickSummitButton }) => {
  const { t } = useHTranslation('common');

  return (
    <SumitedPanelWrapper
      handleBackStep={handleBackStep}
      handleClickSummitButton={handleClickSummitButton}
      submmitButtonLabel="Để lại thông tin hỗ trợ vay vốn nhanh"
      child={
        <>
          <Image
            width="100%"
            height="100%"
            src="data:image/png;base64,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"
          />
          <h2>
            {t('Congratulations on your successful submission', {
              vn: 'Chúc mừng bạn đã gửi thông tin thành công',
            })}
          </h2>
          <p>
            {t(
              'Thank you for submitting your information to the FINA System. We will respond to you as soon as possible. If you need urgent advice, please contact Hotline: 08 5749 8668',
              {
                vn: 'Cảm ơn bạn đã gửi thông tin đến Hệ thống của FINA. Chúng tôi sẽ phản hồi nhanh nhất đến Quý khách hàng. Nếu cần liên hệ tư vấn gấp vui lòng liên lạc số Hotline: 08 5749 8668',
              },
            )}
          </p>
        </>
      }
    />
  );
};

const Step = {
  InputYourInfo: InputYourInfo,
};

export default Step;
