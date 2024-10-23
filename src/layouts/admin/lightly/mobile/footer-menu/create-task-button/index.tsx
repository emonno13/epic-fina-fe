import { useMobile } from '@components/features/mobile-app/hooks/login-drawer-hooks';
import { MOBILE_TASK_TYPE } from '@components/features/mobile-app/mobile-create-task/constants';
import { useHTranslation } from '@lib/i18n';

const CreateTaskButton = () => {
  const { t } = useHTranslation('mobile');
  const { setCreateTaskVisible, setTaskExtraValues } = useMobile();
  const onClickButton = () => {
    setCreateTaskVisible(true);
    setTaskExtraValues({
      type: MOBILE_TASK_TYPE.WANT_TO_BUY,
      subject: t('Create counselling request', {
        en: 'Create counselling request',
        vn: 'Tạo yêu cầu tư vấn',
      }),
    });
  };
  return (
    <div className={'footer-menu__add-button'} onClick={onClickButton}>
      <img src={'/assets/images/icons/ic_plus.svg'} />
    </div>
  );
};

export default CreateTaskButton;
