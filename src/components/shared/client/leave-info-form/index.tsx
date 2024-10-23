import { useHTranslation } from '@lib/i18n';
import CounsellingRequestSingleInput from '../counselling-request-single-input';
import ClientLeaveInfoFormCallIcon from './icons/leave-info-form.call-icon';

import './leave-info-form.module.scss';

const ClientLeaveInfoForm = ({ isNew = false }) => {
  const { t } = useHTranslation('common');
  return (
    <div
      className={`client-leave-info-form ${isNew ? 'client-leave-info-form-update' : ''}`}
    >
      <div className="max-w-1100 client-leave-info-form__wrapper m-auto">
        <div className="client-leave-info-form__wrapper__info">
          <div className="client-leave-info-form__wrapper__info__icon">
            <ClientLeaveInfoFormCallIcon />
          </div>
          <div className="client-leave-info-form__wrapper__info__text">
            {t(
              "Leave your contact information, we'll get back to you shortly!",
              {
                vn: 'Để lại thông tin liên hệ của bạn, chúng tôi sẽ liên lạc lại ngay!',
              },
            )}
          </div>
        </div>
        <CounsellingRequestSingleInput />
      </div>
    </div>
  );
};

export default ClientLeaveInfoForm;
