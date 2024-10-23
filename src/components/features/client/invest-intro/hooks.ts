import { useTranslation } from 'react-i18next';

export const useInvestIntroTransaction = () => {
  const { t } = useTranslation('common');
  return (word: string) => {
    return t(`invest-intro.${word}`);
  };
};
