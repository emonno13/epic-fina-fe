import ClientFooterHeaderTitleIcon from '../icons/client-footer.header-title-icon';

const ClientFooterHeaderTitle = ({ title }) => (
  <div className="client-footer-header-title">
    <div className="client-footer-header-title__icon">
      <ClientFooterHeaderTitleIcon />
    </div>
    <div className="client-footer-header-title__title">
      {title}
    </div>
  </div>
);

export default ClientFooterHeaderTitle;