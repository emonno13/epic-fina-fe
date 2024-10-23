import { useCurrentUser } from '@lib/providers/auth';
import { MobileUtils } from '@lib/utils/mobile';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = (_props: any) => {
  const user: any = useCurrentUser();
  const { locale, push, defaultLocale } = useRouter();
  useEffect(() => {
    if (
      user?.shouldResetPassword &&
      _props.Component?.name !== 'ResetPasswordPage'
    ) {
      setTimeout(async () => {
        await push('/users/reset-password');
      }, 10);
    }
    if (MobileUtils.checkIsWebView()) {
      push(`/${locale || defaultLocale}/admin/m-dashboard`, undefined, {
        shallow: true,
        locale: locale || defaultLocale,
      });
      return;
    }
    push(`/${locale || defaultLocale}/admin/dashboard`, undefined, {
      shallow: true,
      locale: locale || defaultLocale,
    });
  }, []);

  return (
    <div>
      {/*<HFeatureForm advancedSearchSchema={exampleExtra} endpoint={"/" } tableResultSchema={UserTableSchema}/>*/}
      {/*<AdvancedSearch advancedSchema={exampleExtra}/>*/}
    </div>
  );
};

export const getInitialProps = async () => ({ namespacesRequired: ['common'] });

export default Index;
