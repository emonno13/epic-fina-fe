/* eslint-disable @next/next/no-img-element */
import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';
import { ArrowLeftCircleSvg } from 'icons';

import './styles.module.scss';

interface CalculatorsToolkitHeaderProps {
  href?: string;
}

const CalculatorsToolkitHeader = ({ href }: CalculatorsToolkitHeaderProps) => {
  const { t } = useHTranslation('calculator-toolkit');

  return (
    <div className="calculators-toolkit-header">
      <div className="calculators-toolkit-header-left">
        <Link href={href || '/calculators-toolkit'}>
          <ArrowLeftCircleSvg />
        </Link>
        {t('backToCalculator')}
      </div>
      <img
        src="/assets/images/fina_logo.png"
        className="calculators-toolkit-header-logo"
      />
    </div>
  );
};

export default CalculatorsToolkitHeader;
