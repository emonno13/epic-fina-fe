import { useHTranslation } from '@lib/i18n';

const ClientFooterCompanyInfo = () => {
  const { t } = useHTranslation('admin-common');
  return (
    <div className="ui-lightly-client-footer__company-info">
      <span>FINA</span>
      <span className="ui-lightly-client-footer__company-info__dot">•</span>
      <span>72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP.HCM</span>
      <span className="ui-lightly-client-footer__company-info__dot">•</span>
      <span>Ph: 08 5749 8668</span>
    </div>
  );
};

export default ClientFooterCompanyInfo;
