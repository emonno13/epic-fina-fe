import { useRouter } from 'next/router';
import { useTranslation as nextUseTranslation } from 'next-i18next';
import { UseTranslationOptions } from 'react-i18next';
import { TFunctionKeys } from 'i18next';

export const useHTranslation = (namespace: string, options?: UseTranslationOptions) => {
  const { t, ...trans } = nextUseTranslation(namespace, options);
  const { locale = 'en' } = useRouter();
  const translate = (key: TFunctionKeys, defaultValue: any = {}, options?: any | string) => {
    const defaultKey = typeof defaultValue === 'string' ? defaultValue : defaultValue[locale] || key;
    return t(key, defaultKey, options);
  };
  return { t: translate, ...trans };
};