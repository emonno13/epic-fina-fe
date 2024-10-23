import { UnorderedListOutlined } from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { PrintIconSvg, ResetIconSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';

import './bank-loan-calculator/styles.module.scss';

const ButtonAction = ({ actionReset, actionPrint, actionInformation }) => {
  const { t } = useHTranslation('calculator-toolkit');
  return (
    <div className="bank-loan-calculator-actions">
      <HButton
        onClick={() => actionReset()}
        className="btn-reset"
        type="primary"
      >
        <ResetIconSvg /> {t('reset')}
      </HButton>
      <HButton icon className="btn-print" onClick={() => actionPrint()}>
        <PrintIconSvg />
        {t('print')}
      </HButton>
      <HButton className="btn-print" onClick={() => actionInformation()}>
        <UnorderedListOutlined /> {t('information')}
      </HButton>
    </div>
  );
};

export default ButtonAction;
