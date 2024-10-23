import { useHTranslation } from '@lib/i18n';
// import ClientToppedHeaderVNFlag from '../icons/client-topped-header.vn-flag';
import { LanguageSwitcher } from '../../../../../components/shared/common/language-switcher';

const ClientToppedHeaderLanguageDropdown = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-language-option">
      {/* <div className="client-language-option__flag">
        <ClientToppedHeaderVNFlag />
      </div>
      <div className="client-language-option__txt">
        {t('Vietnamese', { vn: 'Tiếng Việt ttt' })}
      </div> */}
      <LanguageSwitcher className="header-height home-page__language-switcher" />
    </div>
  );
};

export default ClientToppedHeaderLanguageDropdown;
