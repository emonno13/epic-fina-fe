import {
  ClientFooterFbIcon,
  ClientFooterGmailIcon,
  ClientFooterYoutubeIcon,
  ClientFooterZaloIcon,
} from '@icons';

const ClientFooterSocialNetwork = () => {
  return (
    <div className="ui-lightly-client-footer__social-network">
      <ClientFooterFbIcon />
      <ClientFooterZaloIcon />
      <ClientFooterYoutubeIcon />
      <ClientFooterGmailIcon />
    </div>
  );
};

export default ClientFooterSocialNetwork;
