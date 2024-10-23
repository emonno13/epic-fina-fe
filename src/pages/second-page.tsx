import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const SecondPage = (props: any) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  return (
    <>
      <Link
        href="/second-page"
        locale={locale === 'en' ? 'vn' : 'en'}
      >
        {t('change-locale')}
      </Link>
      <Link href="/">
        <button
          type="button"
        >
          {t('back-to-home')}
        </button>
      </Link>
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'second-page']),
  },
});

export default SecondPage;