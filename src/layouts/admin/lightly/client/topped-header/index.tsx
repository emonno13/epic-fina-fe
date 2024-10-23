import ClientToppedHeaderContactInfo from './topped-header.contact-info';
import ClientToppedHeaderLanguageDropdown from './topped-header.language-dropdown';

import './topped-header.module.scss';

const ClientToppedHeader = () => {
  return (
    <div className="client-topped-header">
      <div className="client-topped-header__content max-w-1100 m-auto">
        <ClientToppedHeaderLanguageDropdown />
        <ClientToppedHeaderContactInfo />
      </div>
    </div>
  );
};

export default ClientToppedHeader;
