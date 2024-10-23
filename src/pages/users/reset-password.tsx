import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MobileUsersPageWrapper from '@components/shared/mobile-app/users-page-wrapper';
import { MobileUtils } from '@lib/utils/mobile';
import { ResetPasswordForm } from '../../components/shared/user/reset-password';

const ResetPasswordPage = (props: any) => {
  if (MobileUtils.checkIsWebView()) {
    return (
      <MobileUsersPageWrapper>
        <ResetPasswordForm {...props} />
      </MobileUsersPageWrapper>
    );
  }
  return <ResetPasswordForm {...props} />;
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default ResetPasswordPage;
