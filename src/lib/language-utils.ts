import { useRouter } from 'next/router';

export const LanguageUtils = {
  getCurrentCountry: ():string => {
    const { locale, locales, defaultLocale } = useRouter();
    return locale || 'en';
  },
  getCurrentLanguage: ():string => {
    const { locale, locales, defaultLocale } = useRouter();
    return locale || 'en';
  },
  allCountries: ['vn', 'en'],
};