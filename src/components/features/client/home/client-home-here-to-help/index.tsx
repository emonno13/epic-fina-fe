import { useHTranslation } from '@lib/i18n';
import ClientHomeHereToHelpContact from './client-home.here-to-help.contact';

const ClientHomeHereToHelp = () => {
  const { t } = useHTranslation('admin-common');
  return (
    <div className="client-home-here-to-help-wrapper">
      <div className="client-home-here-to-help max-w-1100 m-auto">
        <div className="client-home-here-to-help__title">
          {t('client_home_here_to_help_title', {
            en: 'Full of faith - Choose FINA',
            vn: 'Trọn niềm tin - Chọn FINA',
          })}
        </div>
        <div className="client-home-here-to-help__desc">
          {t('client_home_here_to_help_desc', {
            en: 'Proud to be a one-stop shop specializing in consulting & completing free home loan documents, FINA team is always dedicated to support, listen and solve problems quickly 24/7 via hotline 03 5749 8668 and email : support@fina.com.vn, helping customers feel secure to choose the optimal financial solution for themselves.',
            vn: 'Tự hào là một one-stop shop chuyên tư vấn & hoàn thiện hồ sơ vay mua nhà miễn phí, đội ngũ FINA luôn tận tâm hỗ trợ, lắng nghe và giải quyết vấn đề nhanh chóng 24/7 qua hotline 03 5749 8668 và email: support@fina.com.vn, giúp khách hàng an tâm lựa chọn giải pháp tài chính tối ưu cho riêng mình.',
          })}
        </div>
        <ClientHomeHereToHelpContact />
      </div>
    </div>
  );
};

export default ClientHomeHereToHelp;
