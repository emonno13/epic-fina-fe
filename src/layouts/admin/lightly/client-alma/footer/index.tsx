import { useHTranslation } from '@lib/i18n';
import ClientFooterAppLinks from '../../client/footer/client-footer.app-links';
import ClientAlmaFooterContact from './footer.contact';
import ClientAlmaFooterForm from './footer.form';

const ClientAlmaFooter = () => {
  const { t } = useHTranslation('common');

  return (
    <div className="client-alma-footer alma-container">
      <ClientAlmaFooterContact />
      <ClientFooterAppLinks />
      <ClientAlmaFooterForm />
    </div>
  );
};

export default ClientAlmaFooter;
