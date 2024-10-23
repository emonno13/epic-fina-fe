import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { CreateIconSvg } from 'icons';
import { TYPE_GENERAL } from '../constants';

const ButtonAddPortfolio = ({ type, addPortfolio }) => {
  const { t } = useHTranslation('calculator-toolkit');

  return (
    <HButton
      type="primary"
      block
      onClick={addPortfolio}
      className="btn-add-portfolio"
    >
      <CreateIconSvg />
      {type === TYPE_GENERAL.INCOME
        ? t('moreIncomesDetails')
        : t('moreOutcomesDetails')}
    </HButton>
  );
};

export default ButtonAddPortfolio;
