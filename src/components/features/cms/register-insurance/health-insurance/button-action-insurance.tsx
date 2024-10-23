import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';

interface Props {
  setVisible: (e: boolean) => void;
  visible: boolean;
  handleNextStep: any;
}

const ButtonActionInsurance = (props: Props) => {
  const { t } = useHTranslation('common');
  const { setVisible, visible, handleNextStep } = props;
  return (
    <>
      <Button
        {...{
          className: 'm-r-10',
          danger: true,
          onClick: () => setVisible(!visible),
        }}
      >
        {t('Cancel')}
      </Button>
      <Button
        {...{
          className: 'm-r-10',
          type: 'primary',
          onClick: handleNextStep,
        }}
      >
        {t('Next step', { vn: 'Bước tiếp theo' })}
      </Button>
    </>
  );
};

export default ButtonActionInsurance;
