import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';
import ClientFooterHeaderTitle from './client-footer.header-title';
import { getFooterLoanLinks } from '../constants';

const ClientFooterLoanLinks = () => {
  const { t } = useHTranslation('common');
  const data = getFooterLoanLinks(t);
  return (
    <div className="client-footer-loan-links">
      <ClientFooterHeaderTitle
        {...{
          title: t('client_footer_loan_links_title', {
            vn: 'Vay mua nhà',
            en: 'House loan',
          }),
        }}
      />
      {data.map(({ href, label }, index) => (
        <div
          key={`client-footer-loan-links-item-${index}`}
          className="client-footer-loan-links__item"
        >
          <Link href={href}>{label}</Link>
        </div>
      ))}
    </div>
  );
};

export default ClientFooterLoanLinks;
